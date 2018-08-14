let BuxlFooterController = function BuxlFooterController () {
    BuxlControllerPrototype.call(this);
};

BuxlFooterController.prototype = Object.create(BuxlControllerPrototype.prototype);

BuxlFooterController.prototype.route = function route (route, gameHash) 
{
    this.view.render();
};
