HTMLWidgets.widget({

  name: 'shuffle_widget',

  type: 'output',

  factory: function(el, width, height) {

    var Shuffle = window.Shuffle;
    var id = el.id;

    return {

      renderValue: function(x) {

        // console.log(x.options);

        if (x.use_bs_grid) {
          el.classList.add("row");
        } else {
          el.style.margin = "auto";
        }

        // add html markup
        el.innerHTML = x.html;

        // Create Shuffle grid
        var element = document.getElementById(id);
        element.classList.add("shuffle-container");
        var shuffleInstance = new Shuffle(element, x.options.options);

        // No card
        var nocard = document.createElement('div');
        nocard.innerHTML = x.nocard;
        nocard.style.diplay = 'none';
        nocard.setAttribute("id", id + '-nodata');
        nocard.classList.add('shuffle-nodata');
        //element.appendChild(nocard);
        element.parentNode.insertBefore(nocard, element.nextSibling);


        if (x.settings.crosstalk_key !== null) {
          // Crosstalk filter
          var ct_filter = new crosstalk.FilterHandle();
          // Choose group
          ct_filter.setGroup(x.settings.crosstalk_group);
          ct_filter.on("change", function(e) {
            //console.log(e.value);
            shuffleInstance.filter(function(element) {
        	    var filterAttr = element.getAttribute('data-key');
        	    //console.log(filterAttr);
        	    if (e.value === null) {
        	      return true;
        	    } else {
        	      return e.value.indexOf(filterAttr) >= 0;
        	    }
        	  });
          });
        }


        // Sort buttons
        var sortbtn = document.querySelector('.sort-shuffle-btn-' + id);

        if (sortbtn !== null) {
          var sortButtons = Array.from(sortbtn.children);
          //console.log(sortButtons);
          sortButtons.forEach(function (button) {
            button.addEventListener('click', function(e) {
              var sortBy = button.getAttribute('data-sort-by');
              var numeric = button.getAttribute('data-sort-numeric');
              ///console.log(numeric == true);
              var decreasing = button.getAttribute('data-sort-decreasing') === "true";
              if (sortBy == "random") {
                shuffleInstance.sort({randomize: true});
              } else if (sortBy == "random2") {
                shuffleInstance.sort({
                  reverse: decreasing,
                  by: function(element) {
                    if (element.hasAttribute("data-exclude-sort")) {
                      return undefined;
                    }
                    return Math.random();
                  }
                });
              } else {
                shuffleInstance.sort({
                  reverse: decreasing,
                  by: function(element) {
                    if (element.hasAttribute("data-exclude-sort")) {
                      return null;
                    }
                    var sortVal = element.getAttribute('data-' + sortBy);
                    var isnum = JSON.parse(element.getAttribute('data-sc-isnum'));
                    if (isnum !== null) {
                      sortVal = isnum.indexOf(sortBy) < 0 ? sortVal : parseFloat(sortVal);
                    }
                    return sortVal;
                  }
                });
              }
            }, true);
          });
        }


        // Remove buttons
        var removebtn = document.querySelectorAll('.shufflecards-remove');
        if (removebtn !== null) {
          removebtn = Array.from(removebtn);
          removebtn.forEach(function (button) {
            button.addEventListener('click', function(e) {
              var elremove = button.parentNode;
              var shufid = elremove.getAttribute('data-shuffleId');
              if (shufid === id) {
                shuffleInstance.remove([elremove]);
              }
            }, true);
          });
        }


        // No data message
        shuffleInstance.on(Shuffle.EventType.LAYOUT, function (data) {
          if (data.shuffle.visibleItems < 1) {
            document.getElementById(id + '-nodata').style.display = 'block';
          } else {
            document.getElementById(id + '-nodata').style.display = 'none';
          }
        });

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
