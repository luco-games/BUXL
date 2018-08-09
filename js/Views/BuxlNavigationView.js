var BuxlNavigationView = function BuxlGameView (elements) {
    BuxlViewPrototype.call(this, elements);
};

BuxlNavigationView.prototype = Object.create(BuxlViewPrototype.prototype);

BuxlNavigationView.prototype.toggleFavorite = function toggleFavorite (dataModel, renderFunction)
{
    var _this = this;

    anime({
      targets: '[data-game-hash="' + dataModel.gameHash + '"] .favorite > i',
      scale: 99,
      opacity: 0,
      easing: 'easeOutQuad',
      run: function (anim) {
        var render = false;
        if (Math.round(anim.progress) > 10)
        {
          if (!render)
          {
            render = true;
            renderFunction();
          }
        }
      }
    });

    var selectedFavorite = document.querySelector('[data-game-hash="' + dataModel.gameHash + '"]');
    
    if (! selectedFavorite)
        return;
    
    if (selectedFavorite.classList.contains("fade-out"))
        anime({
          targets: selectedFavorite,
          opacity: 1,
          easing: 'easeOutQuad',
          complete: function () {
              selectedFavorite.classList.remove("fade-out"); 
          }
        });
    else
        anime({
          targets: selectedFavorite,
          opacity: 0.3,
          easing: 'easeOutQuad',
          complete: function () {
               selectedFavorite.classList.add("fade-out"); 
          }
        });

};

BuxlNavigationView.prototype.showSolutions = function showSolutions (gameHash)
{
    var selectedFavorite = document.querySelector('[data-game-hash="' + gameHash + '"] > .solutionsbox');
    
    if (! selectedFavorite)
        return;
    
    selectedFavorite.classList.toggle("not-visible");
    
};

BuxlNavigationView.prototype.clearRender = function clearRender ()
{
    var oldTargetView = document.getElementById(this.elements.targetView);

    if (oldTargetView)
        oldTargetView.innerHTML = "";
};

BuxlNavigationView.prototype.renderOnList = function renderOnList (dataModel, registerEvents)
{
    var html = jsrender.render[this.elements.targetTemplate](dataModel ? dataModel : {});

    var targetView = document.querySelector('.navoutterbar [data-game-hash="' + dataModel.gameHash + '"]');
    targetView.innerHTML = html;
    
    if (registerEvents)
        this.registerEvents();
};
