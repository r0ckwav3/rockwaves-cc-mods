// for use in cookie clicker
// main change:
//   adds a fake upgrade into the switches section which displays the re-earn time in order
// known bugs:
//   messes with ascension

Game.registerMod("ReEarnCalc2", new function(){
  this.lastBest = null;
  this.reearnlist = null;

  calculateSynergyPer = function(me){
    if (me.amount>0)
    {
      var synergyBoost=0;

      if (me.name=='Grandma')
      {
        for (var i in Game.GrandmaSynergies)
        {
          if (Game.Has(Game.GrandmaSynergies[i]))
          {
            var other=Game.Upgrades[Game.GrandmaSynergies[i]].buildingTie;
            var mult=me.amount*0.01*(1/(other.id-1));
            var boost=(other.storedTotalCps*Game.globalCpsMult)-(other.storedTotalCps*Game.globalCpsMult)/(1+mult);
            synergyBoost+=boost;
          }
        }
      }
      else if (me.name=='Portal' && Game.Has('Elder Pact'))
      {
        var other=Game.Objects['Grandma'];
        var boost=(me.amount*0.05*other.amount)*Game.globalCpsMult;
        synergyBoost+=boost;
      }

      for (var i in me.synergies)
      {
        var it=me.synergies[i];
        if (Game.Has(it.name))
        {
          var weight=0.05;
          var other=it.buildingTie1;
          if (me==it.buildingTie1) {weight=0.001;other=it.buildingTie2;}
          var boost=(other.storedTotalCps*Game.globalCpsMult)-(other.storedTotalCps*Game.globalCpsMult)/(1+me.amount*weight);
          synergyBoost+=boost;
        }
      }
      return synergyBoost/me.amount;
    }
    return 0;
  };

  this.updateReearnlist = function(){
    this.reearnlist = [];

    for (var i in Game.ObjectsById){
      var obj = Game.ObjectsById[i];
      var reearntime = obj.price / ((obj.storedCps * Game.globalCpsMult)+calculateSynergyPer(obj));
      this.reearnlist.push([reearntime, obj]);
    }

    this.reearnlist.sort(function(a,b){return a[0]-b[0];});
    return this.reearnlist;
  };

  this.createDummyUpgrade = function(){
    me = this;

    order = 50000;

		new Game.Upgrade('Re-earn Calculator',loc("Displays how many seconds each building takes to pay for itself."),0,[11,10]);
		Game.last.descFunc = function(){
      /* ddesc is better than baseDesc but localization runs before mods so I can't use that*/
      var tempdesc = this.baseDesc + '<div class="line"></div>';
      if(me.reearnlist){
        for(let p in me.reearnlist){
            if(me.reearnlist[p][1].amount>0){
                tempdesc += me.reearnlist[p][1].name + ': ' + Game.sayTime(me.reearnlist[p][0]*Game.fps,-1) + '<br>';
            }
        }
      }
			return tempdesc;
		};
    Game.last.toggleInto='Regular Calculator';
		Game.last.pool='toggle';
    Game.last.lasting = 1;
    /* Should have been handled in localization, but timing freaks out again*/
    Game.last.ddesc=BeautifyInText(Game.last.baseDesc);
    Game.last.unlock();

    new Game.Upgrade('Regular Calculator',loc("Adds numbers."),0,[11,10]);
		Game.last.descFunc = function(){
      /* ddesc is better than baseDesc but localization runs before mods so I can't use that*/
      let a = Math.floor(Math.random() * 100);
      let b = Math.floor(Math.random() * 100);
			return this.baseDesc + '<div class="line"></div>' + a + "+" + b + "=" + (a+b);
		};
    Game.last.toggleInto='Re-earn Calculator';
		Game.last.pool='toggle';
    Game.last.lasting = 1;
    /* Should have been handled in localization, but timing freaks out again*/
    Game.last.ddesc=BeautifyInText(Game.last.baseDesc);

    /* TODO: hide undiscovered buildings */
  };

  this.colorBestName = function(){
    if(this.reearnlist){
      var best = this.reearnlist[0][1];

      if(this.lastBest != best){
        l("productName"+best.id).style.color = "#29d6ef";
        if(this.lastBest){
          l("productName"+this.lastBest.id).style.color = "";
        }
        this.lastBest = best;
      }
    }
  };



  this.init = function(){

    /*Theres a bunch of jank here because I can't figure out how environments work in JS*/
    me = this;
    Game.registerHook('draw', function(){me.colorBestName()});
    Game.registerHook('logic', function(){me.updateReearnlist()});

    /*This should be in a "create" hook, but the timing doesnt work correctly.*/
    this.createDummyUpgrade();
  };
  this.save = function(){
    return '';
  };
  this.load = function(str){
    return;
  };

  return this;
});


