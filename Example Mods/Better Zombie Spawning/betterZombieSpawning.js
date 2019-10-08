// Better Zombie Spawning Mod

// Define Mod Function to get API
function betterZombieSpawning(api){
    
    // Funtion to get root variable
    function BZS(root){
        // Use api.patchMethodReplaceLogic to replace original zombie spawning function
        api.patchMethodReplaceLogic(root.waveMgr, "findSpawnPoint", function() {
            // Zombie Spawning Function (all code excepted marked is original)
            const basePos = this.root.logic.getLocalPlayerBase().getTile();
            let maxTries = 5;
            while (maxTries-- > 0) {
                // First, find a random tile
                const startTile = this.getRandomBorderTile();
                const tileToBase = startTile
                .direction(basePos)
                .normalize()
                ._ds(2);
                let currentTile = startTile;
                let maxSteps = 399;
                while (maxSteps-- > 0) {
                    let newTile = currentTile.add(tileToBase);
                    
                    // Changed to checkIsExploredByFaction since we can't rely on the smoke
                    if (this.root.logic.checkIsExploredByFaction(newTile.round(), this.root.playerFaction)) {
                        // We step back 5 tiles
                        var cTileHold = currentTile.sub(tileToBase._ms(5));
                        // Checks if new tile would be a valid tile, if not, don't step back 5 tiles
                        if (cTileHold.x >= 0 && cTileHold.y >= 0 && cTileHold.x < api.gameConfig.numTilesX && cTileHold.y < api.gameConfig.numTilesY){
                            return cTileHold.toWorldSpace();
                        }else {
                            return currentTile.toWorldSpace();
                        }
                    }
                    currentTile = newTile;
                }
            }

            console.warn(this, "Failed to find raymarched spawn point, using fallback");
            return this.findSpawnPointFallback();
        });
    }
    
    // Register the BZS function
    api.registerModImplementation(BZS);
}

// Register The Mod
window.registerMod(betterZombieSpawning);