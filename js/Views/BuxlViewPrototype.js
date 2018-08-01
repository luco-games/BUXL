var BuxlViewPrototype = function BuxlViewPrototype (controller, elements)
{
   this.elements = elements;
   this.events = elements.events;
   this.template = $.templates(this.elements.targetTemplate);
   this.controller = controller;
};

BuxlViewPrototype.prototype.render = function render (modelData)
{
    var html = this.template.render(modelData);

    var _this = this;
    setTimeout(function () {
        $(_this.elements.targetView).html(html);
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

                   element.addEventListener(triggers[j], function (e) 
                   {
                       console.log("event fired");
                       console.log(curEventController);
                       curEventController.onEvent (curEventFunction, curEventController, e);
                   }, false);
                }
            }
        }
    }, 200);
};
