//if all dice are active when you roll again, current points = current points minus previous current points
//if a roll yields zero points, next player, add a farkle.
//if a player gets three farkles, minus 1000, reset farkles to zero.






//global variables - yikes!
let playerEntryArray = [];
let dieArray = [];
let roundCount = 0;
let round = 1;
let firstPlayer;
let currentPlayer;
var currentPoints = 0;
var playerObjectArray;

const dieImageArray = ['one.png','two.png','three.png','four.png','five.png','six.png'];

const startScreen = document.getElementById("startScreen");
const playerEntry = document.getElementById("playerEntry");
const gameContent = document.getElementById("gameWrapper");
var addPlayers = document.getElementById("playerEntry2");
var playerScoreBoard = document.getElementById("gameContent2");
var gameMessage = document.getElementById("gameConsoleMessage");
var roundText = document.getElementById("roundText");
var dieDiv = document.getElementById("dieHolder");
var dieClass = dieDiv.getElementsByClassName("die");


//classes

class Player {
    constructor(name, score, active){
        this.name = name;
        this.score = score;
        this.active = active
        this.farkles = 0;
        this.rolls = 0;
    }
}

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

document.addEventListener('click', function (event) {

	if (event.target.className == 'die' && playerObjectArray[currentPlayer].rolls > 0) {

        event.target.className = 'die inactive';
        return;
    }
    if (event.target.className == 'die inactive' && playerObjectArray[currentPlayer].rolls > 0){

        event.target.className = 'die';
        return;
    }

    if (event.target.matches(".buttonactive")) {
        console.log('you just clicked a glowing button');
        return;
    }

}, false);

document.addEventListener('mouseover', function (event) {
    if(event.target.className === 'die' && playerObjectArray[currentPlayer].rolls > 0) {
        event.target.style = "filter: invert(100%);";
    }
}, false);

document.addEventListener('mouseout', function (event) {
    if(event.target.className === 'die' && playerObjectArray[currentPlayer].rolls > 0) {
        event.target.style = "filter: none;";
    }
}, false);




//functions
//exit startScreen, enter playerEntry screen
function startGame() {
    startScreen.style.display = "none";
    playerEntry.style.display = "grid";
    playerEntryArray = [];
    playerObjectArray = [];
    addPlayers.innerHTML = "Players:<br>"
}
//validate and add players as entered
function addPlayer() {
    var name = document.getElementById("nameInput");
    if (name.value == '') {
        alert('you must input a name!');
        return;
    }else if(playerEntryArray.includes(name.value) ) {
        alert('each player must have a different name!');
        name.value = '';
        return;
    }else{
        playerEntryArray.push(name.value);
        addPlayers.innerHTML += `<br>${name.value}`;
        console.log(playerEntryArray);
        name.value = '';
        }
    //enable carriage returns to add players
  }
//create list of name: score objects using array of those objects
function updatePlayers(array, location){
    for(let i=0; i<array.length; i++) {
        let node = document.createElement("li");
        let textnode = document.createTextNode(`${array[i].name}: ${array[i].score}`);
        node.appendChild(textnode);
        location.appendChild(node);
        }
    }

//start game with players added
function doneAddingPlayers(array) {
    if (array.length == 1 || array.length == 0) {
        alert('this game requires two or more players');
        startGame();
        return;
    }
    for (let i=0; i<array.length; i++) {
        playerObjectArray[i] = new Player(array[i], 0, false);
    }
    choosePlayer(playerObjectArray);
    updatePlayers(playerObjectArray, playerScoreBoard);
    initializeDice();
    setPlayerActive(playerScoreBoard, playerObjectArray);
}
//randomly choose first player
function choosePlayer(array) {
    firstPlayer = (Math.floor(Math.random() * array.length));
    currentPlayer = firstPlayer;
    alert(`${array[currentPlayer].name} is the first player!`);
    gameMessage.innerHTML = `Hello ${array[currentPlayer].name}. Please roll the dice.`
    array[currentPlayer].active = true;
}
//make active player red and bulleted
function setPlayerActive(location, array) {
    let currentPlayers = location.getElementsByTagName('li');

    for(let i=0; i<array.length; i++) {
        if(array[i].active === true) {
            currentPlayers[i].style.color = 'red';
            currentPlayers[i].style.listStyle = 'default';
        } else {
            currentPlayers[i].style.color = 'white';
            currentPlayers[i].style.listStyle = 'none';
        }
    }
}
//fill dieArray with dice objects
function createDice(){
    for (i=0; i<=5; i++) {
        dieArray[i] = new Die(`die${i}`, 'one.png');
        }
  }
