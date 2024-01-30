
Game.registerMod("GardenRevealed", new function(){
  this.init = function(){
    // helpers
    DOM_from_HTML = function(html_string){
      var temp = document.createElement("div");
      temp.innerHTML = html_string;
      return temp.firstElementChild;
    }

    // grab data from the game
    let M = Game.Objects['Farm'].minigame;

    // create the tooltip
    M.seedPreviewTooltip = function(id){
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
  				M.getPlantDesc(me)+
  			'</div>';
  			return str;
  		};
    };

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
			  '<div id="gardenSeedPreview-'+me.id+'" class="gardenSeed preview locked" '+Game.getDynamicTooltip('Game.ObjectsById['+M.parent.id+'].minigame.seedPreviewTooltip('+me.id+')','this')+'></div>'
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
      ".gardenSeed.preview:hover .gardenSeedIcon,.gardenSeed.preview:active .gardenSeedIcon{ animation:none; } "
    // make space for the added seeds
    style_node.innerHTML +=
      "#gardenContent{height: 400px;} "
  };
  this.save = function(){
    return '';
  };
  this.load = function(_str){
    return;
  };
  return this;
});
