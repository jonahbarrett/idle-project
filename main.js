var gold = 10;
var wood = 0;
var stone = 0;
var iron = 0;
var lumberjacks = 0;
var world = 1;

function sendVal(){
	document.getElementById("gold").innerHTML = abbrNum(gold,2 );
	document.getElementById("wood").innerHTML = abbrNum(wood,2);
	document.getElementById("stone").innerHTML = abbrNum(stone,2);
	document.getElementById("iron").innerHTML = abbrNum(iron,2);
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
	var nextLumberjackCost = Math.floor(10 * Math.pow(1.2,lumberjacks));
	document.getElementById('lumberjackCost').innerHTML = abbrNum(nextLumberjackCost, 2);
};



function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function save(){
	var save = {
	  gold: gold,
	  lumberjacks: lumberjacks,
	  lumberjackCost: lumberjackCost,
	  world: world,
	}
	localStorage.setItem("save",JSON.stringify(save));
};

function loadGame() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.lumberjacks !== "undefined") lumberjacks = savegame.lumberjacks;
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.lumberjackCost !== "undefined") lumberjackCost = savegame.lumberjackCost;
	if (typeof savegame.world !== "undefined") world = savegame.world;
	sendVal();
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

window.setInterval(function(){
	mineClick(lumberjacks);
	console.log(nextLumberjackCost);
}, 1000);

window.setInterval(function() {
  save();
}, 60000);





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
