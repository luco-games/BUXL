let BuxlListController = function BuxlListController () {
    BuxlControllerPrototype.call(this);
};

BuxlListController.prototype = Object.create(BuxlControllerPrototype.prototype);

BuxlListController.prototype.route = function route (route, gameHash) 
{
    let favs = this.model.getFavoritesList();
    this.view.render(favs, false);
};

BuxlListController.prototype.register = function register (buxlView, buxlModel) 
{
    BuxlControllerPrototype.prototype.register.call(this, buxlView, buxlModel);
};

BuxlListController.prototype.init = function init (callback) 
{
    BuxlControllerPrototype.prototype.init.call(this);
};
