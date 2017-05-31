var gold = 0;
var miners = 0;
var world = 1;

function mineClick (number){
	gold = gold + number;
	document.getElementById("gold").innerHTML = gold;
	};
	
function hireMiner(){
	var minerCost = Math.floor(10 * Math.pow(1.2,miners));
	if(gold >= minerCost){
		miners = miners + 1;
		gold = gold - minerCost;
		document.getElementById('miners').innerHTML = prettify(miners);
		document.getElementById('gold').innerHTML = prettify(gold);
	};
	var nextCost = Math.floor(10 * Math.pow(1.2,miners));
	document.getElementById('minerCost').innerHTML = prettify(nextCost);
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
	  world: world
	}
	localStorage.setItem("save",JSON.stringify(save));
	ga('send', 'event', 'My Game', 'Save');
};

function loadGame() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.miners !== "undefined") miners = savegame.miners;
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.minerCost !== "undefined") minerCost = savegame.minerCost;
	if (typeof savegame.world !== "undefined") world = savegame.world;
}

function deleteSave() {
	localStorage.removeItem("save")
}

window.setInterval(function(){
	mineClick(miners);
	console.log(gold);
}, 1000);

window.setInterval(function() {
  save();
}, 60000);
