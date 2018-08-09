var BuxlListModel = function BuxlListModel (elements)
{
    this.buxlGameModel = elements.buxlGameModel;
    this.buxlFavoritesModel = elements.buxlFavoritesModel;
};

BuxlListModel.prototype.getFavoritesList = function getFavoritesList ()
{
    if (! this.buxlFavoritesModel.savedFavorites)
        this.buxlFavoritesModel.loadFavorites();

    var savedFavorites = this.buxlFavoritesModel.savedFavorites;
    var trashedFavorites  = this.buxlFavoritesModel.trashedFavorites;
    var favedBuxls = [];

    for (var i=0; i < savedFavorites.length; i++)
    {
        var buxl = this.buxlGameModel.getBuxl(savedFavorites[i]);
        if (buxl)
        {
            // Buxl is solved, so put the solution into solved
            buxl.solved = buxl.solutions;
            buxl.isFavorite = true;
            favedBuxls.push(buxl);
        }
    }
    
    return favedBuxls;
};
