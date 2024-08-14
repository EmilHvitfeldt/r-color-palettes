library(paletteer)
library(fs)
library(glue)
library(tidyverse)
library(tidygraph)
library(ggraph)
library(patchwork)
library(colorspace)

source("plot_discrete.R")

pals <- palettes_d_names
pals$novelty <- if_else(pals$novelty, "Novelty - Yes", "Novelty - No")
pals$type_cat <- paste0('Type - ', pals$type)
pals$package_cat <- paste0('Package - ', pals$package)

# Some of the palettes are TOO big
pals <- pals |>
  filter(length <= 20)

pals <- pals |>
  group_by(package, type, novelty) |>
  ungroup() |>
  mutate(slug = glue::glue("{package}::{palette}"))

library(palette2vec)

palette_vec <- map(pals$slug, paletteer_d) |> 
  map(unclass) |>
  set_names(pals$slug) |>
  palette2vec()

library(recipes)

palette_vec <- recipe(~ ., data = palette_vec) |>
  step_dummy(all_nominal_predictors()) |>
  step_zv(all_predictors()) |>
  step_normalize(all_numeric_predictors()) |>
  prep() |>
  bake(new_data = NULL)

n_see_also <- 12

ids <- RANN::nn2(palette_vec, k = n_see_also + 1, searchtype = "priority")$nn.idx
pal_nn <- matrix(ids[seq_len(nrow(ids)) != ids], ncol = n_see_also)

for (i in seq_len(nrow(pals))) {
  cat(i, "/", nrow(pals), "\n")
  pal <- pals[i, ]
  
  dir_path <- path("discrete", pal$package, pal$palette)
  dir_create(dir_path)
  
  index_path <- path(dir_path, "index", ext = "md")
  file_create(index_path)
  
  index_text <- glue(
  "---
  image: featured.svg
  package: {pal$package}
  palette: {pal$palette}
  length: {pal$length}
  type: {pal$type}
  novelty: {pal$novelty}
  categories:
    - {pal$package_cat}
    - {pal$novelty}
    - {pal$type_cat}
  ---
  
  ![](featured.svg)
  
  # {pal$package} - {pal$palette}")
  
  pkg_info <- vctrs::vec_slice(
    paletteer_packages,
    paletteer_packages$Name == pal$package
  )
  
  github <- if_else(
    is.na(pkg_info$Github),
    "Not on Github",
    glue("[{pkg_info$Github}](https://github.com/{pkg_info$Github})")
  )
  
  cran <- if_else(
    pkg_info$CRAN,
    glue("[{pkg_info$Name}](https://CRAN.R-project.org/package={pkg_info$Name})"),
    "Not on CRAN"
  )
  
  index_text <- paste(index_text, glue(.open = "[", .close = "]",
  "\n\n
  ::: columns
  ::: {.column width=\"50%\"}
  {{< fa brands github size=3x >}}
  **Github**
  
  [github]
  :::
  
  ::: {.column width=\"50%\"}
  {{< fa brands r-project size=3x >}}
  **CRAN**
  
  [cran]
  :::
  :::
  
  <hr>
  "))  
  
  raw_pal <- paste0("c(\"", paste(unclass(paletteer_d(pal$slug)), collapse = "\", \""), "\")")
  
  index_text <- paste(index_text, glue(
  "\n\n
  Use with [paletteer](https://emilhvitfeldt.github.io/paletteer/) package:
  
  ```r
  library(paletteer)
  paletteer_d(\"{pal$slug}\")
  ```
  
  Use raw:
  
  ```r
  {raw_pal}
  ```
  "))
  
  index_text <- paste(
    index_text,
    "\n\n![](examples.png)"
  )
  
  index_text <- paste(index_text, glue("
  <br>
  
  ## With Different Forms of Colorblindness
  
  ![](colorblind.svg)"
  ))
  
  index_text <- paste(index_text, glue(
  "\n\n
  <br>
  
  # Related Palettes
  
  <div class=\"list\" style=\"display: grid; grid-template-columns: auto auto auto;\">
  "))
  
  for (nn in seq_len(n_see_also)) {
    this_pal <- pals[pal_nn[i, nn], ]
    
    index_text <- paste(index_text, glue(
  "
  <figure class=\"figure\">
  <a href=\"../../{this_pal$package}/{this_pal$palette}/\"> <img src=\"../../{this_pal$package}/{this_pal$palette}/featured.svg\" style=\"width: 100%;\" class=\"figure-img\"></a>
  </figure>
  "))
  }
  
  index_text <- paste(index_text, glue(
  "\n
  </div>
  "))
  

  write_lines(index_text, index_path)
  
  # Pal plot
  featured_path <- path(dir_path, "featured", ext = "svg")
  
  plot_palette <- function (colors_palette) {
    tibble(
      color = colors_palette
    ) |>
      mutate(x = seq_len(n())) |>
      ggplot(aes(x, 1, fill = color)) +
      geom_tile() +
      scale_fill_identity() +
      theme_void()
  }
  
  colors_palette <- palettes_d[[pal$package]][[pal$palette]]
  pal_plot <- plot_palette(colors_palette)
  
  ggsave(file = featured_path, plot = pal_plot, width = 8, height = 1.5)
  
  # Example plot
  example_path <- path(dir_path, "examples", ext = "png")
  example_plot <- plot_discrete(pal)
  
  ggsave(file = example_path, plot = example_plot, width = 8, height = 8 / 1.718, dpi = 150)
  
  # Colorblind Plot
  
  colorblind_path <- path(dir_path, "colorblind", ext = "svg")
  deut_plot <- plot_palette(deutan(colors_palette)) +
    labs(title = "Deutanomaly")
  prot_plot <- plot_palette(protan(colors_palette)) +
    labs(title = "Protanomaly")
  trit_plot <- plot_palette(tritan(colors_palette)) +
    labs(title = "Tritanomaly")
  des_plot <- plot_palette(desaturate(colors_palette)) +
    labs(title = "Desaturated")
  
  colorblind_plot <- (
    (deut_plot + prot_plot) / (trit_plot + des_plot)
  )
  
  ggsave(file = colorblind_path, plot = colorblind_plot, width = 8, height = 4)
}
