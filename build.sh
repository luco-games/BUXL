#!/bin/bash
#python3 vendor/generate_wordlist.py

# npm install uglify-es
cat js/Controllers/BuxlControllerPrototype.js js/Controllers/BuxlFooterController.js js/Controllers/BuxlIntroController.js js/Controllers/BuxlGameController.js js/Controllers/BuxlNavigationController.js js/Controllers/BuxlRoutingController.js js/Controllers/BuxlLegalController.js js/Controllers/BuxlListController.js js/Models/BuxlFavoritesModel.js js/Models/BuxlGameModel.js js/Models/BuxlListModel.js js/Views/BuxlViewPrototype.js js/Views/BuxlRoutingView.js js/Views/BuxlListView.js js/Views/BuxlFooterView.js js/Views/BuxlIntroView.js js/Views/BuxlLegalView.js js/Views/BuxlNavigationView.js js/Views/BuxlGameView.js js/app.js | node_modules/uglify-es/bin/uglifyjs --compress --mangle --output dist/buxlgames.min.js
