var pages = game;
var choices = '';
var conditions = {};
var gameHistory = [];
var endings = [];
var possibleEndings = 5;
var fadeInterval;
function d(i){return document.getElementById(i)}
function init() {d('content').style.opacity=1;choices = d("choice_list");d("gametitle").innerHTML=document.title=gametitle;d("desc").innerHTML=gamedescription;}
function back() {
	gameHistory.pop();
	if (gameHistory.length > 0){
		var lastPage = gameHistory.pop();
		fadeToPage(lastPage);
	}
}
function fadeToPage(id){
	clearInterval(fadeInterval);
	fadeInterval = setInterval(fadeOut,10);
	setTimeout(function(){loadPage(id)},500);
}
function fadeOut(){
	d('content').style.opacity-=.02;
	if(d('content').style.opacity <= 0) clearInterval(fadeInterval);
}
function loadPage(id) {
	dev = true;
	d('content').style.opacity = 1;
	gameHistory.push(id);
	var bodytext = d("bodytext");
	choices.innerHTML = '';
	var page = pages[id];
	var pic = pics[page.picId];
	if(!pic) {d('canvas').style.display='none'}
	else {
		d('canvas').style.display='block';
		d('canvas').width=page.width;
		d('canvas').height=page.height;
		if (!page.overlay){
			draw(pic,page.width,page.height,page.rev);
		} else {
			overlay(pic,pics[page.picId2],page.posX?page.posX:0,page.posY?page.posY:0,page.width,page.height);
		}
	};
	if (page.ending){
		endings[page.ending-1]=true;
		d('endings').innerHTML = calcendings();
	}
	bodytext.innerHTML = '';
	if (page.preConditions) {
		for (var i in page.preConditions) {
			if (conditions[page.preConditions[i][0]] == "true") {
				bodytext.innerHTML += page.preConditions[i][1];
			} else {
				bodytext.innerHTML += page.preConditions[i][2];
			}
		}
	}
	bodytext.innerHTML += page.body;
	document.body.scrollTop = 0;
	if (page.postConditions) {
		for (var i in page.postConditions) {
			if (conditions[page.postConditions[i][0]] == "true") {
				bodytext.innerHTML += page.postConditions[i][1];
			} else {
				bodytext.innerHTML += page.postConditions[i][2];
			}
		}
	}
	if (page.setConditions) {
		for (var i in page.setConditions){
			conditions[page.setConditions[i].var] = page.setConditions[i].value;
		}
	}
	for (var i in page.choices) {
		console.log(page);
		var choice = page.choices[i];
		var choiceText = choice.text;
		var choiceId = choice.link;
		if (choice.conditions) {
			var con = true;
			for (var j in choice.conditions){
				if (conditions[choice.conditions[j].var] != choice.conditions[j].value){
					con = false;
				}
			}
			if (con) {
				addChoice(choiceId, choiceText);
			}
		} else {
			if (((choice.coil) && (document.monetization) && (document.monetization.state=='started')) || !choice.coil || dev) {
				addChoice(choiceId, choiceText);
			}
		}
	}
}
function addChoice(choiceId, choiceText) {
	var choiceLink = document.createElement("LI");
	choiceLink.innerHTML = "<a onclick='fadeToPage(" + choiceId + ")'>" + choiceText + "</a></li>";
	choices.appendChild(choiceLink);
}
function restart() {
	conditions = {};
	fadeToPage(0);
}
function calcendings(){
	var ends = 0;
	for (var i in endings){
		if (endings[i]) ends++;
	}
	return ends + ' of 6 endings found.';
}