// Game.registerMod("ReEarnCalc2", new function(){ this.lastBest = null; this.reearnlist = null; calculateSynergyPer = function(me){ if (me.amount>0) { var synergyBoost=0; if (me.name=='Grandma') { for (var i in Game.GrandmaSynergies) { if (Game.Has(Game.GrandmaSynergies[i])) { var other=Game.Upgrades[Game.GrandmaSynergies[i]].buildingTie; var mult=me.amount*0.01*(1/(other.id-1)); var boost=(other.storedTotalCps*Game.globalCpsMult)-(other.storedTotalCps*Game.globalCpsMult)/(1+mult); synergyBoost+=boost; } } } else if (me.name=='Portal' && Game.Has('Elder Pact')) { var other=Game.Objects['Grandma']; var boost=(me.amount*0.05*other.amount)*Game.globalCpsMult; synergyBoost+=boost; } for (var i in me.synergies) { var it=me.synergies[i]; if (Game.Has(it.name)) { var weight=0.05; var other=it.buildingTie1; if (me==it.buildingTie1) {weight=0.001;other=it.buildingTie2;} var boost=(other.storedTotalCps*Game.globalCpsMult)-(other.storedTotalCps*Game.globalCpsMult)/(1+me.amount*weight); synergyBoost+=boost; } } return synergyBoost/me.amount; } return 0; }; this.updateReearnlist = function(){ this.reearnlist = []; for (var i in Game.ObjectsById){ var obj = Game.ObjectsById[i]; var reearntime = obj.price / ((obj.storedCps * Game.globalCpsMult)+calculateSynergyPer(obj)); this.reearnlist.push([reearntime, obj]); } this.reearnlist.sort(function(a,b){return a[0]-b[0];}); return this.reearnlist; }; this.createDummyUpgrade = function(){ me = this; order = 50000; new Game.Upgrade('Re-earn Calculator',loc("Displays how many seconds each building takes to pay for itself."),0,[11,10]); Game.last.descFunc = function(){ /* ddesc is better than baseDesc but localization runs before mods so I can't use that*/ var tempdesc = this.baseDesc + '<div class="line"></div>'; if(me.reearnlist){ for(let p in me.reearnlist){ tempdesc += me.reearnlist[p][1].name + ': ' + Game.sayTime(me.reearnlist[p][0]*Game.fps,-1) + '<br>'; } } return tempdesc; }; Game.last.toggleInto='Regular Calculator'; Game.last.pool='toggle'; Game.last.lasting = 1; /* Should have been handled in localization, but timing freaks out again*/ Game.last.ddesc=BeautifyInText(Game.last.baseDesc); Game.last.unlock(); new Game.Upgrade('Regular Calculator',loc("Adds numbers."),0,[11,10]); Game.last.descFunc = function(){ /* ddesc is better than baseDesc but localization runs before mods so I can't use that*/ let a = Math.floor(Math.random() * 100); let b = Math.floor(Math.random() * 100); return this.baseDesc + '<div class="line"></div>' + a + "+" + b + "=" + (a+b); }; Game.last.toggleInto='Re-earn Calculator'; Game.last.pool='toggle'; Game.last.lasting = 1; /* Should have been handled in localization, but timing freaks out again*/ Game.last.ddesc=BeautifyInText(Game.last.baseDesc); /* TODO: hide undiscovered buildings */ }; this.colorBestName = function(){ if(this.reearnlist){ var best = this.reearnlist[0][1]; if(this.lastBest != best){ l("productName"+best.id).style.color = "#29d6ef"; if(this.lastBest){ l("productName"+this.lastBest.id).style.color = ""; } this.lastBest = best; } } }; this.init = function(){ /*Theres a bunch of jank here because I can't figure out how environments work in JS*/ me = this; Game.registerHook('draw', function(){me.colorBestName()}); Game.registerHook('logic', function(){me.updateReearnlist()}); /*This should be in a "create" hook, but the timing doesnt work correctly.*/ this.createDummyUpgrade(); }; this.save = function(){ return ''; }; this.load = function(str){ return; }; return this; });
