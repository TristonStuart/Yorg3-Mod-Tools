// More Zoom Mod

// Define Mod Function to get API
function moreZoomMod(api){
    
    // Define mod implementation function to get root
    function moreZoom(root){
        // Set minimum zoom
        // Note : the api.gameConfig minimumZoom is not currently used. Although it might get added, which would make this code smaller.
        root.app.platformWrapper.getMinimumZoom = function(){return 0.2};
    }
    
    // Register mod implementation
    api.registerModImplementation(moreZoom);
}

// Register The Mod
window.registerMod(moreZoomMod);