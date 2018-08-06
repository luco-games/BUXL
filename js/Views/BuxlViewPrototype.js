var BuxlViewPrototype = function BuxlViewPrototype (elements)
{
    this.elements = elements;
    this.events = elements.events;

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
    for (j = 0; j < triggers.length; j++) 
    {
       var curEventFunction = f;
       var curEventController = this.controller;
       var eventToTrigger = curEventController.onEvent (curEventController, curEventFunction);
       element.addEventListener(triggers[j], eventToTrigger.bind(curEventController), false);
    }
}

BuxlViewPrototype.prototype.registerEvents = function registerEvents ()
{
    for (i = 0; i < this.events.length; i++) 
    {
        var triggers = this.events[i].triggers.split(' ');

        if (this.events[i].target === "window")
        {
            this.registerEventsPerTrigger(window, this.events[i].f,  triggers);
        }
        else
        {
            var elements = document.querySelectorAll(this.events[i].target);

            for ( var element of elements) 
                this.registerEventsPerTrigger(element, this.events[i].f, triggers);
        }
    }
}

BuxlViewPrototype.prototype.render = function render (modelData, registerEvents)
{
    if (modelData)
    {
        var html = jsrender.render[this.elements.targetTemplate](modelData);
    } else {
        var html = jsrender.render[this.elements.targetTemplate]();
    }

    var targetView = document.getElementById(this.elements.targetView);
    targetView.innerHTML = html;
    
    if (registerEvents)
        this.registerEvents();

};

BuxlViewPrototype.prototype.routeTo = function routeTo (controllerName, id)
{
    location.hash = "#" + controllerName + "/" + (id ? id : "");
}

BuxlViewPrototype.prototype.registerController = function registerController (controller)
{
    this.controller = controller;
};

