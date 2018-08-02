var BuxlControllerPrototype = function BuxlControllerPrototype () 
{
    this.events = [];
};

BuxlControllerPrototype.prototype.onEvent = function onEvent (_this, eventName)
{
    var _event = _this.events[eventName]; 
    
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

BuxlControllerPrototype.prototype.route = function route (route) 
{ };

BuxlControllerPrototype.prototype.register = function registerController (buxlView, buxlModel) 
{
    this.view = buxlView;
    this.model = buxlModel;
};
