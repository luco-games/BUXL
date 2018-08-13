let BuxlRoutingController = function BuxlRoutingController () 
{
    this.controllers = {};
    this.routes = {};
    this.events = {};

    let viewEvents = [];

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
        let controller = this.controllers[title];
        controller.register(view, model);
   }
};

BuxlRoutingController.prototype.doRouting = function doRouting (e)
{
    let route = null;

    if (e)
    {
        e.stopImmediatePropagation();
        if (e.detail)
            route = e.detail;
    }

    if (! route)
        route = window.location.hash;

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

    let currentRoute = this.routes[route];
    let successRoute = false;
    
    this.unregisterEvents();

    for (let i = 0; i < currentRoute.length; i++) 
    {
        if (currentRoute[i])
        {
            successRoute = true;
            currentRoute[i].route(route, gameHash);
        }
    }

    if (! successRoute)
        this.routeDefault();
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

BuxlRoutingController.prototype.unregisterEvents = function unregisterEvents () 
{
    for (let controller in this.controllers)
        this.controllers[controller].view.registerEvents(false);
};

BuxlRoutingController.prototype.init = function init ()
{
    for (let controller in this.controllers)
        this.controllers[controller].init(this.doRouting.bind(this));

    this.view.registerEvents(true);
};
