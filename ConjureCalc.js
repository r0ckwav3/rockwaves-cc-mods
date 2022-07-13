
Game.registerMod("ConjureCalculator",new function(){
  this.init = function(){
    /* oh boy you get to see me try to use DOM again! */
    var conjureCalculatorText = document.createElement("div");
    conjureCalculatorText.id = "conjureCalculatorText";
    conjureCalculatorText.classList.add("titleFont");
    conjureCalculatorText.style.textAlign = "center";
    conjureCalculatorText.style.marginTop = "6px";
    conjureCalculatorText.style.marginBottom = "6px";
    l("grimoireContent").appendChild(conjureCalculatorText);

    Game.registerHook('draw',this.draw);
  };
  this.save = function(){
    return '';
  };
  this.load = function(str){
    return;
  };
  this.draw = function(){
    var bestcookies = Game.unbuffedCps * (12000);
    var str = "Optimal Conjure Cookies: "+Beautify(bestcookies);
    if(Game.cookies<bestcookies){
      var deficit = bestcookies - Game.cookies;
      var timeuntilgood = deficit/Game.cookiesPs;
      str += ' (' + Game.sayTime(timeuntilgood*Game.fps,-1) + ' left)';
    }else{
      var excess = Game.cookies-bestcookies;
      str += ' (' + Beautify(excess) + ' excess)';
    }

    l("conjureCalculatorText").innerText = str;
  };

  return this;
});


Game.registerMod("ConjureCalculator",new function(){this.init = function(){/* oh boy you get to see me try to use DOM again! */var conjureCalculatorText = document.createElement("div");conjureCalculatorText.id = "conjureCalculatorText";conjureCalculatorText.classList.add("titleFont");conjureCalculatorText.style.textAlign = "center";conjureCalculatorText.style.marginTop = "6px";conjureCalculatorText.style.marginBottom = "6px";l("grimoireContent").appendChild(conjureCalculatorText);Game.registerHook('draw',this.draw);};this.save = function(){return '';};this.load = function(str){return;};this.draw = function(){var bestcookies = Game.unbuffedCps * (12000);var str = "Optimal Conjure Cookies: "+Beautify(bestcookies);if(Game.cookies<bestcookies){var deficit = bestcookies - Game.cookies;var timeuntilgood = deficit/Game.cookiesPs;str += ' (' + Game.sayTime(timeuntilgood*Game.fps,-1) + ' left)';}else{var excess = Game.cookies-bestcookies;str += ' (' + Beautify(excess) + ' excess)';}l("conjureCalculatorText").innerText = str;};return this;});
