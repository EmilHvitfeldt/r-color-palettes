plot_discrete <- function(pal) {
  bar_chart <- tibble(x = rpois(pal$length, 10), y = seq_len(pal$length)) %>%
    ggplot(aes(y, x, fill = factor(y))) +
    geom_col(color = "grey31") +
    scale_fill_paletteer_d(pal$slug) +
    theme_void() +
    guides(fill = "none")
  
  boxplot_chart <- map_dfr(seq_len(pal$length),
                           ~tibble(value = rpois(50, runif(1, 5, 20)),
                                   group = as.character(.x))) %>%
    ggplot(aes(group, value, fill = group)) +
    geom_boxplot(color = "grey31") +
    scale_fill_paletteer_d(pal$slug) +
    theme_void() +
    guides(fill = "none")
  
  scatter_chart <- map_dfr(seq_len(pal$length),
                           ~tibble(x = runif(250 / pal$length),
                                   y = runif(250 / pal$length),
                                   group = as.character(.x))) %>%
    ggplot(aes(x, y, color = group)) +
    geom_point() +
    scale_color_paletteer_d(pal$slug) +
    theme_void() +
    guides(color = "none")
  
  
  line_chart <- map_dfr(seq_len(pal$length),
                        ~tibble(x = seq_len(250),
                                y = cumsum(rnorm(250)),
                                group = as.character(.x))) %>%
    ggplot(aes(x, y, color = group)) +
    geom_line() +
    scale_color_paletteer_d(pal$slug) +
    theme_void() +
    guides(color = "none")
  
  stacked_chart <- map_dfr(seq_len(pal$length),
                           ~tibble(x = seq_len(25),
                                   y = rpois(25, 10),
                                   group = as.character(.x))) %>%
    group_by(x) %>%
    mutate(y = y / sum(y)) %>%
    ggplot(aes(x = x, y = y, fill = group)) +
    geom_area() +
    scale_fill_paletteer_d(pal$slug) +
    theme_void() +
    guides(fill = "none")
  
  network_chart <- play_islands(pal$length, 20, 0.25, 1) %>%
    mutate(community = as.factor(group_infomap())) %>%
    ggraph(layout = 'nicely') +
    geom_edge_link(color = "grey69", alpha = 0.5) +
    geom_node_point(aes(color = community)) +
    theme_void() +
    guides(color = "none") +
    scale_color_paletteer_d(pal$slug)
  
  (bar_chart + boxplot_chart + scatter_chart) /
    (line_chart + stacked_chart + network_chart)
}