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

var getBuxlFavoritesEvents = function getBuxlFavoritesEvents () 
{
   var events = [];

   favoriteButton = {
        target : "#favorite",
        triggers: "click touchend",
        f: "onClickFavoriteEvent"
   }
   
   events.push(favoriteButton);

   return events;
}

document.addEventListener('DOMContentLoaded', function() 
{
    var controller = new BuxlRoutingController();

    controller.registerControllers();

    var buxlGameModel = new BuxlGameModel(data);
    var buxlFavoritesModel = new BuxlFavoritesModel();

    var buxlGameView = new BuxlGameView ({
           'targetView': "content",
           'targetTemplate': "gametmpl",
           'events' : getBuxlGameEvents ()
    });
    
    var buxlFavoritesView = new BuxlFavoritesView ({
           'targetView': "content",
           'targetTemplate': "gametmpl",
           'events' : getBuxlFavoritesEvents ()
    });

    controller.register("buxl", buxlGameView, buxlGameModel);

    controller.doRouting();

    controller.register("favorites", buxlFavoritesView, buxlFavoritesModel);

    //window.addEventListener("hashchange", controller.doRouting, false);

});
