var BuxlIntroController = function BuxlIntroController () {
    BuxlControllerPrototype.call(this);
};

BuxlIntroController.prototype = Object.create(BuxlControllerPrototype.prototype);

BuxlIntroController.prototype.onLogoClickEvent = function onLogoClickEvent (e) 
{
    this.view.animateLogo();
};

BuxlIntroController.prototype.register = function register (buxlView, buxlModel) 
{
    BuxlControllerPrototype.prototype.register.call(this, buxlView, buxlModel);
    this.events.onLogoClickEvent = this.onLogoClickEvent;
};

BuxlIntroController.prototype.init = function init (callback) 
{
    this.view.render(callback, true); 
};
