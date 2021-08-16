/*
*  Shiny bindings for Shuffle.js
*  by VP
*  Copyright (c) 2018 dreamRs.
*/

  var Shuffle = window.Shuffle;

  //var shufflecardssort = new Event('shufflecardssort');
  var shufflecardsupdate = new Event('shufflecardsupdate');
  var shufflecardssort = new CustomEvent('shufflecardssort', { 'data': {} });
  var shufflecardsfiltergroups = new CustomEvent('shufflecardsfiltergroups', { 'data': {} });

  var shuffling = function(element) {
      this.element = element;

      // config
      var config = element.querySelectorAll('script[data-for="' + element.id + '"]');
      var options = JSON.parse(config[0].innerHTML);
      var evals = JSON.parse(config[0].getAttribute('data-eval'));
      if (evals.length > 0) {
        for (var i = 0; i < evals.length; i++) {
          options[evals[i]] = eval('(' + options[evals[i]] + ')');
        }
      }
      //var element = document.getElementById(el.id);
      var sizer = document.getElementById(element.id + '-sizer-element');

      options.itemSelector = '.element-item';
      options.sizer = sizer;
      this.shuffle = new Shuffle(element, options);

      //this._activeFilters = [];

      this.addNoDataListener(element.id);

      this.addFilterGroups();
      this.addSorting();

      this.addSortButtons(element.id);
      this.addRemoveButtons(element.id);

      element.addEventListener("shufflecardsupdate", this.updateInstance.bind(this), false);

  };

  shuffling.prototype.getData = function() {
    var visibleItems = 0;
    this.shuffle.on(Shuffle.EventType.LAYOUT, function (data) {
      visibleItems = data.shuffle.visibleItems;
    });
    return visibleItems;
  };
  shuffling.prototype.updateInstance = function() {
    console.log("UPDATE!");
    var shuffleproto = this;
    setTimeout(function(){ shuffleproto.shuffle.update(); }, 300);
  };

  shuffling.prototype.addNoDataListener = function (id) {
    this.shuffle.on(Shuffle.EventType.LAYOUT, function (data) {
      if (data.shuffle.visibleItems < 1) {
        document.getElementById(id + '-nodata').style.display = 'block';
      } else {
        document.getElementById(id + '-nodata').style.display = 'none';
      }
    });
  };

  shuffling.prototype._handleSortChange = function (evt) {
    var data = evt.data;
    if (data.random) {
      this.shuffle.sort({randomize: true});
    } else {
      this.shuffle.sort({
        reverse: data.decreasing,
        by: function(element) {
          var sortVal = element.getAttribute('data-' + data.sortBy);
          if (data.numeric) {
            sortVal = parseFloat(sortVal);
          }
          return sortVal;
        }
      });
    }
  };


  shuffling.prototype.addSorting = function () {
    var elem = this.element;
    var shuffleproto = this;
    elem.addEventListener('shufflecardssort', function(e) {
      shuffleproto._handleSortChange(e);
    }, true);
  };

  shuffling.prototype._handleFilterGroups = function (evt) {
    var data = evt.data;
    this.shuffle.filter(data.groups);
  };

  shuffling.prototype.addFilterGroups = function () {
    var elem = this.element;
    var shuffleproto = this;
    elem.addEventListener('shufflecardsfiltergroups', function(e) {
      shuffleproto._handleFilterGroups(e);
    }, true);
  };

  shuffling.prototype.addSortButtons = function (id) {
    var options = document.querySelector('.sort-shuffle-btn-' + id);

    if (!options) {
      return;
    }

    var sortButtons = Array.from(options.children);
    var shuffleproto = this;
    sortButtons.forEach(function (button) {
      button.addEventListener('click', function(e) {
        var sortBy = button.getAttribute('data-sort-by');
        var numeric = button.getAttribute('data-sort-numeric');
        ///console.log(numeric == true);
        var decreasing = button.getAttribute('data-sort-decreasing') === "true";
        if (sortBy == "random") {
          shuffleproto.shuffle.sort({randomize: true});
        } else {
          shuffleproto.shuffle.sort({
            reverse: decreasing,
            by: function(element) {
              var sortVal = element.getAttribute('data-' + sortBy);
              var isnum = JSON.parse(element.getAttribute('data-sc-isnum'));
              sortVal = isnum.indexOf(sortBy) < 0 ? sortVal : parseFloat(sortVal);
              return sortVal;
            }
          });
        }
      }, true);
    }, this);
  };

  shuffling.prototype.addRemoveButtons = function (id) {
    var removebtn = document.querySelectorAll('.shufflecards-remove');
    //console.log(removebtn);
    if (!removebtn) {
      return;
    }

    removebtn = Array.from(removebtn);
    var shuffleproto = this;
    removebtn.forEach(function (button) {
      button.addEventListener('click', function(e) {
        var el = button.parentNode;
        var shufid = el.getAttribute('data-shuffleId');
        if (shufid === id) {
          shuffleproto.shuffle.remove([el]);
        }
      }, true);
    }, this);
  };


