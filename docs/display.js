const paragraphs = document.querySelectorAll("div");

for (let i = 0; i < paragraphs.length; i += 1) {
  paragraphs[i].addEventListener("click", function (event) {
    data_key = event.target.parentNode.parentNode.getAttribute("data-key");

    // Clear info if no palette clicked
    clear = event.target.getAttribute("id") == "grid";

    if (clear) {
      document.getElementById("palette").innerHTML = null;
      document.getElementById("github").innerHTML = null;
      document.getElementById("CRAN").innerHTML = null;
      document.getElementById("example1").innerHTML = null;
      return
    }

    // Get palette info
    pal_key = $.grep(palette_index, function(n, i) {
      return n.key===data_key;
    })[0];

   if (pal_key.length == 0) {
     return
   }

   pkg_key = $.grep(package_index, function(n, i) {
      return n.Name===pal_key.package;
    })[0];


    // Update links
   $("#palette").html(
     pal_key.package + "::" + pal_key.palette
   );

   if (pkg_key.Github != null) {
     $("#github").html(
       "<a href='https://github.com/" + pkg_key.Github +
       "'><i class='fab fa-github'/> " + pkg_key.Github +"</a>"
     );
   } else {
     $("#github").html(null);
   }

   if (pkg_key.CRAN) {
     $("#CRAN").html(
       "<a href='https://CRAN.R-project.org/package=" + pkg_key.Name +
       "'><i class='fab fa-r-project'/> " + pkg_key.Name +"</a>"
     );
   } else {
     $("#CRAN").html(null);
   }
   
   // Update example code   
   code = "library(paletteer) \npaletteer_d(\"" + data_key + "\")";
   
   $("#example1code").html(code);
   
   // redo highlight.js
   $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
  });
}
