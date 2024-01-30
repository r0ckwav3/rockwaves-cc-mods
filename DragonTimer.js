// Relevant code:

// Game.ToggleSpecialMenu=function(on)
// {
//   if (on)
//   {
//     var pic='';
//     var frame=0;
//     if (Game.specialTab=='santa') {pic='santa.png';frame=Game.santaLevel;}
//     else if (Game.specialTab=='dragon') {pic='dragon.png?v='+Game.version;frame=Game.dragonLevels[Game.dragonLevel].pic;}
//     else {pic='dragon.png?v='+Game.version;frame=4;}
//
//     var str='<div id="specialPic" '+Game.clickStr+'="Game.ClickSpecialPic();" style="'+((Game.specialTab=='dragon' && Game.dragonLevel>=4 && Game.Has('Pet the dragon'))?'cursor:pointer;':'')+'position:absolute;left:-16px;top:-64px;width:96px;height:96px;background:url(img/'+pic+');background-position:'+(-frame*96)+'px 0px;filter:drop-shadow(0px 3px 2px #000);-webkit-filter:drop-shadow(0px 3px 2px #000);"></div>';
//     str+='<div class="close" onclick="PlaySound(\'snd/press.mp3\');Game.ToggleSpecialMenu(0);">x</div>';
//
//     if (Game.specialTab=='santa')
//     {
//       var moni=Math.pow(Game.santaLevel+1,Game.santaLevel+1);
//
//       str+='<h3 style="pointer-events:none;">'+Game.santaLevels[Game.santaLevel]+'</h3>';
//       if (Game.santaLevel<14)
//       {
//         str+='<div class="line"></div>'+
//         '<div class="optionBox" style="margin-bottom:0px;"><a class="option framed large title" '+Game.clickStr+'="Game.UpgradeSanta();">'+
//           '<div style="display:table-cell;vertical-align:middle;">'+loc("Evolve")+'</div>'+
//           '<div style="display:table-cell;vertical-align:middle;padding:4px 12px;">|</div>'+
//           '<div style="display:table-cell;vertical-align:middle;font-size:65%;">'+loc("sacrifice %1",'<div'+(Game.cookies>moni?'':' style="color:#777;"')+'>'+loc("%1 cookie",LBeautify(Math.pow(Game.santaLevel+1,Game.santaLevel+1)))+'</div>')+'</div>'+
//         '</a></div>';
//       }
//     }
//     else if (Game.specialTab=='dragon')
//     {
//       var level=Game.dragonLevels[Game.dragonLevel];
//
//       str+='<h3 style="pointer-events:none;">'+level.name+'</h3>';
//
//       if (Game.dragonLevel>=5)
//       {
//         var icon=Game.dragonAuras[Game.dragonAura].pic;
//         str+='<div class="crate enabled" style="opacity:1;position:absolute;right:18px;top:-58px;'+writeIcon(icon)+'" '+Game.clickStr+'="PlaySound(\'snd/tick.mp3\');Game.SelectDragonAura(0);" '+Game.getTooltip(
//           '<div style="min-width:200px;text-align:center;" id="tooltipDragonAuraSelect"><h4>'+Game.dragonAuras[Game.dragonAura].dname+'</h4>'+
//           '<div class="line"></div>'+
//           Game.dragonAuras[Game.dragonAura].desc+
//           '</div>'
//         ,'top')+
//         '></div>';
//       }
//       if (Game.dragonLevel>=26)//2nd aura slot; increased with last building (cortex baker)
//       {
//         var icon=Game.dragonAuras[Game.dragonAura2].pic;
//         str+='<div class="crate enabled" style="opacity:1;position:absolute;right:80px;top:-58px;'+writeIcon(icon)+'" '+Game.clickStr+'="PlaySound(\'snd/tick.mp3\');Game.SelectDragonAura(1);" '+Game.getTooltip(
//           '<div style="min-width:200px;text-align:center;" id="tooltipDragonAuraSelect2"><h4>'+Game.dragonAuras[Game.dragonAura2].dname+'</h4>'+
//           '<div class="line"></div>'+
//           Game.dragonAuras[Game.dragonAura2].desc+
//           '</div>'
//         ,'top')+
//         '></div>';
//       }
//
//       if (Game.dragonLevel<Game.dragonLevels.length-1)
//       {
//         str+='<div class="line"></div>'+
//         '<div class="optionBox" style="margin-bottom:0px;"><a class="option framed large title" '+Game.clickStr+'="Game.UpgradeDragon();">'+
//           '<div style="display:table-cell;vertical-align:middle;">'+level.action+'</div>'+
//           '<div style="display:table-cell;vertical-align:middle;padding:4px 12px;">|</div>'+
//           '<div style="display:table-cell;vertical-align:middle;font-size:65%;">'+loc("sacrifice %1",'<div'+(level.cost()?'':' style="color:#777;"')+'>'+level.costStr()+'</div>')+'</div>'+
//         '</a></div>';
//       }
//       else
//       {
//         str+='<div class="line"></div>'+
//         '<div style="text-align:center;margin-bottom:4px;">'+level.action+'</div>';
//       }
//     }
//
//     l('specialPopup').innerHTML=str;
//
//     l('specialPopup').className='framed prompt onScreen';
//   }
//   else
//   {
//     if (Game.specialTab!='')
//     {
//       Game.specialTab='';
//       l('specialPopup').className='framed prompt offScreen';
//       setTimeout(function(){if (Game.specialTab=='') {/*l('specialPopup').style.display='none';*/l('specialPopup').innerHTML='';}},1000*0.2);
//     }
//   }
// }


