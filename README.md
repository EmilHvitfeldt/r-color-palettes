
<!-- README.md is generated from README.Rmd. Please edit that file -->

# Comprehensive list of color palettes in R

The goal of this repository is to have a one stop destination for anyone
looking for a color palette to use in r. If you would like to
help/contribute please feel free post an issue, PR or send a email to
<emilhhvitfeldt@gmail.com>.

Interactive R Color Palette Pickers:

- <https://emilhvitfeldt.github.io/r-color-palettes/>
- <https://r-graph-gallery.com/color-palette-finder>

Further down the page is all the palettes available in the R ecosystem
ordered alphabetically by package name. A list of palettes ordered by
type can be found here [Type sorted palettes](type-sorted-palettes.md)
to shorten the length of this page.

## Paletteer package

I have collected all the palettes displayed here in a single package
using a unified framework. Developmental version can be found
[here](https://github.com/EmilHvitfeldt/paletteer).

You can install the released version of paletteer from
[CRAN](https://CRAN.R-project.org) with:

``` r
install.packages("paletteer")
```

If you want the development version instead then install directly from
GitHub:

``` r
# install.packages("pak")
pak::pak("EmilHvitfeldt/paletteer")
```

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

## Blogposts and other resources

Here is a collection of material on the use and creation of color
palettes in r.

- [Creating corporate colour palettes for
  ggplot2](https://drsimonj.svbtle.com/creating-corporate-colour-palettes-for-ggplot2)
- [Make your own color palettes with
  paletti](https://edwinth.github.io/blog/paletti/)
- [How to create a color palette in R with more than 15 colors with
  ggplot2](https://github.com/duttashi/visualize/issues/19)
- [Generating a Custom Color Palette Function in
  R](https://quantdev.ssri.psu.edu/tutorials/generating-custom-color-palette-function-r)
- [How to build a color palette from any image with R and k-means
  algo](http://www.milanor.net/blog/build-color-palette-from-image-with-paletter/)
- [Why choice of colour is important beyond aesthtic considerations and
  how the quality of a palette might be
  assesed](https://www.data-imaginist.com/2018/scico-and-the-colour-conundrum/)
- [Viz palette: colors in
  action](http://projects.susielu.com/viz-palette)

## Color manipulation packages

- [Extract palettes from images and
  text](https://github.com/EmilHvitfeldt/quickpalette)
- [Fast Vectorised Colour Conversion and
  Comparison](https://github.com/thomasp85/farver)
- [How to Read, Inspect, and Manipulate Color Swatch
  Files](https://github.com/hrbrmstr/swatches)
- [Simple colour manipulation in
  R](https://github.com/jonclayden/shades)

## Generative packages

The purpose of this project is to showcase the palettes already
available in R (packages). However sometimes you have to resort to make
one yourself. When that is the case the following packages aides in
creating.

- [AndreaCirilloAC/paletter](https://github.com/AndreaCirilloAC/paletter)
- [jolars/qualpalr](https://github.com/jolars/qualpalr)
- [ronammar/randomcoloR](https://github.com/ronammar/randomcoloR)
- [johnbaums/hues](https://github.com/johnbaums/hues)
- [ColorPalette](https://cran.r-project.org/web/packages/ColorPalette/index.html)
- [oaColors](https://cran.rstudio.com/web/packages/oaColors/index.html)
- [earthtones](https://cran.r-project.org/web/packages/earthtones/index.html)
- [leeper/colourlovers](https://github.com/leeper/colourlovers)

When creating color palettes certain website have also provided valuable

- [paletton](http://paletton.com/)
- [Data color
  picker](https://learnui.design/tools/data-color-picker.html)
- [i want hue](http://tools.medialab.sciences-po.fr/iwanthue/)
- [Viz Palette](http://projects.susielu.com/viz-palette)

## Perception of color palettes

Selecting a color palette requires a number of different considerations.
Within these considerations is

- the palette retains its integrity when printed in black and white
- people with colorblindness are able to understand it

In the following I have outlined a couple of those problems

### Printing in black and white

While most of the palettes presented here contains a wide variety of
colors. While that is compelling, you need to remember that your product
might be printed in black and white one day, and you should pick a
palette that allows for interpretation if that is the case.

First example is the `rainbow` palette from the `grDevices` package with
its colorful display. However as we see here would it be horrible if
used for black and white printing since different colors are mapped to
the same shade of grey.

``` r
source("palette_plotter.R")

pal_data <- list(
  Normal = rainbow(32),
  Desaturated = colorspace::desaturate(rainbow(32))
)

make_plot(pal_data, "readme-1")
```

Standard rainbow palette

![](palette_images/readme-1.png)

A related problem happens with the standard color palette used in
`ggplot2` since that color is picked to have constant chroma and
luminance thus yielding the same shade of grey when desaturated. (This
palette is no longer the default for continuous variables in `ggplot2`
after version 3.0.0)

``` r
pal_data <- list(
  Normal = scales::hue_pal()(256),
  Desaturated = colorspace::desaturate(scales::hue_pal()(256))
)

make_plot(pal_data, "readme-2")
```

Standard color palette for ggplot2

![](palette_images/readme-2.png)

One of the continuous palette that satisfy this criteria is the well
known `viridis` palettes.

``` r
pal_data <- list(
  Normal = viridis::inferno(256),
  Desaturated = colorspace::desaturate(viridis::inferno(256))
)

make_plot(pal_data, "readme-3")
```

inferno palette from viridis

![](palette_images/readme-3.png)

To test if the palette you want to use will be distorted when in black
and white, use the `colorspace::desaturate()` to desaturate it.

### Color blindness

Another thing you have to take into consideration when picking a palette
is how it would be viewed by a person who is [color
blind](https://en.wikipedia.org/wiki/Color_blindness). There are several
approaches to ensuring that a colorblind person can interpret your
figures. A very good summary of what you can do is given by Masataka
Okabe and Kei Ito in their document [“Color Universal Design (CUD) - How
to make figures and presentations that are friendly to Colorblind
people”](http://jfly.iam.u-tokyo.ac.jp/color/). Beyond using shapes,
linetypes and size for information coding, which is easily done using
the [ggplot2
aesthetics](https://ggplot2.tidyverse.org/reference/aes_linetype_size_shape.html),
they recommend:

#### Using unambiguous palettes

The easiest way to make color coding accessible to everyone, is using a
palette, that is unambiguous to people with various types of color
blindness. There are a few available:

- Masataka Okabe and Kei Ito have developed such a [barrier free
  palette](http://jfly.iam.u-tokyo.ac.jp/color/#pallet), and you can use
  it in R with the [colorblind_pal() of the `ggthemes`
  package](https://jrnold.github.io/ggthemes/reference/colorblind.html)
  (also see colorblind_pal palette among the ggthemes palettes in the
  alphabetical list below) or by using the encoding provided by the
  [Cookbook for
  R](http://www.cookbook-r.com/Graphs/Colors_(ggplot2)/#a-colorblind-friendly-palette).
- Some of the palettes developed by Cynthia Brewer for the
  [ColorBrewer](http://colorbrewer2.org) are colorblind safe, you can
  find them through the [palette chooser website’s button “colorblind
  safe”](http://colorbrewer2.org). In R, you can use the brewer palettes
  through [`ggplot2`’s scale_colour_brewer() et
  al.](https://ggplot2.tidyverse.org/reference/scale_brewer.html) or
  through the separate package
  [`RColorBrewer`](https://cran.r-project.org/web/packages/RColorBrewer/index.html).

#### Simulating effects of color blindness on used palettes

To visualize the effect of color blindness on our palettes we will turn
to two packages. The `dichromat` package can simulate color blindness on
individual color and then also entire palettes like so in this `rainbow`
palette:

``` r
pal_data <- list(
  Normal = rainbow(256),
  Deuteranopia = dichromat::dichromat(rainbow(256), type = "deutan"),
  Protanopia = dichromat::dichromat(rainbow(256), type = "protan"),
  Tritanopia = dichromat::dichromat(rainbow(256), type = "tritan")
)

make_plot(pal_data, "readme-4")
```

The effect of color blindness on the rainbow palette

![](palette_images/readme-4.png)

Another package that can provide helpful is the amazing
[colorblindr](https://github.com/clauswilke/colorblindr) package that is
able to simulate color blindness to `ggplot` objects them self.

## Honorable mentions

Due to the somehow vague notion of “color palette” have I decided to
exclude certain kinds of packages from the main gallery. [Generative
package](#generative-packages) have been discussed earlier.

### cpt-city

The amazing
[cpt-city](http://soliton.vm.bytemark.co.uk/pub/cpt-city/index.html) is
a wonderful project of creating an archive of color palettes to be used
in cartography, technical illustration and design. Due to the immense
size (7140) I have decided to refer to it instead of re-illustration
them in this repository. If any of the palettes found here are for your
liking they can be accessed in R using the following
[package](https://cran.r-project.org/web/packages/cptcity/index.html):

``` r
# CRAN version
install.packages("cptcity")
```

### sport colors

Many of the palettes in sports related palettes have a very limited
number of colors (often only 2 colors). This leads to quite low
usability outside of the special area of sports analytic.

- [colorr](https://cran.r-project.org/web/packages/colorr/index.html)
  Color palettes for EPL, MLB, NBA, NHL, and NFL teams.

- [beanumber/teamcolors](https://github.com/beanumber/teamcolors) An R
  package providing color palettes for pro sports teams.

### Canva palettes

The `ggthemes` package include the 150 four-color palettes from the
[canva.com](canva.com). Doe to the size and limited number of colors in
the palettes these palettes will be featured on their own page and only
once.

- [Canva colors](canva.md)

## Palettes sorted by Package (alphabetically)

### ButterflyColors

``` r
# Developmental version
pak::pak("junqueiragaabi/ButterflyColors")
```

![](palette_images/ButterflyColors.png)

### DresdenColor

``` r
# Developmental version
pak::pak("katiesaund/DresdenColor")
```

![](palette_images/DresdenColor.png)

### IslamicArt

``` r
# Developmental version
pak::pak("lambdamoses/IslamicArt")
```

![](palette_images/IslamicArt.png)

### LaCroixColoR

``` r
# Developmental version
pak::pak("johannesbjork/LaCroixColoR")
```

![](palette_images/LaCroixColoR.png)

### Manu

``` r
# Developmental version
pak::pak("G-Thomson/Manu")
```

![](palette_images/Manu.png)

### MapPalettes

``` r
# Developmental version
pak::pak("disarm-platform/MapPalettes")
```

![](palette_images/MapPalettes.png)

### MetBrewer

``` r
# Developmental version
pak::pak("BlakeRMills/MetBrewer")

# CRAN version
install.packages("MetBrewer")
```

![](palette_images/MetBrewer.png)

### MexBrewer

``` r
# Developmental version
pak::pak("paezha/MexBrewer")
```

![](palette_images/MexBrewer.png)

### MoMAColors

``` r
# Developmental version
pak::pak("BlakeRMills/MoMAColors")
```

![](palette_images/MoMAColors.png)

### NatParksPalettes

``` r
# Developmental version
pak::pak("kevinsblake/NatParksPalettes")

# CRAN version
install.packages("NatParksPalettes")
```

![](palette_images/NatParksPalettes.png)

### NineteenEightyR

``` r
# Developmental version
pak::pak("m-clark/NineteenEightyR")
```

![](palette_images/NineteenEightyR.png)

### PNWColors

``` r
# Developmental version
pak::pak("jakelawlor/PNWColors")
```

![](palette_images/PNWColors.png)

### Polychrome

``` r


# CRAN version
install.packages("Polychrome")
```

![](palette_images/Polychrome.png)

### PrettyCols

``` r
# Developmental version
pak::pak("nrennie/PrettyCols")

# CRAN version
install.packages("PrettyCols")
```

![](palette_images/PrettyCols.png)

### RColorBrewer

``` r


# CRAN version
install.packages("RColorBrewer")
```

![](palette_images/RColorBrewer.png)

### RSkittleBrewer

``` r
# Developmental version
pak::pak("alyssafrazee/RSkittleBrewer")
```

![](palette_images/RSkittleBrewer.png)

### Rdune

``` r
# Developmental version
pak::pak("nvietto/Rdune")

# CRAN version
install.packages("Rdune")
```

![](palette_images/Rdune.png)

### Redmonder

``` r
# Developmental version
pak::pak("pmdci/redmonder")

# CRAN version
install.packages("Redmonder")
```

![](palette_images/Redmonder.png)

### amerika

``` r
# Developmental version
pak::pak("pdwaggoner/amerika")

# CRAN version
install.packages("amerika")
```

![](palette_images/amerika.png)

### awtools

``` r
# Developmental version
pak::pak("awhstin/awtools")
```

![](palette_images/awtools.png)

### basetheme

``` r
# Developmental version
pak::pak("karoliskoncevicius/basetheme")

# CRAN version
install.packages("basetheme")
```

![](palette_images/basetheme.png)

### beyonce

``` r
# Developmental version
pak::pak("dill/beyonce")
```

![](palette_images/beyonce.png)

### blueycolors

``` r
# Developmental version
pak::pak("ekholme/blueycolors")
```

![](palette_images/blueycolors.png)

### calecopal

``` r
# Developmental version
pak::pak("an-bui/calecopal")
```

![](palette_images/calecopal.png)

### colRoz

``` r
# Developmental version
pak::pak("jacintak/colRoz")
```

![](palette_images/colRoz.png)

### colorBlindness

``` r


# CRAN version
install.packages("colorBlindness")
```

![](palette_images/colorBlindness.png)

### colorblindr

``` r
# Developmental version
pak::pak("clauswilke/colorblindr")
```

![](palette_images/colorblindr.png)

### dichromat

``` r


# CRAN version
install.packages("dichromat")
```

![](palette_images/dichromat.png)

### dutchmasters

``` r
# Developmental version
pak::pak("EdwinTh/dutchmasters")
```

![](palette_images/dutchmasters.png)

### feathers

``` r
# Developmental version
pak::pak("shandiya/feathers")
```

![](palette_images/feathers.png)

### fishualize

``` r
# Developmental version
pak::pak("nschiett/fishualize")

# CRAN version
install.packages("fishualize")
```

![](palette_images/fishualize.png)

### futurevisions

``` r
# Developmental version
pak::pak("JoeyStanley/futurevisions")
```

![](palette_images/futurevisions.png)

### ggpomological

``` r
# Developmental version
pak::pak("gadenbuie/ggpomological")
```

![](palette_images/ggpomological.png)

### ggprism

``` r
# Developmental version
pak::pak("csdaw/ggprism")

# CRAN version
install.packages("ggprism")
```

![](palette_images/ggprism.png)

### ggsci

``` r
# Developmental version
pak::pak("nanxstats/ggsci")

# CRAN version
install.packages("ggsci")
```

![](palette_images/ggsci.png)

### ggthemes

``` r
# Developmental version
pak::pak("jrnold/ggthemes")

# CRAN version
install.packages("ggthemes")
```

![](palette_images/ggthemes.png)

### ggthemr

``` r
# Developmental version
pak::pak("Mikata-Project/ggthemr")
```

![](palette_images/ggthemr.png)

### ghibli

``` r
# Developmental version
pak::pak("ewenme/ghibli")

# CRAN version
install.packages("ghibli")
```

![](palette_images/ghibli.png)

### grDevices

``` r


# CRAN version
install.packages("grDevices")
```

![](palette_images/grDevices.png)

### impressionist.colors

``` r


# CRAN version
install.packages("impressionist.colors")
```

![](palette_images/impressionist.colors.png)

### jcolors

``` r
# Developmental version
pak::pak("jaredhuling/jcolors")
```

![](palette_images/jcolors.png)

### khroma

``` r
# Developmental version
pak::pak("tesselle/khroma")

# CRAN version
install.packages("khroma")
```

![](palette_images/khroma.png)

### lisa

``` r
# Developmental version
pak::pak("tylerlittlefield/lisa")

# CRAN version
install.packages("lisa")
```

![](palette_images/lisa.png)

### ltc

``` r
# Developmental version
pak::pak("loukesio/ltc-color-palettes")
```

![](palette_images/ltc.png)

### miscpalettes

``` r
# Developmental version
pak::pak("EmilHvitfeldt/miscpalettes")
```

![](palette_images/miscpalettes.png)

### musculusColors

``` r
# Developmental version
pak::pak("dawnbarlow/musculusColors")
```

![](palette_images/musculusColors.png)

### nationalparkcolors

``` r
# Developmental version
pak::pak("katiejolly/nationalparkcolors")
```

![](palette_images/nationalparkcolors.png)

### nbapalettes

``` r
# Developmental version
pak::pak("murrayjw/nbapalettes")

# CRAN version
install.packages("nbapalettes")
```

![](palette_images/nbapalettes.png)

### nord

``` r
# Developmental version
pak::pak("jkaupp/nord")

# CRAN version
install.packages("nord")
```

![](palette_images/nord.png)

### ochRe

``` r
# Developmental version
pak::pak("hollylkirk/ochRe")
```

![](palette_images/ochRe.png)

### palettesForR

``` r
# Developmental version
pak::pak("frareb/palettesForR")

# CRAN version
install.packages("palettesForR")
```

![](palette_images/palettesForR.png)

### pals

``` r
# Developmental version
pak::pak("kwstat/pals")

# CRAN version
install.packages("pals")
```

![](palette_images/pals.png)

### peRReo

``` r
# Developmental version
pak::pak("jbgb13/peRReo")
```

![](palette_images/peRReo.png)

### poisonfrogs

``` r
# Developmental version
pak::pak("laurenoconnelllab/poisonfrogs")

# CRAN version
install.packages("poisonfrogs")
```

![](palette_images/poisonfrogs.png)

### rcartocolor

``` r
# Developmental version
pak::pak("Nowosad/rcartocolor")

# CRAN version
install.packages("rcartocolor")
```

![](palette_images/rcartocolor.png)

### rockthemes

``` r
# Developmental version
pak::pak("johnmackintosh/rockthemes")
```

![](palette_images/rockthemes.png)

### rtist

``` r
# Developmental version
pak::pak("tomasokal/rtist")

# CRAN version
install.packages("rtist")
```

![](palette_images/rtist.png)

### severance

``` r
# Developmental version
pak::pak("ivelasq/severance")
```

![](palette_images/severance.png)

### soilpalettes

``` r
# Developmental version
pak::pak("kaizadp/soilpalettes")
```

![](palette_images/soilpalettes.png)

### suffrager

``` r
# Developmental version
pak::pak("alburezg/suffrager")
```

![](palette_images/suffrager.png)

### tayloRswift

``` r
# Developmental version
pak::pak("asteves/tayloRswift")
```

![](palette_images/tayloRswift.png)

### tidyquant

``` r
# Developmental version
pak::pak("business-science/tidyquant")

# CRAN version
install.packages("tidyquant")
```

![](palette_images/tidyquant.png)

### trekcolors

``` r
# Developmental version
pak::pak("leonawicz/trekcolors")

# CRAN version
install.packages("trekcolors")
```

![](palette_images/trekcolors.png)

### tvthemes

``` r
# Developmental version
pak::pak("Ryo-N7/tvthemes")

# CRAN version
install.packages("tvthemes")
```

![](palette_images/tvthemes.png)

### unikn

``` r
# Developmental version
pak::pak("hneth/unikn")

# CRAN version
install.packages("unikn")
```

![](palette_images/unikn.png)

### vangogh

``` r
# Developmental version
pak::pak("cherylisabella/vangogh")

# CRAN version
install.packages("vangogh")
```

![](palette_images/vangogh.png)

### vapeplot

``` r
# Developmental version
pak::pak("seasmith/vapeplot")
```

![](palette_images/vapeplot.png)

### vapoRwave

``` r
# Developmental version
pak::pak("moldach/vapoRwave")
```

![](palette_images/vapoRwave.png)

### waRhol

``` r
# Developmental version
pak::pak("alexskeels/waRhol")
```

![](palette_images/waRhol.png)

### werpals

``` r
# Developmental version
pak::pak("sciencificity/werpals")
```

![](palette_images/werpals.png)

### wesanderson

``` r
# Developmental version
pak::pak("karthik/wesanderson")

# CRAN version
install.packages("wesanderson")
```

![](palette_images/wesanderson.png)

### yarrr

``` r
# Developmental version
pak::pak("ndphillips/yarrr")

# CRAN version
install.packages("yarrr")
```

![](palette_images/yarrr.png)
