"use strict";

var getBuxlGameEvents = function getBuxlGameEvents () 
{
   var events = [];

   // Register Buttons
   var letterButtons = {
        target : ".letter-mass",
        triggers: "click touchend",
        f: "onSelectLetterEvent"
    };

    var letterKeyPress = {
        target : "body",
        triggers: "keypress",
        f: "onKeyPressLetterEvent"
    };

    var solutionButton = {
        target : "#help",
        triggers: "click touchend",
        f: "onClickSolutionEvent"
    };

    events.push(letterButtons);
    events.push(letterKeyPress);
    events.push(solutionButton);

    return events;
};

var getBuxlFavoritesEvents = function getBuxlFavoritesEvents () 
{
    var events = [];

    var favoriteButton = {
        target : "#favorite",
        triggers: "click touchend",
        f: "onClickFavoriteEvent"
    };

    var shuffleButton = {
        target : "#shuffle",
        triggers: "click touchend",
        f: "onClickShuffleEvent"
    };
   
    events.push(favoriteButton);
    events.push(shuffleButton);

    return events;
};

var getBuxlIntroEvents = function getBuxlIntroEvents () 
{
   var events = [];

   var Logo = {
        target : "#svg2",
        triggers: "click touchend",
        f: "onLogoClickEvent"
   };
   
   events.push(Logo);

   return events;
};


document.addEventListener('DOMContentLoaded', function() 
{
    var controller = new BuxlRoutingController();
    controller.registerRoutes();

    var buxlGameModel = new BuxlGameModel(data);
    var buxlFavoritesModel = new BuxlFavoritesModel();

    var buxlGameView = new BuxlGameView ({
           'targetView': "content",
           'targetTemplate': "gametmpl",
           'events' : getBuxlGameEvents ()
    });

    var buxlFavoritesView = new BuxlFavoritesView ({
           'targetView': "sharebox",
           'targetTemplate': "favtmpl",
           'events' : getBuxlFavoritesEvents ()
    });

    var buxlIntroView = new BuxlIntroView ({
           'targetView': "footer",
           'targetTemplate': "footertmpl",
           'events' : getBuxlIntroEvents ()
    });

    controller.register("intro", buxlIntroView, null);
    controller.register("buxlgame", buxlGameView, buxlGameModel);
    controller.register("favorites", buxlFavoritesView, buxlFavoritesModel);

    controller.init();
});
