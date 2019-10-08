/*
	Name : No Fog Mod
	Author : TDStuart
	Description : Removes fog but keeps signal repeater's function.
	Website : https://github.com/TristonStuart/No-Fog-Mod-Yorg3
	Download : https://github.com/TristonStuart/No-Fog-Mod-Yorg3/blob/master/no_fog_mod.js
	Version : 1.0.0
*/

// Make a mod function that will be passed the api
function NoFogMod(api) {
		console.log(';) No Fog Mod By TDStuart Loaded!');
		
		// Make a mod implementation function. This will be passed the root function.
    function ModImplementation(root) {
			
			// Replace the Fog Draw Function with an empty function. (Removes visual fog smoke)
			root.systemMgr.systems.fog.draw = () => {};
			
			// Define fog and originalUpdate which reference Game Fog Systems
			const fog = root.systemMgr.systems.fog;
			const originalUpdate = fog.recomputeFogCache;
			
			// Replace recomputeFogCache function with a new function.
			root.systemMgr.systems.fog.recomputeFogCache = function() {
				// Use Apply to register the new function properly. (Without doing this the game will crash)
				originalUpdate.apply(fog, arguments);
				
				// Loop through Tile Array
				for (var i in root.systemMgr.systems.fog.tileVisionState){
					// Loop through 2d Tile Array
					for (var j in root.systemMgr.systems.fog.tileVisionState[i]){
						// Set all tiles to true
						root.systemMgr.systems.fog.tileVisionState[i][j] = true
					}
				}
			}
			
			// postLoadHook is executed after the game starts. This is needed so that the tiles are visible at the game start.
			root.signals.postLoadHook.add(() => {
				// Loop through Tile Array
				for (var i in root.systemMgr.systems.fog.tileVisionState){
					// Loop through 2d Tile Array
					for (var j in root.systemMgr.systems.fog.tileVisionState[i]){
						// Set all tiles to true
						root.systemMgr.systems.fog.tileVisionState[i][j] = true
					}
				}
			});
    }
		
		// Register the mod implementation.
    api.registerModImplementation(ModImplementation);
}

// Register the mod with the mod register function.
window.registerMod(NoFogMod);