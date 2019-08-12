/* playerArray = ['Jeff', 'Cece', 'Audrey', 'Dave', 'Sophia', 'Higgins'];

let firstPlayer = (Math.floor(Math.random() * playerArray.length));
console.log(firstPlayer);
console.log(playerArray[firstPlayer]);
let currentPlayer = firstPlayer;
console.log(currentPlayer); */
/* 
function changeColor() {
    let myName = document.getElementsByTagName('li')[1];
    myName.style.color = 'orange';
    console.log(myName);
} */

/* function changeColor() {
    let activePlayerColor = document.getElementsByTagName('li')[1];
    myName.style.color = 'orange';
    console.log(myName);
} */

/* // Check the status of each data cell in a table
const table = document.getElementByname('forecast-table'); 
const cells = table.getElementsByTagName('td');

for (let cell of cells) {
  let status = cell.getAttribute('data-status');
  if (status === 'open') {
    // Grab the data 
  }
} */

/* // Check the status of each data cell in a table
const myList = document.getElementByname('gameContent2'); 
const players = myList.getElementsByTagName('li');
//add a player status to the object!

for (let player of players) {
  let status = cell.getAttribute('data-status');
  if (status === 'open') {
    // Grab the data 
  }
} */

/* let myArray = [{name: 'Jeff', score: 0}, {name: 'Cece', score: 10001}, {name: 'Audrey', score: 0}];

myArray.some(checkScore);

function checkScore(el) {
    if (el.score >= 5000) {
        console.log(`${el.name} has won!!`);
    }
} */

//The grand finale, except for styling...
//so, in order to make each die clickable, we're going to have to add an event listener?
//we're going to have to add a status to each die, active or inactive
//you can click on or off the die until you roll or stay
//when rolled again, active die relinquish their points, and inactive die become permanently inactive..
//there will have to be a second, third, etc array for each subsequent roll in same round
//this array will only contain the rolls of each active die, and will be evaluated for points

var dieImageArray = ['one.png','two.png','three.png','four.png','five.png','six.png'];
//Die constructor
class Die { 
  constructor(name, img){
      this.name = name;
      this.img = img;
      this.active = true;
      this.value = 0;
  }
  rollDie() {
 return Math.floor(Math.random() * 6);
  }
}

let myDieArray = [];
//die object array creator
for (i=0; i<=5; i++) {
myDieArray[i] = new Die(`die${i}`, 'one.png');
}


//console.log(myDieArray);
//console.log(myDieArray[2]);
//console.log(myDieArray[2].rollDie());//this is how you access the random die value... can we name it?
myDieArray[3].active = false;// on click, you can assign the instance to be false.
myDieArray[5].active = false;
//console.log(myDieArray[4].active);
//console.log(myDieArray);

let newDieArray = [];

function makeNewDieArray (array) {
  for (i=0; i<array.length; i++) {
    if (array[i].active === true) {
      newDieArray.push(array[i]);
    }
  }
}
makeNewDieArray(myDieArray);
//console.log(newDieArray);

//MAKE SURE THE FOR LOOP HAS THE RIGHT AMOUNT OF ITERATIONS OR IT WON'T READ THE UNDEFINED ONE!!!

//now roll for values...
let valueArray = [];
//so every time the dice are rolled, the array of active die objects is entered...(they're all active at first)
function getNewHand (array) {
  for (i=0; i<array.length; i++) {
    array[i].value = array[i].rollDie();
    valueArray.push(array[i].value);
    //document.getElementById(`die${[i]}`).src = array[i].value;
  }
  
}

getNewHand(newDieArray);
console.log(myDieArray);
console.log(newDieArray);
console.log(valueArray);

//ok so the first thing we do is figure out the new way to get the first array of rolls
//which removes the random function from rollDice and puts it in the die class
//we're going to have to link the dice in the interface with the dice in the array object
//when making active and when showing the rolled dice... we may have to generate a face a la alberto, then.
//then we're going to have to use a click to toggle activate/deactivate each die
//and add css to grey out the deactivated....