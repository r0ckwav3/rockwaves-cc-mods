// for use in cookie clicker
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
}

var alertstr = "";
var best;
var bestreearntime = -1;
for (var i in Game.ObjectsById){
  var me = Game.ObjectsById[i];
  var reearntime = me.price / ((me.storedCps * Game.globalCpsMult)+calculateSynergyPer(me));
  alertstr += me.name + ": " + Math.log(reearntime)/Math.log(10) + "\n";
  if(bestreearntime == -1 || bestreearntime>reearntime){
    best = me;
    bestreearntime = reearntime;
  }
}
alertstr = "best: "+best.name+"\n" + alertstr;
alert(alertstr);


Game.registerMod("ReEarnCalc",new function(){
  this.lastBest = null;

  this.init = function(){
    Game.registerHook('draw',this.colorBestName);
  };
  this.save = function(){
    return '';
  };
  this.load = function(str){
    return;
  };
  this.colorBestName = function(){
    /* it breaks if calculateSynergyPer is elsewhere */
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

    var best;
    var bestreearntime = -1;
    for (var i in Game.ObjectsById){
      var me = Game.ObjectsById[i];
      var reearntime = me.price / ((me.storedCps * Game.globalCpsMult)+calculateSynergyPer(me));
      if(bestreearntime == -1 || bestreearntime>reearntime){
        best = me;
        bestreearntime = reearntime;
      }
    }
    if(this.lastBest != best){
      l("productName"+best.id).style.color = "#29d6ef";
      if(this.lastBest){
        l("productName"+this.lastBest.id).style.color = "";
      }
      this.lastBest = best;
    }
  };


  return this;
});


calculateSynergyPer = function(me){if (me.amount>0){var synergyBoost=0;if (me.name=='Grandma'){for (var i in Game.GrandmaSynergies){if (Game.Has(Game.GrandmaSynergies[i])){var other=Game.Upgrades[Game.GrandmaSynergies[i]].buildingTie;  var mult=me.amount*0.01*(1/(other.id-1));  var boost=(other.storedTotalCps*Game.globalCpsMult)-(other.storedTotalCps*Game.globalCpsMult)/(1+mult);  synergyBoost+=boost;} }}else if (me.name=='Portal' && Game.Has('Elder Pact')){var other=Game.Objects['Grandma'];var boost=(me.amount*0.05*other.amount)*Game.globalCpsMult;synergyBoost+=boost;}for (var i in me.synergies){var it=me.synergies[i];if (Game.Has(it.name)){var weight=0.05;var other=it.buildingTie1;if (me==it.buildingTie1) {weight=0.001;other=it.buildingTie2;}var boost=(other.storedTotalCps*Game.globalCpsMult)-(other.storedTotalCps*Game.globalCpsMult)/(1+me.amount*weight);synergyBoost+=boost;}}return synergyBoost/me.amount;  }  return 0;};var alertstr = "";var best;var bestreearntime = -1;for (var i in Game.ObjectsById){var me = Game.ObjectsById[i];var reearntime = me.price / ((me.storedCps * Game.globalCpsMult)+calculateSynergyPer(me));alertstr += me.name + ": " + Math.log(reearntime)/Math.log(10) + "\n";if(bestreearntime == -1 || bestreearntime>reearntime){best = me;bestreearntime = reearntime;}}alertstr = "best: "+best.name+"\n" + alertstr;alert(alertstr);


Game.registerMod("ReEarnCalc",new function(){this.lastBest = null;this.init = function(){Game.registerHook('draw',this.colorBestName);};this.save = function(){return '';};this.load = function(str){return;};this.colorBestName = function(){calculateSynergyPer = function(me){if (me.amount>0){var synergyBoost=0;if (me.name=='Grandma'){for (var i in Game.GrandmaSynergies){if (Game.Has(Game.GrandmaSynergies[i])){var other=Game.Upgrades[Game.GrandmaSynergies[i]].buildingTie;var mult=me.amount*0.01*(1/(other.id-1));var boost=(other.storedTotalCps*Game.globalCpsMult)-(other.storedTotalCps*Game.globalCpsMult)/(1+mult);synergyBoost+=boost;}}}else if (me.name=='Portal' && Game.Has('Elder Pact')){var other=Game.Objects['Grandma'];var boost=(me.amount*0.05*other.amount)*Game.globalCpsMult;synergyBoost+=boost;}for (var i in me.synergies){var it=me.synergies[i];if (Game.Has(it.name)){var weight=0.05;var other=it.buildingTie1;if (me==it.buildingTie1) {weight=0.001;other=it.buildingTie2;}var boost=(other.storedTotalCps*Game.globalCpsMult)-(other.storedTotalCps*Game.globalCpsMult)/(1+me.amount*weight);synergyBoost+=boost;}}return synergyBoost/me.amount;}return 0;};var best;var bestreearntime = -1;for (var i in Game.ObjectsById){var me = Game.ObjectsById[i];var reearntime = me.price / ((me.storedCps * Game.globalCpsMult)+calculateSynergyPer(me));if(bestreearntime == -1 || bestreearntime>reearntime){best = me;bestreearntime = reearntime;}}if(this.lastBest != best){l("productName"+best.id).style.color = "#29d6ef";if(this.lastBest){l("productName"+this.lastBest.id).style.color = "";}this.lastBest = best;}};return this;});
