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
const table = document.getElementById('forecast-table'); 
const cells = table.getElementsByTagName('td');

for (let cell of cells) {
  let status = cell.getAttribute('data-status');
  if (status === 'open') {
    // Grab the data 
  }
} */

/* // Check the status of each data cell in a table
const myList = document.getElementById('gameContent2'); 
const players = myList.getElementsByTagName('li');
//add a player status to the object!

for (let player of players) {
  let status = cell.getAttribute('data-status');
  if (status === 'open') {
    // Grab the data 
  }
} */

let myArray = [{name: 'Jeff', score: 0}, {name: 'Cece', score: 10001}, {name: 'Audrey', score: 0}];

myArray.some(checkScore);

function checkScore(el) {
    if (el.score >= 5000) {
        console.log(`${el.name} has won!!`);
    }
}

