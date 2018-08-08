var BuxlViewPrototype = function BuxlViewPrototype (elements)
{
    this.elements = elements;
    this.events = elements.events;
    this.eventfunctions = {};

    if (this.elements.targetTemplate)
    { 
        var targetTemplate = document.getElementById(this.elements.targetTemplate);
        this.template = jsrender.templates(this.elements.targetTemplate, targetTemplate);
        var buxlsTemplate = document.getElementById("buxlstmpl");
        this.template = jsrender.templates("buxlstmpl", buxlsTemplate);
    }
};

BuxlViewPrototype.prototype.registerEventsPerTrigger = function registerEventsPerTrigger (element, f, triggers)
{
    for (var j = 0; j < triggers.length; j++) 
    {
       var curEventFunction = f;
       element.removeEventListener(triggers[j], this.eventfunctions[curEventFunction], false);
       element.addEventListener(triggers[j], this.eventfunctions[curEventFunction], false);
    }
};

BuxlViewPrototype.prototype.registerEvents = function registerEvents ()
{
    for (var i = 0; i < this.events.length; i++) 
    {
        var triggers = this.events[i].triggers.split(' ');

        if (this.events[i].target === "window")
        {
            this.registerEventsPerTrigger(window, this.events[i].f,  triggers);
        }
        else
        {
            var elements = document.querySelectorAll(this.events[i].target);
            for (var element of elements) 
                this.registerEventsPerTrigger(element, this.events[i].f, triggers);
        }
    }
};

BuxlViewPrototype.prototype.render = function render (modelData, registerEvents)
{
    var html = jsrender.render[this.elements.targetTemplate](modelData ? modelData : {});

    var targetView = document.getElementById(this.elements.targetView);
    targetView.innerHTML = html;
    
    if (registerEvents)
        this.registerEvents();

};

BuxlViewPrototype.prototype.routeTo = function routeTo (controllerName, id)
{
    if (id)
    {
        location.hash = "#/" + controllerName + "/" + id;
    }
    else
    {
        var evt = new CustomEvent('hiddenroute', { detail: "#/" + controllerName + "/"});
        window.dispatchEvent(evt);
    }
};

BuxlViewPrototype.prototype.linkEventsToController = function linkEventsToController (controller)
{
    if (controller && this.events)
    {
        for (var i = 0; i < this.events.length; i++) 
        {
            var curEventFunction = this.events[i].f;
            var curEventController = controller;
            var eventToTrigger = curEventController.onEvent (curEventFunction);

            if (eventToTrigger)
                this.eventfunctions[curEventFunction] = eventToTrigger.bind(curEventController);
        }
    }
};