// var me=Game.UpgradesInStore[i];
// var str=Game.crate(me,'store','Game.UpgradesById['+me.id+'].click(event);','upgrade'+i);

Game.registerMod("DragonTimer", new function(){
  this.init = function(){
    OldToggleSpecialMenu = Game.ToggleSpecialMenu;
    Game.ToggleSpecialMenu = function(on){
      OldToggleSpecialMenu(on);
      if (on){
        if (Game.specialTab=='dragon'){
          if(Game.Upgrades['Pet the dragon'].bought){
            var str = l('specialPopup').innerHTML;

            // calculate the current dragon treasure
            Math.seedrandom(Game.seed+'/dragonTime');
            var drops=['Dragon scale','Dragon claw','Dragon fang','Dragon teddy bear'];
            drops=shuffle(drops);
            var drop=drops[Math.floor((new Date().getMinutes()/60)*drops.length)];
            Math.seedrandom();

            // make the tooltip
            var tooltipstr = '<div style="min-width:200px;text-align:center;" id="tooltipDragonTimer">'+'<h4>'+Game.Upgrades[drop].dname+'</h4><div class="line"></div>';
            for (var i in drops){
              if (Game.Has(drops[i]) || Game.HasUnlocked(drops[i])){
                tooltipstr += drops[i] + " : unlocked";
              }else{
                // All of this arithmetic is done in seconds
                var timeuntil = ((i*(3600/drops.length) - Date.now()/1000)%3600) + 3600;
                if(timeuntil > 2700){
                  tooltipstr += drops[i] + " : available";
                }else{
                  tooltipstr += drops[i] + " : " + Game.sayTime(timeuntil*Game.fps,-1);
                }
              }
              tooltipstr += "<br></br>";
            }
            tooltipstr+="</div>";


            var icon = Game.Upgrades[drop].icon;
            str+='<div class="crate enabled" style="opacity:1;position:absolute;right:142px;top:-58px;'
                +writeIcon(icon)+'"'+Game.getTooltip(tooltipstr,'top')+'></div>';

              //+Game.clickStr+'="PlaySound(\'snd/tick.mp3\');Game.SelectDragonAura(1);" '+Game.getTooltip(
              // '<div style="min-width:200px;text-align:center;" id="tooltipDragonAuraSelect2"><h4>'+Game.dragonAuras[Game.dragonAura2].dname+'</h4>'+
              // '<div class="line"></div>'+Game.dragonAuras[Game.dragonAura2].desc+'</div>','top')+'></div>';

            l('specialPopup').innerHTML = str;
          }
        }
      }
    }
  }
  this.save = function(){
    return '';
  };
  this.load = function(_str){
    return;
  };
  return this;
});
