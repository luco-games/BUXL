var BuxlRoutingController = function BuxlRoutingController () 
{
    this.controllers = {};
    this.routes = {};
    this.events = {};

    var viewEvents = [];

    viewEvents.push({
        target : "window",
        triggers: "hashchange",
        f: "doRouting"
    });

    this.view = new BuxlRoutingView ({
           'targetView': null,
           'targetTemplate': null,
           'events' : viewEvents
    });

    this.events.doRouting = this.doRouting;
    this.view.registerController(this);
};

BuxlRoutingController.prototype = Object.create(BuxlControllerPrototype.prototype);

BuxlRoutingController.prototype.register = function register (title, view, model)
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
    var route = window.location.hash.substring(2).split('/');

    if (route.length < 2)
        this.routeDefault();
    else
    	this.route(route[0], route[1]);
};

BuxlRoutingController.prototype.route = function route (route, gameHash)
{
    var currentRoute = this.routes[route];

    if (typeof currentRoute === 'undefined')
        this.routeDefault();

    for (var i = 0; i < currentRoute.length; i++) 
        currentRoute[i].route(route, gameHash);
};

BuxlRoutingController.prototype.routeDefault = function routeDefault ()
{
    this.view.routeTo("buxl",null);
};

BuxlRoutingController.prototype.registerRoutes = function registerRoutes () 
{
    this.controllers.buxlgame = new BuxlGameController();
    this.controllers.intro = new BuxlIntroController();
    this.controllers.favorites = new BuxlFavoritesController();

    this.routes.buxl = [];
    this.routes.buxl.push(this.controllers.buxlgame);
    this.routes.buxl.push(this.controllers.favorites);

    this.routes.favorites = [];
    this.routes.favorites.push(this.controllers.favorites);
};

BuxlRoutingController.prototype.init = function init ()
{
    for (var controller in this.controllers)
        this.controllers[controller].init(this.doRouting.bind(this));

    this.view.registerEvents();
};
