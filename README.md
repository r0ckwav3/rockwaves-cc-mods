# rockwaves-cc-mods

A bunch of random mods I've made for the browser version of cookie clicker. All of these have been tested on version `2.052`. I generally try to keep my mods looking "vanilla," and use a lot of assets from the base game.

## Installation

The best way to use these mods are to create a bookmark in your browser with one of the following:
```javascript
javascript: Game.LoadMod('https://r0ckwav3.github.io/rockwaves-cc-mods/ReEarnCalc.js');
javascript: Game.LoadMod('https://r0ckwav3.github.io/rockwaves-cc-mods/ReEarnCalc2.js');
javascript: Game.LoadMod('https://r0ckwav3.github.io/rockwaves-cc-mods/ConjureCalc.js');
javascript: Game.LoadMod('https://r0ckwav3.github.io/rockwaves-cc-mods/DragonTimer.js');
javascript: Game.LoadMod('https://r0ckwav3.github.io/rockwaves-cc-mods/GardenRevealed.js');
```
If you want to run all of them, use this bookmark instead: (not including ReEarnCalc since ReEarnCalc2 does strictly more)
```javascript
javascript: Game.LoadMod('https://r0ckwav3.github.io/rockwaves-cc-mods/ReEarnCalc2.js'); Game.LoadMod('https://r0ckwav3.github.io/rockwaves-cc-mods/ConjureCalc.js'); Game.LoadMod('https://r0ckwav3.github.io/rockwaves-cc-mods/DragonTimer.js'); Game.LoadMod('https://r0ckwav3.github.io/rockwaves-cc-mods/GardenRevealed.js');
```

## The Mods
+ ReEarnCalc (and ReEarnCalc2): Both of these mods will highlight the most "efficient" (highest cps/cost) building in blue. This also takes into account various boosts like synergies and grandma upgrades which may indirectly create cps. ReEarnCalc2 adds a toggle which lists cps/cost for all buildings.
+ ConjureCalc: In the grimoire minigame, displays how many cookies you need to get the most out of the spell "Conjure Baked Goods," as well as how many excess cookies you have or how long until you have enough.
+ DragonTimer: If you have the upgrade "Pet the dragon", displays the currently available dragon treasure and also when each treasure will next be available.
+ GardenRevealed: Shows all seeds that you haven't unlocked in a greyed-out section below the rest of the seeds. Eventually this section will also display how to breed each of them, but that's not implemented yet.
