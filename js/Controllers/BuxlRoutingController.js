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
    //this.controllers["favs"] = registerFavoriteController;
};
