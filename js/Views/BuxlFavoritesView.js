var BuxlFavoritesView = function BuxlGameView (elements) {
    BuxlViewPrototype.call(this, elements);
};

BuxlFavoritesView.prototype = Object.create(BuxlViewPrototype.prototype);

BuxlFavoritesView.prototype.toggleFavorite = function toggleFavorite (dataModel)
{
    var _this = this;

    var target = '#favorite';
    anime.remove (target);
    anime({
      targets: target,
      scale: 0.8,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      duration: 100
    });


    anime({
      targets: '#favorite > i',
      scale: 99,
      opacity: 0,
      easing: 'easeOutQuad',
      run: function (anim) {
        var render = false;
        if (Math.round(anim.progress) > 15)
        {
          if (!render)
          {
            render = true;
            _this.render(dataModel, true);
          }
        }
      }
    });
};
