var BuxlIntroController = function BuxlIntroController () {
    BuxlControllerPrototype.call(this);
}

BuxlIntroController.prototype = Object.create(BuxlControllerPrototype.prototype);

BuxlIntroController.prototype.register = function register (buxlView, buxlModel) 
{
    BuxlControllerPrototype.prototype.register.call(this, buxlView, buxlModel);
};

BuxlIntroController.prototype.init = function init (callback) 
{
    this.view.render(callback, false); 
};
