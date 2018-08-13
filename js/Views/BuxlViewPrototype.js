"use strict";
let BuxlViewPrototype = function BuxlViewPrototype (elements)
{
    this.elements = elements;
    this.events = elements.events;
    this.eventfunctions = {};

    if (this.elements.templates)
    {
        for (let i=0; i < this.elements.templates.length; i++)
        {
            let curTemplateName = this.elements.templates[i];
            let templateElement = document.getElementById(curTemplateName);
            jsrender.templates(curTemplateName, templateElement);
        }
    }

    if (this.elements.targetTemplate)
    { 
        let targetTemplate = document.getElementById(this.elements.targetTemplate);
        this.template = jsrender.templates(this.elements.targetTemplate, targetTemplate);
    }

};

BuxlViewPrototype.prototype.registerEventsPerTrigger = function registerEventsPerTrigger (element, f, triggers, addEventListener)
{
    for (let j = 0; j < triggers.length; j++) 
    {
        let curEventFunction = f;

        if (addEventListener)
            element.addEventListener(triggers[j], this.eventfunctions[curEventFunction], true);
        else
            element.removeEventListener(triggers[j], this.eventfunctions[curEventFunction], true);
    }
};

BuxlViewPrototype.prototype.registerEvents = function registerEvents (addEventListener)
{
    if (! this.events)
        return;

    for (let i = 0; i < this.events.length; i++) 
    {
        let triggers = this.events[i].triggers.split(' ');

        if (this.events[i].target === "window")
        {
            this.registerEventsPerTrigger(window, this.events[i].f,  triggers, addEventListener);
        }
        else
        {
            let elements = document.querySelectorAll(this.events[i].target);
            for (let j = 0; j < elements.length; j++)
                this.registerEventsPerTrigger(elements[j], this.events[i].f, triggers, addEventListener);
        }
    }
};

BuxlViewPrototype.prototype.render = function render (modelData, registerEvents)
{
    let html = jsrender.render[this.elements.targetTemplate](modelData ? modelData : {});

    let targetView = document.getElementById(this.elements.targetView);
    targetView.innerHTML = html;
    
    if (registerEvents)
        this.registerEvents(true);

};

BuxlViewPrototype.prototype.routeTo = function routeTo (controllerName, id)
{
    if (id)
    {
        location.hash = "#/" + controllerName + "/" + id;
    }
    else
    {
        let evt = new CustomEvent('hiddenroute', { detail: "#/" + controllerName + "/"});
        window.dispatchEvent(evt);
    }
};

BuxlViewPrototype.prototype.linkEventsToController = function linkEventsToController (controller)
{
    if (controller && this.events)
    {
        for (let i = 0; i < this.events.length; i++) 
        {
            let curEventFunction = this.events[i].f;
            let curEventController = controller;
            let eventToTrigger = curEventController.onEvent (curEventFunction);

            if (eventToTrigger)
                this.eventfunctions[curEventFunction] = eventToTrigger.bind(curEventController);
        }
    }
};
