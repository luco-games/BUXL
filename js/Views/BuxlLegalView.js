let BuxlLegalView = function BuxlGameView (elements) {
    BuxlViewPrototype.call(this, elements);
};

BuxlLegalView.prototype = Object.create(BuxlViewPrototype.prototype);

BuxlLegalView.prototype.render = function render (route) {
    let html = jsrender.render[route + "tmpl"]({});

    let targetView = document.getElementById(this.elements.targetView);
    targetView.innerHTML = html;
};
