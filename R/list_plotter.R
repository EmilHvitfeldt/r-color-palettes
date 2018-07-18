list_plotter <- function(color_list, names, package_name) {
  par(mar = c(0, 0, 0, 0) + 0.1)
  
  plot(0, 0, type = "n", axes = FALSE, bty = "n", xlab = "", ylab = "", 
       xlim = c(0, 1), ylim = c(-length(color_list)-1, 0))
  
  title(package_name, line = -3)
  for (i in seq_len(length(color_list))) {
    
    colors_len <- length(color_list[[i]])
    breaks <- seq(from = 0, to = 1, length = colors_len + 1)
    
    
    text(0, -i, names[i], pos = 4)
    rect(xleft = breaks[1:colors_len], xright = breaks[1:colors_len + 1], 
         ytop = - 0.15-i, ybottom = -0.8-i, 
         col = color_list[[i]], border = NA) 
  }
}

all_names <- function(package, type = NULL) {
  color_list_d <- character()
  color_list_c <- character()
  color_list_dynamic <- character()
  
  if(is.null(type)) {
    names_d <- palettes_d_names[which(palettes_d_names$package == package), ]$palette
  } else {
    names_d <- palettes_d_names[intersect(which(palettes_d_names$package == package),
                                which(palettes_d_names$type == type)), ]$palette
  }
  
  color_list_d <- lapply(names_d, paletteer_d, package = !!package)

  if(is.null(type)) {
    names_c <- palettes_c_names[which(palettes_c_names$package == package), ]$palette
  } else {
    names_c <- palettes_c_names[intersect(which(palettes_c_names$package == package),
                                  which(palettes_c_names$type == type)), ]$palette
  }
  
  if(length(names_c) > 0) {
    color_list_c <- lapply(names_c, paletteer_c, package = !!package, n = 256)
  }
  
  if(is.null(type)) {
    which_dynamic <- which(palettes_dynamic_names$package == package)
  } else {
    which_dynamic <- intersect(which(palettes_dynamic_names$package == package),
                       which(palettes_dynamic_names$type == type))
  }
  
  names_dynamic <- palettes_dynamic_names[which_dynamic, ]$palette
  length_dynamic <- palettes_dynamic_names[which_dynamic, ]$length
  
  if(length(names_dynamic) > 0) {
    color_list_dynamic <- mapply(paletteer_dynamic, 
                                 package = package, 
                                 palette = names_dynamic,
                                 n = length_dynamic, SIMPLIFY = FALSE)
  }
  
  list(names = c(names_d, names_c, names_dynamic),
       color = c(color_list_d, color_list_c, unname(color_list_dynamic)))
}