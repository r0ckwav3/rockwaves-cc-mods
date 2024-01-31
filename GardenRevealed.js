
Game.registerMod("GardenRevealed", new function(){
  // grab data from the game
  let G = {}
  let M = Game.Objects['Farm'].minigame;

  G.init = function(){
    // helpers
    DOM_from_HTML = function(html_string){
      var temp = document.createElement("div");
      temp.innerHTML = html_string;
      return temp.firstElementChild;
    }

    // create our new section
    let prevline = document.createElement("div");
    prevline.classList.add("line");
    let gardenSeedsPreview = document.createElement("div");
    gardenSeedsPreview.id = "gardenSeedsPreview";
		for (var i in M.plants)
		{
			var me=M.plants[i];
			var icon=[0,me.icon];
			var my_node = DOM_from_HTML(
			  '<div id="gardenSeedPreview-'+me.id+'" class="gardenSeed preview locked" '+Game.getDynamicTooltip('Game.mods[\'GardenRevealed\'].seedPreviewTooltip('+me.id+')','this')+'></div>'
			);
			if(!me.unlocked){
  			my_node.classList.remove("locked");
  		}
			var icon_node = DOM_from_HTML(
			  '<div id="gardenSeedIcon-'+me.id+'" class="gardenSeedIcon shadowFilter" style="background-position:'+(-icon[0]*48)+'px '+(-icon[1]*48)+'px;"></div>'
			);
			my_node.appendChild(icon_node);
			gardenSeedsPreview.appendChild(my_node);
		}

    l("gardenPanel").appendChild(prevline);
    l("gardenPanel").appendChild(gardenSeedsPreview);

    // Modify the styles
    let style_node = l("rowSpecial2").childNodes[0];
    // how should the preview seeds look and act
    style_node.innerHTML +=
      ".gardenSeed.preview{filter:grayscale(100%) contrast(0.8);} "+
      ".gardenSeed.preview:hover .gardenSeedIcon,.gardenSeed.preview:active .gardenSeedIcon{ animation:none; } ";
    // make space for the added seeds
    style_node.innerHTML +=
      "#gardenContent{height: 400px;} ";

    // update the lock and unlock functions
    oldunlock = M.unlockSeed;
    oldlock = M.lockSeed;
    M.unlockSeed = function(me){
      let previewl = l("gardenSeedPreview-"+me.id);
      if(previewl){previewl.classList.add("locked");}
      oldunlock(me);
    }
    M.lockSeed = function(me){
      let previewl = l("gardenSeedPreview-"+me.id);
      if(previewl){previewl.classList.remove("locked");}
      oldlock(me);
    }
  };
  G.seedPreviewTooltip = function(id){
    // TODO: potentially replace the getPlantDesc with a list of ways to grow it.
    // However, the mutation table is currently hardcoded, so I would have to hardcode this as well
		return function(){
			var me=M.plantsById[id];
			var str =
		  '<div style="padding:8px 4px;min-width:400px;" id="tooltipGardenSeed">'+
				'<div class="icon" style="background:url('+Game.resPath+'img/gardenPlants.png?v='+Game.version+');float:left;margin-left:-24px;margin-top:-4px;background-position:'+(-0*48)+'px '+(-me.icon*48)+'px;"></div>'+
				'<div class="icon" style="background:url('+Game.resPath+'img/gardenPlants.png?v='+Game.version+');float:left;margin-left:-24px;margin-top:-28px;background-position:'+(-4*48)+'px '+(-me.icon*48)+'px;"></div>'+
				'<div style="background:url('+Game.resPath+'img/turnInto.png);width:20px;height:22px;position:absolute;left:28px;top:24px;z-index:1000;"></div>'+
				(me.plantable?('<div style="float:right;text-align:right;width:100px;"><small>'+loc("Planting cost:")+'</small><br><span class="price'+(M.canPlant(me)?'':' disabled')+'">'+Beautify(Math.round(shortenNumber(M.getCost(me))))+'</span><br><small>'+loc("%1 of CpS,<br>minimum %2",[Game.sayTime(me.cost*60*30,-1),loc("%1 cookie",LBeautify(me.costM))])+'</small></div>'):'')+
				'<div style="width:300px;"><div class="name">'+cap(loc("%1 seed",me.name))+'</div><div><small><span class="red"> This seed is not unlocked yet. </span></small></div></div>'+
				'<div class="line"></div>'+
				G.getMutationDescription(me)+
			'</div>';
			return str;
		};
  };
  G.getMutationDescription = function(me){
    let mymutations = G.getMutationTable().filter((mut) => mut.output == me.key);
    out = '<div class="description">';
    out += '<div style="margin:6px 0px;"><b>Mutates From:</b></div>';
    out += mymutations.map((mut) => {
      return "&bull " + M.plants[mut.inputs[0].name].name;
    }).reduce((a,b,_i,_a) => a+b, "");
    out += '</div>';
    return out
  };
  G.getMutationTable = function(){
    // NOTE: I am not including any breeding combos that require the seed itself
    // partially because that's not useful, and partially because those are the most complicated ones
    return [
      {inputs: [{name: 'bakerWheat', count: 2}], output: 'bakerWheat', chance:0.2},
      {inputs: [{name: 'bakerWheat', count: 2}], output: 'thumbcorn', chance:0.05},
      {inputs: [{name: 'bakerWheat', count: 2}], output: 'bakeberry', chance:0.001},
      {inputs: [{name: 'thumbcorn', count:2}], output: 'bakerWheat', chance: 0.05},
      {inputs: [{name: 'cronerice', count:2}], output: 'thumbcorn', chance: 0.02},
      {inputs: [{name: 'whiskerbloom', count:2}], output: 'nursetulip', chance: 0.05},
      {inputs: [{name: 'queenbeet', count:2}], output: 'duketater', chance: 0.001},
      {inputs: [{name: 'crumbspore', count:2}], output: 'doughshroom', chance: 0.005},
      {inputs: [{name: 'doughshroom', count:2}], output: 'crumbspore', chance: 0.005},

      {inputs: [{name: 'bakerWheat', count: 1}, {name: 'thumbcorn', count:1}], output: 'cronerice', chance: 0.01},
      {inputs: [{name: 'cronerice', count: 1}, {name: 'thumbcorn', count:1}], output: 'gildmillet', chance: 0.03},
      {inputs: [{name: 'bakerWheat', count: 1}, {name: 'gildmillet', count:1}], output: 'clover', chance: 0.03},
      {inputs: [{name: 'bakerWheat', count: 1}, {name: 'gildmillet', count:1}], output: 'goldenClover', chance: 0.0007},
      {inputs: [{name: 'clover', count: 1}, {name: 'gildmillet', count:1}], output: 'shimmerlily', chance: 0.02},
      {inputs: [{name: 'shimmerlily', count: 1}, {name: 'cronerice', count:1}], output: 'elderwort', chance: 0.01},
      {inputs: [{name: 'wrinklegill', count: 1}, {name: 'cronerice', count:1}], output: 'elderwort', chance: 0.002},
      {inputs: [{name: 'bakerWheat', count: 1}, {name: 'brownMold', count:1}], output: 'chocoroot', chance: 0.1},
      {inputs: [{name: 'chocoroot', count: 1}, {name: 'whiteMildew', count:1}], output: 'whiteChocoroot', chance: 0.1},
      {inputs: [{name: 'shimmerlily', count: 1}, {name: 'whiteChocoroot', count:1}], output: 'whiskerbloom', chance: 0.01},
      {inputs: [{name: 'shimmerlily', count: 1}, {name: 'whiskerbloom', count:1}], output: 'chimerose', chance: 0.05},
      {inputs: [{name: 'chocoroot', count: 1}, {name: 'keenmoss', count:1}], output: 'drowsyfern', chance: 0.005},
      {inputs: [{name: 'cronerice', count: 1}, {name: 'keenmoss', count:1}], output: 'wardlichen', chance: 0.005},
      {inputs: [{name: 'cronerice', count: 1}, {name: 'whiteMildew', count:1}], output: 'wardlichen', chance: 0.005},
      {inputs: [{name: 'greenRot', count: 1}, {name: 'brownMold', count:1}], output: 'keenmoss', chance: 0.1},
      {inputs: [{name: 'chocoroot', count: 1}, {name: 'bakeberry', count:1}], output: 'queenbeet', chance: 0.01},
      {inputs: [{name: 'crumbspore', count: 1}, {name: 'thumbcorn', count:1}], output: 'glovemorel', chance: 0.02},
      {inputs: [{name: 'crumbspore', count: 1}, {name: 'shimmerlily', count:1}], output: 'cheapcap', chance: 0.04},
      {inputs: [{name: 'doughshroom', count: 1}, {name: 'greenRot', count:1}], output: 'foolBolete', chance: 0.04},
      {inputs: [{name: 'crumbspore', count: 1}, {name: 'brownMold', count:1}], output: 'wrinklegill', chance: 0.06},
      {inputs: [{name: 'whiteMildew', count: 1}, {name: 'clover', count:1}], output: 'greenRot', chance: 0.05},
      {inputs: [{name: 'wrinklegill', count: 1}, {name: 'elderwort', count:1}], output: 'shriekbulb', chance: 0.001},
      {inputs: [{name: 'bakerWheat', count: 1}, {name: 'whiteChocoroot', count:1}], output: 'tidygrass', chance: 0.002},
      {inputs: [{name: 'elderwort', count: 1}, {name: 'crumbspore', count:1}], output: 'ichorpuff', chance: 0.002},

      {inputs: [{name: 'queenbeet', count: 8}], output: 'queenbeetLump', chance: 0.001},
      {inputs: [{name: 'elderwort', count: 5}], output: 'shriekbulb', chance: 0.001},
      {inputs: [{name: 'duketater', count: 3}], output: 'shriekbulb', chance: 0.005},
      {inputs: [{name: 'doughshroom', count: 4}], output: 'shriekbulb', chance: 0.002},
      {inputs: [{name: 'queenbeet', count: 5}], output: 'shriekbulb', chance: 0.001},

      {inputs: [{name: 'tidygrass', count: 3}, {name: 'elderwort', count: 3}], output: 'everdaisy', chance: 0.002},
    ];
  };
  G.save = function(){
    return '';
  };
  G.load = function(_str){
    return;
  };
  return G;
});
