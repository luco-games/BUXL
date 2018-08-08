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
    console.log(this.savedFavorites);
    localStorage.setItem(this.storageKey, JSON.stringify(this.savedFavorites));
    this.unsavedFavorites = [];
    this.trashedFavorites = [];
};

BuxlFavoritesModel.prototype.mergeUnsavedFavorites = function mergeUnsavedFavorites ()
{
    this.savedFavorites = this.savedFavorites.concat(this.unsavedFavorites);
    this.unsavedFavorites = [];
    this.trashedFavorites = [];
};

BuxlFavoritesModel.prototype.isFavorite = function isFavorite (gameHash)
{
    return (this.savedFavorites.indexOf(gameHash) !== -1);
};

BuxlFavoritesModel.prototype.toggleFavorite = function toggleFavorites (gameHash)
{
    var toggle = false;
    var index = -1;

    if (this.isFavorite(gameHash))
    {
        index = this.savedFavorites.indexOf(gameHash);
        this.savedFavorites.splice(index, 1);

        this.trashedFavorites.unshift(gameHash);
    } 
    else if (this.unsavedFavorites.indexOf(gameHash) !== -1)
    {
        i = this.unsavedFavorites.indexOf(gameHash);
        this.unsavedFavories.splice(index, 1);

        this.trashedFavorites.unshift(gameHash);
    } 
    else
    {
        this.unsavedFavorites.unshift(gameHash);
        toggle = true;
    }
    
    return toggle;
};
