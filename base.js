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

  Array.prototype.random = function(){
    return this[Math.floor(Math.random() * this.length)];
  }

  Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
      let num = Math.floor(Math.random() * (i + 1));
      let d = this[num];
      this[num] = this[i];
      this[i] = d;
    }
    return this;
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