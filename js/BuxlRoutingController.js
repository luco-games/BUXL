var BuxlRoutingController = function BuxlRoutingController () 
{
    this.controllers = {};
};

BuxlRoutingController.prototype.registerView = function registerView (title, elements)
{
   if (title && elements)
   {
        var elements_length = Object.getOwnPropertyNames(elements).length;

        if (elements_length > 0)
        {
            var controller = this.controllers[title];
            var view = new BuxlGameView (controller, elements);
            controller.registerController(view);
        }
   }
};

BuxlRoutingController.prototype.doRouting = function doRouting ()
{
    var route = window.location.hash.substring(1).split('/') || null;

    if (! route || route.length < 1)
    {
        return;
    }
    this.controllers[route[0]].route(route[1]);
};

BuxlRoutingController.prototype.registerControllers = function registerControllers () 
{
    this.controllers["buxl"] = new BuxlGameController();
    //this.controllers["favs"] = registerFavoriteController;
};
