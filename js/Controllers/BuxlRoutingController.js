var BuxlRoutingController = function BuxlRoutingController () 
{
    this.controllers = {};
};

BuxlRoutingController.prototype.register = function registerView (title, view, model)
{
   if (title)
   {
        var controller = this.controllers[title];

        view.registerController(controller);
        controller.register(view, model);
   }
};

BuxlRoutingController.prototype.doRouting = function doRouting ()
{
    var route = window.location.hash.substring(1).split('/');

    if (route.length < 2)
    {
    	this.controllers["default"].route(null);
    } 
    else
    {
    	this.controllers[route[0]].route(route[1]);
    }
};

BuxlRoutingController.prototype.registerControllers = function registerControllers () 
{
    this.controllers["buxl"] = new BuxlGameController();
    this.controllers["default"] = this.controllers["buxl"];
    this.controllers["favorites"] = new BuxlFavoritesController();
};
