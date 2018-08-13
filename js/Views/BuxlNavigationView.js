let BuxlNavigationView = function BuxlGameView (elements) {
    BuxlViewPrototype.call(this, elements);
};

BuxlNavigationView.prototype = Object.create(BuxlViewPrototype.prototype);

BuxlNavigationView.prototype.toggleFavorite = function toggleFavorite (dataModel)
{
    let _this = this;
    let colorLightBlue = "rgba(183, 226, 248, 0.75)";
    let colorRed = "rgba(255, 0, 102 , 1)";
    let backgroundStart = colorRed;
    let backgroundEnd = colorLightBlue;

    if (dataModel.isFavorite) {
        backgroundStart = colorLightBlue;
        backgroundEnd = colorRed;
    }

    anime({
        targets: '[data-game-hash="' + dataModel.gameHash + '"] .favorite > i',
        scale: [1,99,1],
        color: [backgroundStart,backgroundEnd],
        easing: 'easeOutQuad',
    });

    if (dataModel.route == "favorites")
    {
        let selectedFavorite = document.querySelector('[data-game-hash="' + dataModel.gameHash + '"]');
        
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
    }
};

BuxlNavigationView.prototype.showSolutions = function showSolutions (gameHash)
{
    let selectedFavorite = document.querySelector('[data-game-hash="' + gameHash + '"] > .solutionsbox');
    
    if (! selectedFavorite)
        return;
    
    selectedFavorite.classList.toggle("not-visible");
    
};

BuxlNavigationView.prototype.goBack = function goBack ()
{
	window.history.back();
};

BuxlNavigationView.prototype.clearRender = function clearRender ()
{
    let oldTargetView = document.getElementById(this.elements.targetView);

    if (oldTargetView)
        oldTargetView.innerHTML = "";
};

