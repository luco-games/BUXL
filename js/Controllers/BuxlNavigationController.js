var BuxlNavigationController = function BuxlNavigationController () {
    BuxlControllerPrototype.call(this);
    this.currentGameHash = null;
};

BuxlNavigationController.prototype = Object.create(BuxlControllerPrototype.prototype);

BuxlNavigationController.prototype.triggerAction = function triggerAction (trigger, gameHash)
{
    switch(true) {
        case trigger.contains("shuffle"):
            this.view.routeTo("buxl", null);
            return true;
        case trigger.contains("listFavorites"):
            this.view.routeTo("favorites", null);
            return true;
        case trigger.contains("favorite"):
            this.toggleFavorite(gameHash);
            return true;
        case trigger.contains("playBuxl"):
            this.view.routeTo("buxl", gameHash);
            return true;
        case trigger.contains("showSolutions"):
            this.view.showSolutions(gameHash);
            return true;
    } 
    
    return false;
};

BuxlNavigationController.prototype.onNavigationClickEvent = function onNavigationClickEvent (e)
{
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();

    if (! e.target)
        return;

    var gameHash = e.currentTarget.dataset.gameHash;

    if (e.target.parentElement && this.triggerAction (e.target.parentElement.classList, gameHash) )
        return;
    else if (e.target.firstElementChild && this.triggerAction (e.target.firstElementChild.classList, gameHash))
        return;
    else
        return;
};

BuxlNavigationController.prototype.toggleFavorite = function toggleFavorite (gameHash)
{
    if (!gameHash)
        return;

    var isFavorite = this.model.toggleFavorite (gameHash);
    
    this.model.mergeUnsavedFavorites();
    this.model.saveFavorites();
    
    var dataModel = { "isFavorite" : isFavorite,
         "route"      : this.currentRoute,
         "gameHash"   : gameHash
       };

    var render = null;

    if (this.currentRoute === "buxl")
        render = this.view.render.bind(this.view, dataModel , true)
    else if (this.currentRoute === "favorites")
        render = this.view.renderOnList.bind(this.view, dataModel , true)

    this.view.toggleFavorite(dataModel, render);
};

BuxlNavigationController.prototype.route = function route (route, gameHash)
{
    this.currentRoute = route;

    if (route === "buxl" && gameHash)
    {
        var isFavorite = this.model.isFavorite(gameHash);
        this.view.render(
           { "isFavorite" : isFavorite,
             "route"      : route,
             "gameHash"   : gameHash
           }, true);
    } 
    else if (route === "favorites")
    {
	this.view.clearRender();
        this.view.registerEvents();
    }
};

BuxlNavigationController.prototype.register = function register (buxlView, buxlModel) 
{
    this.events.onNavigationClickEvent = this.onNavigationClickEvent;
    this.renders = [];

    BuxlControllerPrototype.prototype.register.call(this, buxlView, buxlModel);
};

BuxlNavigationController.prototype.init = function init (callback)
{
    BuxlControllerPrototype.prototype.init.call(this);
    this.model.loadFavorites();
};
