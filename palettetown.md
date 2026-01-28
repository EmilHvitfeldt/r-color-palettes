
<!-- README.md is generated from README.Rmd. Please edit that file -->

# Table of Contents

- [Main page](README.md#comprehensive-list-of-color-palettes-in-r)
- [Blogposts and other
  resources](README.md#blogposts-and-other-resources)
- [Generative packages](README.md#generative-packages)
- [Honorable mentions](README.md#honorable-mentions)
- [Palettes sorted by Package
  (alphabetically)](README.md#palettes-sorted-by-package-alphabetically)
  - [Non Novelty Palettes](non-novelty.md)
  - [Sequential color
    palettes](type-sorted-palettes.md#sequential-color-palettes)
  - [Diverging color
    palettes](type-sorted-palettes.md#diverging-color-palettes)
  - [Qualitative color
    palettes](type-sorted-palettes.md#qualitative-color-palettes)
  - [Canva palettes](canva.md)
  - [Palettetown palettes](palettetown.md)
- [News](NEWS.md)

## Palettetown palettes

``` r
source("palette_plotter.R")

make_plot(palettes_d$palettetown[1:100], "palettetown-1")
make_plot(palettes_d$palettetown[101:200], "palettetown-2")
make_plot(palettes_d$palettetown[201:300], "palettetown-3")
make_plot(palettes_d$palettetown[301:389], "palettetown-4")
```

### Pokemon 1-100

![](palette_images/palettetown-1.png)

### Pokemon 101-200

![](palette_images/palettetown-2.png)

### Pokemon 201-300

![](palette_images/palettetown-3.png)

### Pokemon 301-389

![](palette_images/palettetown-4.png)
