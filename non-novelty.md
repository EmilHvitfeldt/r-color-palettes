
<!-- README.md is generated from README.Rmd. Please edit that file -->

## Palettes sorted by type (Sequential/Diverging/Qualitative)

# Table of Contents

- [Main page](README.md#comprehensive-list-of-color-palettes-in-r)
- [Blogposts and other
  resources](README.md#blogposts-and-other-resources)
- [Color manipulation packages](README.md#color-manipulation-packages)
- [Generative packages](README.md#generative-packages)
- [Perception of color palettes](README.md#perception-of-color-palettes)
  - [Printing in black and white](README.md#printing-in-black-and-white)
  - [Color blindness](README.md#color-blindness)
- [Honorable mentions](README.md#honorable-mentions)
- [Palettes sorted by Package
  (alphabetically)](README.md#palettes-sorted-by-package-alphabetically)
  - [Sequential color palettes](#sequential-color-palettes)
  - [Diverging color palettes](#diverging-color-palettes)
  - [Qualitative color palettes](#qualitative-color-palettes)
  - [Canva palettes](canva.md)
  - [Palettetown palettes](palettetown.md)
- [News](NEWS.md)

### Sequential color palettes

``` r
source("palette_plotter.R")
fs::dir_create("palette_images")

pals <- paletteer::palettes_d
pals <- pals[names(pals) != "palettetown"]

for (i in seq_along(pals)) {
  pal_package <- names(pals)[i] 
  pal <- pals[[i]]

info <- paletteer::palettes_d_names |>
  filter(package == pal_package) |>
  arrange(palette) |>
  filter(!novelty)

  if (nrow(info) > 0) {

    pal_names <- info$palette
    make_plot(pal[pal_names], paste0("nonnovel", "-", pal_package))
  }
}
```

``` r
pkg_data <- paletteer::palettes_d_names |>
  filter(!novelty) |>
  distinct(package) |>
  left_join(paletteer::paletteer_packages, by = c("package" = "Name")) |>
  mutate(
    github_install = if_else(
      is.na(github_ver),
      "",
      glue::glue("# Developmental version\npak::pak(\"{Github}\")")
    ),
    cran_install = if_else(
      CRAN,
      glue::glue("\n\n# CRAN version\ninstall.packages(\"{package}\")\n\n"),
      ""
    )
  )

glue::glue_data(
  pkg_data,
  "
### [[package]]

\`\`\`r
[[github_install]]
[[cran_install]]
\`\`\`

![](palette_images/nonnovel-[[package]].png)

",
  .open = "[[",
  .close = "]]"
)
```

### amerika

``` r
# Developmental version
pak::pak("pdwaggoner/amerika")

# CRAN version
install.packages("amerika")
```

![](palette_images/nonnovel-amerika.png)

### colorBlindness

``` r


# CRAN version
install.packages("colorBlindness")
```

![](palette_images/nonnovel-colorBlindness.png)

### colorblindr

``` r
# Developmental version
pak::pak("clauswilke/colorblindr")
```

![](palette_images/nonnovel-colorblindr.png)

### dichromat

``` r


# CRAN version
install.packages("dichromat")
```

![](palette_images/nonnovel-dichromat.png)

### ggsci

``` r
# Developmental version
pak::pak("nanxstats/ggsci")

# CRAN version
install.packages("ggsci")
```

![](palette_images/nonnovel-ggsci.png)

### ggthemes

``` r
# Developmental version
pak::pak("jrnold/ggthemes")

# CRAN version
install.packages("ggthemes")
```

![](palette_images/nonnovel-ggthemes.png)

### grDevices

``` r


# CRAN version
install.packages("grDevices")
```

![](palette_images/nonnovel-grDevices.png)

### khroma

``` r
# Developmental version
pak::pak("tesselle/khroma")

# CRAN version
install.packages("khroma")
```

![](palette_images/nonnovel-khroma.png)

### MapPalettes

``` r
# Developmental version
pak::pak("disarm-platform/MapPalettes")
```

![](palette_images/nonnovel-MapPalettes.png)

### pals

``` r
# Developmental version
pak::pak("kwstat/pals")

# CRAN version
install.packages("pals")
```

![](palette_images/nonnovel-pals.png)

### Polychrome

``` r


# CRAN version
install.packages("Polychrome")
```

![](palette_images/nonnovel-Polychrome.png)

### PrettyCols

``` r
# Developmental version
pak::pak("nrennie/PrettyCols")

# CRAN version
install.packages("PrettyCols")
```

![](palette_images/nonnovel-PrettyCols.png)

### rcartocolor

``` r
# Developmental version
pak::pak("Nowosad/rcartocolor")

# CRAN version
install.packages("rcartocolor")
```

![](palette_images/nonnovel-rcartocolor.png)

### RColorBrewer

``` r


# CRAN version
install.packages("RColorBrewer")
```

![](palette_images/nonnovel-RColorBrewer.png)

### tidyquant

``` r
# Developmental version
pak::pak("business-science/tidyquant")

# CRAN version
install.packages("tidyquant")
```

![](palette_images/nonnovel-tidyquant.png)
