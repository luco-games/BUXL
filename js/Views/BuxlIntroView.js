let BuxlIntroView = function BuxlIntroView (elements) {
    BuxlViewPrototype.call(this, elements);
};

BuxlIntroView.prototype = Object.create(BuxlViewPrototype.prototype);

BuxlIntroView.prototype.animateLogo = async function animateLogo ()
{
    let _this = this;

    let buxl = anime.timeline({
        autoplay: true,
    });
    // B
    await buxl.add({
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
    }).finished;
};

BuxlIntroView.prototype.render = async function render (callback, registerEvents)
{
    await this.animateLogo();

    let _this = this;

    let buxl = anime.timeline({
        autoplay: true,
    });
    // // svg resize
    buxl.add({
      targets: "svg",
      height: ["100","13"],
      opacity: ["1", "0"],
      elasticity: 0,
      translateY: ["60%"],
      ease: 'linear',
      complete: function (e) {
        let svgClass = document.querySelector('.buxllogo');
        if (svgClass)
            svgClass.classList.remove("buxllogo");

        if (callback)
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
    });
};
