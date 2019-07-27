/* playerArray = ['Jeff', 'Cece', 'Audrey', 'Dave', 'Sophia', 'Higgins'];

let firstPlayer = (Math.floor(Math.random() * playerArray.length));
console.log(firstPlayer);
console.log(playerArray[firstPlayer]);
let currentPlayer = firstPlayer;
console.log(currentPlayer); */

function changeColor() {
    let myName = document.getElementsByTagName('li')[1];
    myName.style.color = 'orange';
    console.log(myName);
}