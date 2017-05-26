(function() {

  if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {

  Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

  window._$ = function(cl, parent) {
    
    let doc = parent || document,
        el = doc.querySelectorAll(cl);

    if(el && el.length > 1){
      return el;
    } else if(el){
      return el[0];
    } else {
      return null;
    }


    }

})();