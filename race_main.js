"use strict";

/*
    Final Project: Racing Games
    Author: Hieu Dang
    Date:   11/30/2019

    Filename: race_main.js
*/


/*Declare global variables*/
var posCar1 = document.getElementById("car1");
var posCar2 = document.getElementById("car2");

var totDistance1 = 0;
var totDistance2 = 0;
var distance1 = 0;
var distance2 = 0;

var myInterval = null;

var winnerNum;

/*Start race function*/
function startRace() {
	console.log("start race");
	document.getElementById("trafficLight").src = "greenLight.png";
	console.log("change red light to green");
	
	myInterval = setInterval(raceProgress, 50);			/*Automatically call raceProgress function each 50ms*/
}


/*Race Progress function*/
function raceProgress() {			/*Don't need to add global parametters*/			
	/*Get random move distance of two cars*/
	distance1 = move();				/*Return a number*/
	console.log("Distance 1 " + distance1);
	distance2 = move();				/*Return a number*/
	console.log("Distance 2 " + distance2);
	
	/*Calculate current position of the cars*/
	totDistance1 += distance1;		/*Return a number*/
	console.log("Total Distance 1 " + totDistance1);		
	totDistance2 += distance2;		/*Return a number*/
	console.log("Total Distance 2 " + totDistance2);
	
	/*Show on the race road*/
	updatePosition();
	
	/*check winner*/
	checkWinner();	
}

/*Move function*/
function move() {
	var distance = Math.random();
	return distance;
}

/*Click traffice light function*/
function startSignal() {
	document.getElementById("trafficLight").addEventListener("click", startRace);
}

/*Click winner image to reset*/
function resetSignal() {
	document.getElementById("winnerPicture").addEventListener("click", resetRace);
}

/*Main function*/
function main() {
	startSignal();
	resetSignal();
}


/*Update car's positions*/
function updatePosition() {				/*Don't need to add global parametters*/	
	var position1 = totDistance1;					/*reset format of position1*/
	console.log("Position 1 " + position1);
	var position2 = totDistance2;					/*reset format of position2*/
	console.log("Position 2 " + position2);
	position1 += "%";
	position2 += "%";
	posCar1.style.left = position1;					/*Need to update the data*/
	posCar2.style.left = position2;					/*Need to update the data*/
	
	console.log(posCar1);							/*why left property is updated too long*/
	console.log(posCar2);
}

/*Check the winner with further position condition*/
function checkWinner() {
	if (totDistance1 > totDistance2) {				/*Car 1 ran further than car 2*/
		if (totDistance1 >= 95) {
			console.log("Car 1 won");
			winnerNum = 1;
			clearInterval(myInterval);				/*Clear setInterval()*/
			showWinner();
			
		} else if (totDistance2 >= 95) {
			console.log("Car 2 won");		
			winnerNum = 2;
			clearInterval(myInterval);				/*Clear setInterval()*/
			/* var winnerImg = "<img class='winner' src='winner" + winnerNum + ".png' />"
			document.getElementById("winnerPicture").insertAdjacentHTML("afterBegin", winnerImg); */
			showWinner();
		}
	} else if (totDistance2 > totDistance1) {		/*Car 2 ran further than car 1*/
		if (totDistance2 >= 95) {
			console.log("Car 2 won");
			winnerNum = 2;
			clearInterval(myInterval);				/*Clear setInterval()*/
			showWinner();

		} else if (totDistance1 >= 95) {			
			console.log("Car 1 won");
			winnerNum = 1;
			clearInterval(myInterval);				/*Clear setInterval()*/
			showWinner();

		}
	} else {										/*Both car 2 are at the same position*/
		if (totDistance1 == 95) {
			console.log("Both cars come to the final at the same time");
			winnerNum = 3;
			clearInterval(myInterval);				/*Clear setInterval()*/
			showWinner();

		}
	}
	
	
}

/*SHow winner function*/
function showWinner() {
	var winnerImg = "<img id='raceWinner' src='winner" + winnerNum + ".png' />"
	document.getElementById("winnerPicture").insertAdjacentHTML("afterBegin", winnerImg);
}

function resetRace() {
	//Reset car positions
	totDistance1 = 0;
	totDistance2 = 0;
	updatePosition();
	
	//Turn on Red Light
	document.getElementById("trafficLight").src = "redLight.png";
	
	//Remove winner image
	var imageDiv = document.getElementById("winnerPicture");
	imageDiv.removeChild(imageDiv.childNodes[0]);
	
}
	

main();
