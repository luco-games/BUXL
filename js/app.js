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

var getBuxlNavigationEvents = function getBuxlNavigationEvents () 
{
    var events = [];

    var navigationButtons = {
        target : ".navbar",
        triggers: "click touchend",
        f: "onNavigationClickEvent"
    };

    events.push(navigationButtons);

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
    var buxlListModel = new BuxlListModel({
            "buxlGameModel" : buxlGameModel,
            "buxlFavoritesModel" : buxlFavoritesModel
        });

    var buxlGameViewTmpls = [];
    buxlGameViewTmpls.push("buxlstmpl");
    buxlGameViewTmpls.push("solutionstmpl");

    var buxlListViewTmpls = [];
    buxlListViewTmpls.push("buxlstmpl");
    buxlListViewTmpls.push("navtmpl");
    buxlListViewTmpls.push("solutionstmpl");

    var buxlGameView = new BuxlGameView ({
           'targetView': "content",
           'targetTemplate': "gametmpl",
           'templates' : buxlGameViewTmpls,
           'events' : getBuxlGameEvents ()
    });

    var buxlListView = new BuxlListView ({
           'targetView': "content",
           'targetTemplate': "buxlslisttmpl",
           'templates' : buxlListViewTmpls
    });

    var buxlNavigationView = new BuxlNavigationView ({
           'targetView': "navigation",
           'targetTemplate': "navtmpl",
           'events' : getBuxlNavigationEvents ()
    });

    var buxlIntroView = new BuxlIntroView ({
           'targetView': "footer",
           'targetTemplate': "footertmpl",
           'events' : getBuxlIntroEvents ()
    });

    controller.register("intro", buxlIntroView, null);
    controller.register("buxlgame", buxlGameView, buxlGameModel);
    controller.register("navbar", buxlNavigationView, buxlFavoritesModel);
    controller.register("list", buxlListView, buxlListModel);

    controller.init();
});
