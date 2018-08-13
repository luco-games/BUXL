let getBuxlGameEvents = function getBuxlGameEvents () 
{
   let events = [];

   // Register Buttons
   let letterButtons = {
        target : ".letter-mass",
        triggers: "click touchend",
        f: "onSelectLetterEvent"
    };

    let letterKeyPress = {
        target : "body",
        triggers: "keypress",
        f: "onKeyPressLetterEvent"
    };

    let solutionButton = {
        target : "#help",
        triggers: "click touchend",
        f: "onClickSolutionEvent"
    };

    events.push(letterButtons);
    events.push(letterKeyPress);
    events.push(solutionButton);

    return events;
};

let getBuxlNavigationEvents = function getBuxlNavigationEvents () 
{
    let events = [];

    let navigationButtons = {
        target : ".navbar",
        triggers: "click touchend",
        f: "onNavigationClickEvent"
    };

    events.push(navigationButtons);

    return events;
};

let getBuxlIntroEvents = function getBuxlIntroEvents () 
{
   let events = [];

   let Logo = {
        target : "#svg2",
        triggers: "click touchend",
        f: "onLogoClickEvent"
   };
   
   events.push(Logo);

   return events;
};


document.addEventListener('DOMContentLoaded', function() 
{
    let controller = new BuxlRoutingController();
    controller.registerRoutes();

    let buxlGameModel = new BuxlGameModel(data);
    let buxlFavoritesModel = new BuxlFavoritesModel();
    let buxlListModel = new BuxlListModel({
            "buxlGameModel" : buxlGameModel,
            "buxlFavoritesModel" : buxlFavoritesModel
        });

    let buxlGameViewTmpls = [];
    buxlGameViewTmpls.push("buxlstmpl");
    buxlGameViewTmpls.push("solutionstmpl");

    let buxlListViewTmpls = [];
    buxlListViewTmpls.push("buxlstmpl");
    buxlListViewTmpls.push("navtmpl");
    buxlListViewTmpls.push("solutionstmpl");

    let buxlGameView = new BuxlGameView ({
           'targetView': "content",
           'targetTemplate': "gametmpl",
           'templates' : buxlGameViewTmpls,
           'events' : getBuxlGameEvents ()
    });

    let buxlListView = new BuxlListView ({
           'targetView': "content",
           'targetTemplate': "buxlslisttmpl",
           'templates' : buxlListViewTmpls
    });

    let buxlNavigationView = new BuxlNavigationView ({
           'targetView': "navigation",
           'targetTemplate': "navtmpl",
           'events' : getBuxlNavigationEvents ()
    });

    let buxlIntroView = new BuxlIntroView ({
           'targetView': "footer",
           'targetTemplate': "footertmpl",
           'events' : getBuxlIntroEvents ()
    });

    controller.register("intro", buxlIntroView, null);
    controller.register("buxlgame", buxlGameView, buxlGameModel);
    controller.register("navbar", buxlNavigationView, buxlFavoritesModel);
    controller.register("list", buxlListView, buxlListModel);

    // Gradient Bug Fix
    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    
    if (!isChrome)
    {    
        let root = document.getElementsByTagName( 'html' )[0]; // '0' to assign the first (and only `HTML` tag)
        if (root)
            root.setAttribute( 'class', 'not-chrome' );
    }

    controller.init();
});
