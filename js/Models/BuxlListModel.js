let BuxlListModel = function BuxlListModel (elements)
{
    this.buxlGameModel = elements.buxlGameModel;
    this.buxlFavoritesModel = elements.buxlFavoritesModel;
};

BuxlListModel.prototype.getFavoritesList = function getFavoritesList ()
{
    if (! this.buxlFavoritesModel.savedFavorites)
        this.buxlFavoritesModel.loadFavorites();

    let savedFavorites = this.buxlFavoritesModel.savedFavorites;
    let trashedFavorites  = this.buxlFavoritesModel.trashedFavorites;
    let favedBuxls = [];

    for (let i=0; i < savedFavorites.length; i++)
    {
        let buxl = this.buxlGameModel.getBuxl(savedFavorites[i]);
        if (buxl)
        {
            // Buxl is solved, so put the solution into solved
            buxl.solved = buxl.solutions;
            buxl.isFavorite = true;
            favedBuxls.push(buxl);
        }
    }

    if (favedBuxls.length === 0)
    {
        favedBuxls.push({
            front:["K","E","I","N"],
            back:["B","U","X","L"]
        });
         
    } 
    
    return favedBuxls;
};
