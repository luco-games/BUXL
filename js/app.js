var getBuxlGameEvents = function getBuxlGameEvents () 
{
   var events = [];

   // Register Buttons
   letterButtons = {
        target : ".letter-mass",
        triggers: "click touchend",
        f: "onSelectLetterEvent"
    };

    events.push(letterButtons);

    return events;
};

$(function() {


    var controller = new BuxlRoutingController();

    controller.registerControllers();

    var buxlGameModel = new BuxlGameModel(data);

    controller.registerView("buxl", {
           'targetView': "#content",
           'targetTemplate': "#gametmpl",
           'events' : getBuxlGameEvents (),
           'targetModel': buxlGameModel});

    //window.addEventListener("hashchange", controller.doRouting, false);

    controller.doRouting();

});
