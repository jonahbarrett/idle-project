var gold = 0;
var miners = 0;
var world = 1;
var drills = 0;


	
function mineClick (number){
	gold = gold + number;
	document.getElementById("gold").innerHTML = abbrNum(gold,2 );
	};
	
function hireMiner(){
	var minerCost = Math.floor(10 * Math.pow(1.2,miners));
	if(gold >= minerCost){
		miners = miners + 1;
		gold = gold - minerCost;
		document.getElementById('miners').innerHTML = abbrNum(miners, 2);
		document.getElementById('gold').innerHTML = abbrNum(gold, 2);
	};
	var nextMinerCost = Math.floor(10 * Math.pow(1.2,miners));
	document.getElementById('minerCost').innerHTML = abbrNum(nextMinerCost, 2);
};

function buyDrill(){
	var drillCost = Math.floor(75 * Math.pow(1.4,drills));
	if(gold >= drillCost){
		drills = drills + 1;
		gold = gold - drillCost;
		document.getElementById('drills').innerHTML = abbrNum(drills, 2);
		document.getElementById('gold').innerHTML = abbrNum(gold, 2);
	};
	var nextDrillCost = Math.floor(75 * Math.pow(1.4,drills));
	document.getElementById('drillCost').innerHTML = abbrNum(nextDrillCost, 2);
};

function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function save(){
	var save = {
	  gold: gold,
	  miners: miners,
	  minerCost: minerCost,
	  world: world,
	  drills: drills,
	  drillCost: drillCost,
	}
	localStorage.setItem("save",JSON.stringify(save));
};

function loadGame() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.miners !== "undefined") miners = savegame.miners;
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.minerCost !== "undefined") minerCost = savegame.minerCost;
	if (typeof savegame.world !== "undefined") world = savegame.world;
	if (typeof savegame.drills !== "undefined") drills = savegame.drills;
	if (typeof savegame.drillCost !== "undefined") drillCost = savegame.drillCost;
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
    for (var i=abbrev.length-1; i>=0; i--) {

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

window.setInterval(function(){
	mineClick(miners);
	mineClick(5*drills);
	console.log(gold);
}, 1000);

window.setInterval(function() {
  save();
}, 60000);





function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}