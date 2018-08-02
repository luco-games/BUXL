var BuxlFavoritesModel = function BuxlFavoritesModel ()
{
    this.savedFavorites = [];
    this.unsavedFavorites = [];
    this.trashedFavorites = [];
    this.storageKey = "buxlStoredFavorites";
};

BuxlFavoritesModel.prototype.getFavorites = function getFavorites ()
{
    return this.savedFavorites;
};

BuxlFavoritesModel.prototype.loadFavorites = function loadFavorites ()
{
    this.unsavedFavorites = [];
    this.trashedFavorites = [];

    var storedFavoritesJSON = localStorage.getItem(this.storageKey);
    
    if (storedFavoritesJSON)
        this.savedFavorites = JSON.parse(storedFavoritesJSON);
    else
        this.savedFavorites = [];
};

BuxlFavoritesModel.prototype.saveFavorites = function saveFavorites ()
{
    localStorage.setItem(this.storageKey, JSON.stringify(this.unsavedFavorites));
    this.unsavedFavorites = [];
    this.trashedFavorites = [];
};

BuxlFavoritesModel.prototype.mergeUnsavedFavorites = function mergeUnsavedFavorites ()
{
    //this.unsavedFavorites = [];
    //this.trashedFavorites = [];
};

BuxlFavoritesModel.prototype.toggleFavorite = function toggleFavorites (gameHash)
{
    var toggle = false;

    if (isInArray(gameHash, this.savedFavorites))
    {
        var i = this.savedFavorites.indexOf(gameHash);
        this.savedFavories.splice(i, 1);

        this.trashedFavorites.unshift(gameHash);
    } 
    else if (isInArray(gameHash, this.unsavedFavorites))
    {
        var i = this.unsavedFavorites.indexOf(gameHash);
        this.unsavedFavories.splice(i, 1);

        this.trashedFavorites.unshift(gameHash);
    } 
    else
    {
        this.unsavedFavorites.unshift(gameHash);
        toggle = true;
    }
    
    return toggle;
};
