library(paletteer)
library(tidyverse)

# lengths 2-12
# lengths 13-16
# Others

size <- 100
gap <- 5
col_gap <- 100

max_width <- 12 * size + 11 * gap
rect_width <- (max_width - 15 * gap) / 16

make_box <- function(color, n) {
  tibble(
    x = c(0, size, size, 0) + (size + gap) * (n - 1),
    y = c(0, 0, size, size),
    color = color,
    col = n
  )
}

make_rect <- function(color, n) {
  tibble(
    x = c(0, rect_width, rect_width, 0) + (rect_width + gap) * (n - 1),
    y = c(0, 0, size, size),
    color = color,
    col = n
  )
}

make_line <- function(color, n, total) {
  width <- max_width / total
  tibble(
    x = c(0, width, width, 0) + (width) * (n - 1),
    y = c(0, 0, size, size),
    color = color,
    col = n
  )
}

make_colors <- function(data) {
  if (nrow(data) > 16 * 4) {
    res <- data |>
      filter(col %in% round(seq(1, max(data$col), length.out = 9))) |>
      summarize(
        x = mean(x),
        y = min(y) - col_gap / 5,
        color = color[1],
        .by = c(row, col)
      )
  } else {
    res <- summarize(
      data,
      x = mean(x),
      y = min(y) - col_gap / 5,
      color = color[1],
      .by = c(row, col)
    )
  }
  res
}

make_titles <- function(data, name) {
  tibble(
    x = mean(data$x),
    y = max(data$y) + col_gap / 5,
    name = name
  )
}

make_row <- function(x, n_row = 1, name) {
  x_len <- length(x)
  if (x_len <= 12) {
    res <- purrr::map2(x, seq_along(x), make_box)
  } else if (x_len <= 16) {
    res <- purrr::map2(x, seq_along(x), make_rect)
  } else {
    res <- purrr::map2(x, seq_along(x), make_line, total = x_len)
  }

  res <- list_rbind(res)
  res$y <- res$y - (size + col_gap) * (n_row - 1)
  res$x <- res$x + size

  res$row <- n_row

  cols <- make_colors(res)
  titles <- make_titles(res, name)

  list(
    box = res,
    colors = cols,
    titles = titles
  )
}

make_grid <- function(x) {
  res <- purrr::pmap(list(x, seq_along(x), names(x)), make_row)

  list(
    box = list_rbind(map(res, "box")),
    colors = list_rbind(map(res, "colors")),
    titles = list_rbind(map(res, "titles"))
  )
}

make_plot <- function(pals, name) {
  values <- make_grid(pals)

  p <- values$box |>
    mutate(id = paste(row, col)) |>
    ggplot(aes(x, y, group = id, fill = color)) +
    geom_polygon() +
    geom_text(
      aes(x, y, label = color),
      size = 4,
      data = values$colors,
      size.unit = "pt",
      inherit.aes = FALSE
    ) +
    geom_text(
      aes(x, y, label = name),
      size = 5,
      data = values$titles,
      size.unit = "pt",
      inherit.aes = FALSE,
      fontface = "bold"
    ) +
    coord_fixed() +
    theme_void() +
    theme(plot.margin = margin(0, 0, 0, 0)) +
    scale_fill_identity() +
    scale_x_continuous(limits = c(0, max_width + 2 * size), expand = c(0, 0)) +
    scale_y_continuous(
      limits = range(values$box$y) + c(-col_gap, col_gap),
      expand = c(0, 0)
    )

  ggsave(
    fs::path("palette_images", paste0(name, ".png")),
    p,
    width = max_width + 2 * size,
    height = max(values$box$y) - min(values$box$y) + col_gap * 2,
    bg = "white",
    units = "px",
    limitsize = FALSE
  )
}
