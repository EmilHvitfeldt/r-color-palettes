const paragraphs = document.querySelectorAll("div");

for (let i = 0; i < paragraphs.length; i += 1) {
  paragraphs[i].addEventListener("click", function (event) {
    data_key = event.target.parentNode.parentNode.getAttribute("data-key");

    clear = event.target.getAttribute("id") == "grid";

    if (clear) {
      document.getElementById("palette").innerHTML = null;
      document.getElementById("github").innerHTML = null;
      document.getElementById("CRAN").innerHTML = null;
      document.getElementById("example1").innerHTML = null;
      return
    }

    pal_key = $.grep(palette_index, function(n, i) {
      return n.key===data_key;
    })[0];

   if (pal_key.length == 0) {
     return
   }

   pkg_key = $.grep(package_index, function(n, i) {
      return n.Name===pal_key.package;
    })[0];

   document.getElementById("palette").innerHTML =
     "<b>Palette</b>" + "<br> &nbsp&nbsp&nbsp" + pal_key.palette + "<br>" +
     "<b>Package</b>" + "<br> &nbsp&nbsp&nbsp" + pal_key.package;

     if (pkg_key.Github != null) {
       document.getElementById("github").innerHTML =
       "<a href='https://github.com/" + pkg_key.Github +
       "'><i class='fab fa-github'/> " + pkg_key.Github +"</a>";
     } else {
       document.getElementById("github").innerHTML = null;
     }

     if (pkg_key.CRAN) {
       document.getElementById("CRAN").innerHTML =
       "<a href='https://CRAN.R-project.org/package=" + pkg_key.Name +
       "'><i class='fab fa-r-project'/> " + pkg_key.Name +"</a>";
     } else {
       document.getElementById("CRAN").innerHTML = null;
     }

document.getElementById("example1").innerHTML = "<pre style='background-color:#fff;-moz-tab-size:4;-o-tab-size:4;tab-size:4'><code class='language-r' data-lang='r'>library(paletteer) \npaletteer_d(\"" + data_key + "\")</code></pre>";

  });
}
