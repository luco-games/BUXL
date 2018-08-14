let BuxlLegalController = function BuxlLegalController () {
    BuxlControllerPrototype.call(this);
};

BuxlLegalController.prototype = Object.create(BuxlControllerPrototype.prototype);

BuxlLegalController.prototype.route = function route (route, gameHash) 
{
    console.log("Legal " + route + " " + gameHash);
    this.view.render(route);
};

BuxlLegalController.prototype.init = function init (callback) 
{
    BuxlControllerPrototype.prototype.init.call(this);
};
