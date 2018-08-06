var BuxlFavoritesController = function BuxlFavoritesController () {
    BuxlControllerPrototype.call(this);
}

BuxlFavoritesController.prototype = Object.create(BuxlControllerPrototype.prototype);

BuxlFavoritesController.prototype.onFavoriteEvent = function onFavoriteEvent (context, e)
{
    e.stopPropagation();
    e.preventDefault();

    console.log ("Fav Event Fired");
    //context.model.toggleFavorite (gameHash);

    //context.model.mergeUnsavedFavorites();
    //context.model.saveFavorites();
};

BuxlFavoritesController.prototype.route = function route (route)
{
    this.view.render(null, true);
};

BuxlFavoritesController.prototype.register = function register (buxlView, buxlModel) 
{
    BuxlControllerPrototype.prototype.register.call(this, buxlView, buxlModel);

    this.events["onClickFavoriteEvent"] = this.onFavoriteEvent;
};

BuxlFavoritesController.prototype.init = function init (callback)
{
    this.model.loadFavorites();
};
