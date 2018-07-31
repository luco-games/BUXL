$(function() {

var buxlModel = new BuxlModel(data);

var controller = new BuxlController();
controller.registerControllers();

controller.registerView("buxl", {
       'targetView': "#content",
       'targetTemplate': "#gametmpl",
       'shuffleButton' : "shuffle", 
       'helpButton' : "help",
       'favoriteButton' : "favorite",
       'letter' : "letter-mass",
       'targetModel': buxlModel});

//window.addEventListener("hashchange", controller.doRouting, false);

controller.doRouting();


});
