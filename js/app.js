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

var getBuxlIntroEvents = function getBuxlIntroEvents () 
{
   var events = [];

   Logo = {
        target : "#svg2",
        triggers: "click touchend",
        f: "onLogoClickEvent"
   }
   
   events.push(Logo);

   return events;
}


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
