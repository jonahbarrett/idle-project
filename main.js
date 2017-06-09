var gold = 10;
var wood = 0;
var stone = 0;
var iron = 0;
var lumberjacks = 0;
var woodRate = lumberjacks;
var nextLumberjackCost = Math.floor(10 * Math.pow(1.2,lumberjacks));
var nextMerchantCost = Math.floor(150 * Math.pow(1.3,merchants));
var world = 1;
var sellAmount = 1;
var thirdWood = Math.round(wood/3);
var showTut = 0;
var merchants = 0;
var firstSell = 0;
var merchRate = 0;
var firstMerchant = 0;

function sendVal(){
	document.getElementById("gold").innerHTML = abbrNum(gold,2 );
	document.getElementById("wood").innerHTML = abbrNum(wood,2);
	document.getElementById("stone").innerHTML = abbrNum(stone,2);
	document.getElementById("iron").innerHTML = abbrNum(iron,2);
	document.getElementById("lumberjacks").innerHTML = lumberjacks;
	document.getElementById("merchants").innerHTML = merchants;
	document.getElementById("merchants2").innerHTML = merchants;
	nextMerchantCost = Math.floor(150 * Math.pow(1.3,merchants));
	document.getElementById('merchantCost').innerHTML = abbrNum(nextMerchantCost,2);
  document.getElementById('lumberjackCost').innerHTML = abbrNum(Math.floor(10 * Math.pow(1.2,lumberjacks)),2);
	woodRate = lumberjacks;
  document.getElementById('woodRate').innerHTML = woodRate;
	document.getElementById('max').innerHTML = wood;
	document.getElementById('wAmount').innerHTML = wood;
	thirdWood = Math.floor(wood/3);
	maxWoodGold = Math.floor(wood/2);
	document.getElementById('maxWoodGold').innerHTML = maxWoodGold;
	document.getElementById('thirdWood').innerHTML = thirdWood;

}

function isEven(n) {
  return n == parseFloat(n)? !(n%2) : void 0;
}

function mineClick (number){
	wood = wood + number;
	sendVal();
	};

function hireLumberjack(){
	var lumberjackCost = Math.floor(10 * Math.pow(1.2,lumberjacks));
	if(gold >= lumberjackCost){
		lumberjacks = lumberjacks + 1;
		gold = gold - lumberjackCost;
		document.getElementById('lumberjacks').innerHTML = abbrNum(lumberjacks, 2);
		document.getElementById('gold').innerHTML = abbrNum(gold, 2);
	};
	nextLumberjackCost = Math.floor(10 * Math.pow(1.2,lumberjacks));
  document.getElementById('lumberjackCost').innerHTML = abbrNum(nextLumberjackCost,2);
};

function hireMerchant() {
	var merchantCost = Math.floor(150 * Math.pow(1.3,merchants));
	if(gold >= merchantCost){
		merchants = merchants + 1;
		gold = gold - merchantCost;
		document.getElementById('merchants').innerHTML = abbrNum(merchants, 2);
		document.getElementById('gold').innerHTML = abbrNum(gold, 2);
	};
	nextMerchantCost = Math.floor(150 * Math.pow(1.3,merchants));
	document.getElementById('merchantCost').innerHTML = abbrNum(nextMerchantCost,2);
	if(merchants>0){
		firstMerchant = 1;
		console.log("did a thing");
	}
}

function sellWood(amount){
	if(firstSell==0){
		firstSell=1;
	}if(wood>2 && isEven(amount)==true){
			wood = wood - amount;
			gold = gold + (amount/2);
		}else if (wood>2 && isEven(amount)==false) {
			wood = wood - (amount-1);
			gold = gold + ((amount-1)/2);
	}
	checkTut();
}

function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function save(){
	var save = {
	  gold: gold,
	  lumberjacks: lumberjacks,
	  lumberjackCost: lumberjackCost,
		merchants: merchants,
		merchantCost: merchantCost,
		merchRate: merchRate,
    woodRate: woodRate,
    wood: wood,
	  world: world,
		showTut: showTut,
		firstSell: firstSell,
		firstMerchant: firstMerchant,
	}
	localStorage.setItem("save",JSON.stringify(save));
};

function loadGame() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.lumberjacks !== "undefined") lumberjacks = savegame.lumberjacks;
	if (typeof savegame.merchants !== "undefined") merchants = savegame.merchants;
  if (typeof savegame.wood !== "undefined") wood = savegame.wood;
  if (typeof savegame.woodRate !== "undefined") woodRate = savegame.woodRate;
	if (typeof savegame.merchRate !== "undefined") merchRate = savegame.merchRate;
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.lumberjackCost !== "undefined") lumberjackCost = savegame.lumberjackCost;
	if (typeof savegame.merchantCost !== "undefined") merchantCost = savegame.merchantCost;
	if (typeof savegame.world !== "undefined") world = savegame.world;
	showTut = savegame.showTut;
	firstSell = savegame.firstSell;
	firstMerchant = savegame.firstMerchant;
	sendVal();
	checkTut();
}

function deleteSave() {
	localStorage.removeItem("save")
}

function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = [ "k", "m", "b", "t" ];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.lumberjack-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += abbrev[i];

             // We are done... stop
             break;
        }
    }

    return number;
}

window.setInterval(function() {
	mineClick(lumberjacks);
  sendVal();
}, 1000);

window.setInterval(function() {
  save();
}, 60000);

window.setInterval(function() {
	merchSell();
}, 3000);

function merchSell() {
	var h = 2 * merchants;
	if (wood>h) {
		wood = wood - h;
		gold = gold + h;
		merchRate = h;
	}
	document.getElementById("merchRate").innerHTML = merchRate;
}

function openHTab(evt, HTabName) {
    var i, HTabcontent, HTablinks;
    HTabcontent = document.getElementsByClassName("HTabcontent");
    for (i = 0; i < HTabcontent.length; i++) {
        HTabcontent[i].style.display = "none";
    }
    HTablinks = document.getElementsByClassName("HTablinks");
    for (i = 0; i < HTablinks.length; i++) {
        HTablinks[i].className = HTablinks[i].className.replace(" active", "");
    }
    document.getElementById(HTabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

function openVTab(evt, VTabName) {
    // Declare all variables
    var j, VTabcontent, VTablinks;

    // Get all elements with class="tabcontent" and hide them
    VTabcontent = document.getElementsByClassName("VTabcontent");
    for (j = 0; j < VTabcontent.length; j++) {
        VTabcontent[j].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    VTablinks = document.getElementsByClassName("VTablinks");
    for (j = 0; j < VTablinks.length; j++) {
        VTablinks[j].className = VTablinks[j].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(VTabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function checkTut(){
	if (lumberjacks>0 && showTut>=0){
		document.getElementById('tutText1').textContent = "Congratulations! You have your first lumberjack!";
		document.getElementById('tutText2').textContent = "Sell your wood in the gold tab and buy yourself another lumberjack!";
		showTut=1;
	}
	if (firstSell==1 && showTut>=1){
		document.getElementById('tutText1').textContent = "Congratulations! You have succesfully made your first sale!";
		document.getElementById('tutText2').textContent = "Keep selling your wood and hire a merchant to make even more gold!";
		document.getElementById("merchantTab").style.display = "inherit";
		showTut=2;
	}
	if (firstMerchant==1 && showTut>=2){
		document.getElementById('tutText1').textContent = "Congratulations! You have a merchant! Next you need a shop.";
		document.getElementById('tutText2').textContent = "Before you can build a shop, you need to buy a plot to build it on.";
		document.getElementById("landTab").style.display = "inherit";
		showTut=3;
	}
}
