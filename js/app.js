var getBuxlGameEvents = function getBuxlGameEvents () 
{
   var events = [];

   // Register Buttons
   letterButtons = {
        target : ".letter-mass",
        triggers: "click touchend",
        f: "onSelectLetterEvent"
    };

    letterKeyPress = {
        target : "body",
        triggers: "keypress",
        f: "onKeyPressLetterEvent"
    }

    solutionButton = {
        target : "#help",
        triggers: "click touchend",
        f: "onClickSolutionEvent"
    }

    shuffleButton = {
        target : "#shuffle",
        triggers: "click touchend",
        f: "onClickShuffleEvent"
    }

    events.push(letterButtons);
    events.push(letterKeyPress);
    events.push(solutionButton);
    events.push(shuffleButton);

    return events;
};

document.addEventListener('DOMContentLoaded', function() 
{
    var controller = new BuxlRoutingController();

    controller.registerControllers();

    var buxlGameModel = new BuxlGameModel(data);

    controller.registerView("buxl", {
           'targetView': "content",
           'targetTemplate': "gametmpl",
           'events' : getBuxlGameEvents (),
           'targetModel': buxlGameModel});

    //window.addEventListener("hashchange", controller.doRouting, false);

    controller.doRouting();
});
