var BuxlViewPrototype = function BuxlViewPrototype (controller, elements)
{
   this.elements = elements;
   this.events = elements.events;
   var targetTemplate = document.getElementById(this.elements.targetTemplate);
   var buxlsTemplate = document.getElementById("buxlstmpl");
   this.template = jsrender.templates("gametmpl", targetTemplate);
   this.template = jsrender.templates("buxlstmpl", buxlsTemplate);
   this.controller = controller;
};

BuxlViewPrototype.prototype.render = function render (modelData)
{
    var html = jsrender.render.gametmpl(modelData);
    var targetView = document.getElementById(this.elements.targetView);
    targetView.innerHTML = html;

    var _this = this;
    for (i = 0; i < _this.events.length; i++) 
    {
        var triggers = _this.events[i].triggers.split(' ');
        var elements = document.querySelectorAll(_this.events[i].target);

        for ( var element of elements) 
        {
            for (j = 0; j < triggers.length; j++) 
            {
               var curEventFunction = _this.events[i].f;
               var curEventController = _this.controller;
               var eventToTrigger = curEventController.onEvent (curEventController, curEventFunction);
               element.addEventListener(triggers[j], eventToTrigger.bind(null, curEventController), false);
            }
        }
    }
};
