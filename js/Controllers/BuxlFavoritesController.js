var BuxlFavoritesController = function BuxlFavoritesController () {
    BuxlControllerPrototype.call(this);
    this.currentGameHash = null;
};

BuxlFavoritesController.prototype = Object.create(BuxlControllerPrototype.prototype);

BuxlFavoritesController.prototype.onFavoriteEvent = function onFavoriteEvent (e)
{
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();

    var isFavorite = this.model.toggleFavorite (this.currentGameHash);
    
    this.model.mergeUnsavedFavorites();
    this.model.saveFavorites();
    
    this.view.toggleFavorite(
       { "isFavorite" : isFavorite});
};

BuxlFavoritesController.prototype.route = function route (route, gameHash)
{
    this.currentGameHash = gameHash;
    this.currentRoute = route;

    if (route === "buxl")
    {
        var isFavorite = this.model.isFavorite(gameHash);
        this.view.render(
           { "isFavorite" : isFavorite}, 
           true);
    }
};

BuxlFavoritesController.prototype.register = function register (buxlView, buxlModel) 
{
    BuxlControllerPrototype.prototype.register.call(this, buxlView, buxlModel);

    this.events.onClickFavoriteEvent = this.onFavoriteEvent;
};

BuxlFavoritesController.prototype.init = function init (callback)
{
    this.model.loadFavorites();
};