if (typeof(window.Shiny) !== "undefined" && !!window.Shiny.outputBindings) {

  var shuffleBinding = new Shiny.InputBinding();
  $.extend(shuffleBinding, {
    initialize: function initialize(el) {
       shuffle = new shuffling(document.getElementById(el.id));
       this.shuffleInstance = shuffle;
    },
    find: function(scope) {
    	return $(scope).find('.shuffle-container');
    },
    getId: function(el) {
    	return $(el).attr('id');
    },
    //getType: function() {
      //return "shuffle.data";
    //},
    getValue: function(el) {
      //console.log(this.shuffleInstance);
      var values = {
        visibleItems: this.shuffleInstance.shuffle.visibleItems,
        lastSort: this.shuffleInstance.shuffle.lastSort,
        lastFilter: this.shuffleInstance.shuffle.lastFilter,
        //isVisibleItems: this.shuffleInstance.shuffle.items.map(function(x) {
        //  return x.isVisible; //element.attr('id');
        //}),
        items: this.shuffleInstance.shuffle.items.map(function(x) {
          //console.log(x.element.attributes.id);
          return {
            index: x.id,
            isVisible: x.isVisible,
            id: x.element.id
          };
        })
      };
      return values;
    },
    setValue: function(el, value) {
    },
    subscribe: function(el, callback) {
      this.shuffleInstance.shuffle.on(Shuffle.EventType.LAYOUT, function (data) {
        callback();
      });
     //$('#' + el.id).on("layout.shuffle", function(event) {
      // callback();
     //});
    },
    unsubscribe: function(el) {
    	$(el).off('.shuffleBinding');
    },
    receiveMessage: function(el, data) {

      var elem = document.getElementById(el.id);

      var type = data.type;

      this.data = data;


      // Update card
      if (type == 'update-card') {
        var elementUpdate = document.getElementById(data.id);
        if (data.hasOwnProperty('args')) {
          argsKey = Object.keys(data.args);
          for (var i = 0; i < argsKey.length; i++) {
            elementUpdate.setAttribute(argsKey[i], data.args[argsKey[i]]);
          }
        }
        if (data.hasOwnProperty('title')) {
          var elTitle = elementUpdate.querySelectorAll('.sc-title');
          elTitle[0].innerText = data.title;
        }
      }

      // SORT
    	if (type == 'sort') {
    	  //shufflecardssort.data = data;
        //elem.dispatchEvent(shufflecardssort);
        if (data.random) {
          this.shuffleInstance.shuffle.sort({randomize: true});
        } else {
          this.shuffleInstance.shuffle.sort({
            reverse: data.decreasing,
            by: function(element) {
              var sortVal = element.getAttribute('data-' + data.sortBy);
              var isnum = JSON.parse(element.getAttribute('data-sc-isnum'));
              sortVal = isnum.indexOf(data.sortBy) < 0 ? sortVal : parseFloat(sortVal);
              return sortVal;
            }
          });
        }
    	}


    	if (type == 'filter-groups') {
    	  //shufflecardsfiltergroups.data = data;
    	  //elem.dispatchEvent(shufflecardsfiltergroups);
    	  this.shuffleInstance.shuffle.filter(data.groups);
    	}

    	if (type == 'filter-custom') {
    	  this.shuffleInstance.shuffle.filter(function(element) {
    	    var filterAttr = element.getAttribute(data.filterBy);
    	    return data.filterList[filterAttr] ? true : false;
    	  });
    	}

      if (type == 'update') {
        this.shuffleInstance.shuffle.update();
      }

      if (type == 'add') {
        var elementAdd = document.getElementById(data.id);
        this.shuffleInstance.shuffle.add([elementAdd]);
      }

      if (type == "remove") {
        for (var i = 0; i < data.id.length; i++) {
          var elementRemove = document.getElementById(data.id[i]);
          if (elementRemove !== null) {
            this.shuffleInstance.shuffle.remove([elementRemove]);
          }
        }
      }

      //$(el).trigger('change');
    }
  });
  Shiny.inputBindings.register(shuffleBinding, 'shiny.shuffle');


} else {

}

