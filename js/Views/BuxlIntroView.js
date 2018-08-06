var BuxlIntroView = function BuxlIntroView (elements) {
    BuxlViewPrototype.call(this, elements);
}

BuxlIntroView.prototype = Object.create(BuxlViewPrototype.prototype);

BuxlIntroView.prototype.render = function render (callback, registerEvents)
{
    var _this = this;

    var buxl = anime.timeline({
        autoplay: true,
    });
    // B
    buxl.add({
      targets: "#path82",
      translateX: ["-30%", "0%"],
      elasticity: 100,
    }) // U 
    .add({
      targets: "#path226",
      translateY: ["200%", "0%"],
      offset: '-=700'
    }) // X
    .add({
      targets: "#path298",
      translateY: ["200%", "0%"],
      offset: '-=900'
    }) // L
    .add({
      targets: "#path154",
      translateX: ["30%", "0%"],
      offset: '-=800',
    }) // svg resize
    .add({
      targets: "svg",
      height: ["100","13"],
      opacity: ["1", "0"],
      elasticity: 0,
      translateY: ["60%"],
      ease: 'linear',
      complete: function (e) {
        var svgClass = document.querySelector('.buxllogo');
        if (svgClass)
            svgClass.classList.remove("buxllogo");

        callback();
     }
    }) // svg change size from % to px
    .add({
      targets: "svg",
      height: ["0px", "100px"],
      opacity: ["0","1"],
      translateY: ["0%"],
      elasticity: 0,
      ease: 'linear',
    }) // display footer
    .add({
        targets: 'footer',
        opacity: [0, 1],
        duration: 300,
        begin: function () {
         BuxlViewPrototype.prototype.render.call(_this, null, false);
        }
    });
};