//make dice and scoring visible and player entry invisible
function initializeDice() {
    createDice();
    playerEntry.style.display = "none";
    gameContent.style.display = "grid";
}
//reset the dice to original value/appearance

function resetDice () {
    for (let i = 0; i < dieClass.length; i++) {
        dieArray[i].value = 0;
        dieArray[i].active = true;
        document.getElementById(`die${[i]}`).src = dieImageArray[0];
        if(dieClass[i].className = "die inactive") {
            dieClass[i].className = "die";
        }
        if(dieClass[i].style = "filter: invert(100%);") {
            dieClass[i].style = "filter: none;";
        }
    }
}

//check to see if there's a winning score
function checkScore(el) {
    if (el.score >= 5000) {
        alert(`${el.name} has won!!`);
        //gameMessage.innerHTML = `${el.name} has won!!`;
        location.reload();
    }
}

function updateRound(array) {
    //figure out why this executes late
    array.some(checkScore);
    //add current points to current player's total
    array[currentPlayer].score += currentPoints;
    playerObjectArray[currentPlayer].active = false;
    //update player list
    playerScoreBoard.innerHTML = '';
    updatePlayers(playerObjectArray, playerScoreBoard);
    //return to start of array after last player
    if(currentPlayer==(array.length-1)) {currentPlayer = 0;
        }else{
        currentPlayer ++;
    }
    playerObjectArray[currentPlayer].active = true;
    console.log(playerObjectArray);
    currentPoints = 0;
    roundCount++;

    if (roundCount == array.length){
        roundText.innerHTML = `Round ${++round}:`;
        roundCount = 0;
    }

    resetDice();
    playerObjectArray[currentPlayer].rolls = 0;
    setPlayerActive(playerScoreBoard, playerObjectArray);
    gameMessage.innerHTML = `Hello ${array[currentPlayer].name}. Please roll the dice.`
}
//makes die inactive when clicked, and gets new hand when roll button is pushed(currently inactive function)
function processHand(dieInterfaces, dieObjects, playerObjects) {
    let currentHand = [];

    playerObjects[currentPlayer].rolls++

    //links die interface active class to die object active property
    for(i=0; i<dieInterfaces.length; i++) {
      if(dieInterfaces[i].className === 'die inactive') {
        dieObjects[i].active = false;
      }else{
        dieObjects[i].active = true;
      }
    }
    getCurrentHand(dieObjects, currentHand);

    let sortHand = currentHand.sort(function(a, b){return a-b});

    //check for a sixkind and add points if true. If false, evaluate for straight; if false evaluate hand;
    //put this inside a conditional, or run a function to check for points followed by no points...
    //maybe we need a currentPointsBefore and a currentPointsAfter....
    evalSixKind(sortHand) ? true : evalStraight(sortHand) ? true : evalMain(sortHand);

//if no points, next player, assign farkle 
    console.log(currentPoints);
    if (currentPoints === 0 && playerObjects[currentPlayer].rolls === 1) {
        playerObjects[currentPlayer].farkles++;
        updateRound(playerObjectArray);
        alert(`Sorry ${playerObjects[currentPlayer].name}. You just farkled!`)
    }
//(if player gets three farkles in a row, -1000 points)
    if (currentPoints === 0 && playerObjects[currentPlayer].farkles === 3) {
        playerObjects[currentPlayer].score -= 1000;
        alert(`Oh no, matey! ${playerObjects[currentPlayer].name}. You farkled thrice and lost 1000 points!`);
        playerObjects[currentPlayer].farkles = 0;
        updateRound(playerObjectArray);
    }

    if (currentPoints > 0 && playerObjects[currentPlayer].rolls >= 1) {
        gameMessage.innerHTML = `${playerObjects[currentPlayer].name}! You currently have ${currentPoints} points; Click the die
        you'd like to keep and roll again to try for more points, or hit stay to keep what you have.`
    }
//if currentPoints from first roll are the same as currentPoints from second roll, farkle out.
    if (currentPoints === 0 && playerObjects[currentPlayer].rolls >= 1) {
        alert(`Bad luck ${playerObjects[currentPlayer].name}. You lost the points you had!`)
        updateRound(playerObjectArray);
    }

    console.log(currentHand);

    currentHand = [];
  }
