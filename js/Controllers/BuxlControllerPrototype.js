var BuxlControllerPrototype = function BuxlControllerPrototype () 
{
    this.events = [];
};

BuxlControllerPrototype.prototype.onEvent = function onEvent (eventName)
{
    var _event = this.events[eventName]; 
    
    if (_event)
    {
        return _event;
    }
    else
    {
        console.log("[Warning] Event not found");
        return null;
    }
};

BuxlControllerPrototype.prototype.route = function route (route, gameHash)
{ };

BuxlControllerPrototype.prototype.init = function init (callback)
{ 
   this.view.linkEventsToController(this);
};

BuxlControllerPrototype.prototype.register = function registerController (buxlView, buxlModel) 
{
    this.view = buxlView;
    this.model = buxlModel;
};
