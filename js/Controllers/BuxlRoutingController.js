var BuxlRoutingController = function BuxlRoutingController () 
{
    this.controllers = {};
    this.routes = {};
    this.events = {};

    var viewEvents = [];

    viewEvents.push({
        target : "window",
        triggers: "hashchange hiddenroute",
        f: "doRouting"
    });

    this.view = new BuxlRoutingView ({
           'targetView': null,
           'targetTemplate': null,
           'events' : viewEvents
    });

   this.events.doRouting = this.doRouting;
   this.view.linkEventsToController(this);
};

BuxlRoutingController.prototype = Object.create(BuxlControllerPrototype.prototype);

BuxlRoutingController.prototype.register = function register (title, view, model)
{
   if (title)
   {
        var controller = this.controllers[title];
        controller.register(view, model);
   }
};

BuxlRoutingController.prototype.doRouting = function doRouting (e)
{
    var route = null;

    if (e)
    {
        e.stopImmediatePropagation();
        if (e.detail)
            route = e.detail;
    }

    if (! route)
        var route = window.location.hash;

    route = route.substring(2).split('/');

    this.route(route[0], route[1]);
};

BuxlRoutingController.prototype.route = function route (route, gameHash)
{
    if (route === "")
    {
        this.routeDefault();
        return;
    }

    var currentRoute = this.routes[route];

    for (var i = 0; i < currentRoute.length; i++) 
        if (currentRoute[i])
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
    this.controllers.navbar = new BuxlNavigationController();
    this.controllers.list = new BuxlListController();

    this.routes.buxl = [];
    this.routes.buxl.push(this.controllers.buxlgame);
    this.routes.buxl.push(this.controllers.navbar);

    this.routes.favorites = [];
    this.routes.favorites.push(this.controllers.list);
    this.routes.favorites.push(this.controllers.navbar);
};

BuxlRoutingController.prototype.init = function init ()
{
    for (var controller in this.controllers)
        this.controllers[controller].init(this.doRouting.bind(this));

    this.view.registerEvents();
};