//calls rollDie on each die as long as they're active, and puts a value on each die.
//also returns a new hand based on all values of active die (currently inactive function)
function getCurrentHand (array, hand) {

    for (i=0; i<array.length; i++) {
        if (array[i].active === true) {
        array[i].value = array[i].rollDie();
        hand.push(array[i].value);
        document.getElementById(`die${[i]}`).src = dieImageArray[array[i].value];
        }
    }
console.log(hand);
return hand;
}


//rules function
function rules() {
    alert('these are the rules!');
}

//function to check for a sixOfAKind and add 3000 points if true.
function evalSixKind(hand){
    for(i=0; i<hand.length-1; i++) {
        if (hand[i] != hand[i+1]) {
            return false;
        }
    }
    currentPoints = currentPoints + 3000;
    return true;
}
//function to check for a straight (1, 2, 3, 4, 5, 6) give 1500 points
function evalStraight(hand){
    for(i=0; i<hand.length-1; i++) {
        if (hand[i] != hand[i+1]+1) {
            return false;
        }
    }
    currentPoints = currentPoints + 1500;
    return true;
}
//function to evaluate hand for points if no straight or six of a kind
function evalMain(hand) {
    let ones = hand.filter(x => x === 0);
    let twos = hand.filter(x => x === 1);
    let threes = hand.filter(x => x === 2);
    let fours = hand.filter(x => x === 3);
    let fives = hand.filter(x => x === 4);
    let sixes = hand.filter(x => x === 5);
//check for pairs
    if (hand[0] === hand[1] && hand[2] === hand[3] && hand[4] === hand[5]) {
        currentPoints = currentPoints + 1500;
        return;
    }
//check for triplets
    if (hand[0] === hand[1] && hand[1] === hand[2] && hand[3] === hand[4] && hand[4] === hand[5]) {
        currentPoints = currentPoints + 2500;
        return;
    }
//check hand for points
    if (ones.length === 3) {
        currentPoints = currentPoints + 300;
    } else {
        currentPoints = currentPoints + (ones.length * 100);
    }
    if (twos.length === 3) {
        currentPoints = currentPoints + 200;
    }
    if (threes.length === 3) {
        currentPoints = currentPoints + 300;
    }
    if (fours.length === 3) {
        currentPoints = currentPoints + 400;
    }
    if (fives.length === 3) {
        currentPoints = currentPoints + 500;
    } else {
        currentPoints = currentPoints + (fives.length * 50);
    }
    if (sixes.length === 3) {
        currentPoints = currentPoints + 600;
    }
}

//maybe add a message indicating what type of hand they got...


//add "click the dice you want to keep and roll again, or"
//enter clicked die into current hand, only roll the number of die not clicked.

    //tally kept die at start of new roll, and add to running total

    //if all six die produce points, keep going until keep points or lose points.

    //go to next player. repeat above.



















