//if all dice are active when you roll again, current points = current points minus previous current points

//if a die that scores is not clicked and rolled again, remove that score from current points...or...
//actually if you put point scoring in it's own function, you can pass it around AS NEEEDED!!


//evaluate points from first hand, then each clicked hand, and finally leftovers before stay
//if the first hand is zero, farkle
//if any subsequent hand is zero, next player and lose points
//at each roll, count new points?
//call clicked die values new points?

//only active die produce new points.
//clicked die values retain points.



//global variables - yikes!
let playerEntryArray = [];
let dieArray = [];
let clickedDieArray = [];
let roundCount = 0;
let round = 1;
let firstPlayer;
let currentPlayer;
let finalHand = [];
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
        this.clicked = false;
        this.value = 0;
    }
    rollDie() {
   return Math.floor(Math.random() * 6);
    }
  }

document.addEventListener('click', function (event) {

	if (event.target.className === 'die' && playerObjectArray[currentPlayer].rolls > 0) {

            for(let i=0; i<dieArray.length; i++) {
                if (event.target.id === dieArray[i].name && dieArray[i].clicked === true){
                    return;
                }
                //^^where do i put this to prevent it from being clicked after the roll??
                if(event.target.id === dieArray[i].name) {
                dieArray[i].active = false;
            }
            }
            event.target.className = 'die inactive';
            console.log(dieArray);
            return;
    }
    if (event.target.className === 'die inactive' && playerObjectArray[currentPlayer].rolls > 0){
        for(let i=0; i<dieArray.length; i++) {
            if (event.target.id === dieArray[i].name && dieArray[i].clicked === true){
                return;
            }
            if(event.target.id === dieArray[i].name) {
              dieArray[i].active = true;
          }
        }
        event.target.className = 'die';
        console.log(dieArray);
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
        dieArray[i].clicked = false;
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

    //you'll have to add some of the guts of 'process hand' here. The sort hand and the evaluation stuff
    //the score will only be processed once 'stay' is pressed.




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
    tempHand =[];
    playerObjectArray[currentPlayer].rolls = 0;
    setPlayerActive(playerScoreBoard, playerObjectArray);
    gameMessage.innerHTML = `Hello ${array[currentPlayer].name}. Please roll the dice.`
}
//gets new hand when roll button is pushed(currently inactive function)
function processHand(dieObjects, playerObjects, farkles) {
    //declares a temporary hand for farkle evaluation only
    let tempHand = [];
    //currentPoints = 0;
    //clickedDieArray = [];

    //increments player object's 'rolls' value by 1
    playerObjects[currentPlayer].rolls++

    //changes 'clicked' value of selected die to 'true' so that arrays containing points
    //for each roll can be evaluated.
/*     for(let i=0; i<dieObjects.length; i++) {
        if(dieObjects[i].active === false) {
            dieObjects[i].clicked = true;
        }
    } */

    //fills the 'tempHand' array with random values from the 'rollDie' method of die Object on the first roll
    //and replaces active die Object values on subsequent rolls.
    //should produce a shorter hand when die are selected.
    getTempHand(dieObjects, tempHand);
    //evaluates points on the array 'tempHand'.
    //I can now use evalPoints to evaluate points on any array, the next step to figuring dynamic point scoring
    evalPoints(tempHand);


/*     for(let i=0; i<dieObjects.length; i++) {
        if(dieObjects[i].active === false) {
            clickedDieArray.push(dieObjects[i].value);
        }
    }
console.log(`the array of clicked dice is ${clickedDieArray}`); */
    console.log(tempHand);
    farkles(playerObjectArray);
    //tempHand = [];
  }


function evalPoints(hand) {
    let sortedHand = hand.sort(function(a, b){return a-b});
    //perhaps only evaluate the first two when the hand length is 6...
    //checks the tempHand for a sixkind and add points if true. If false, evaluate for straight; if false evaluate hand;
    evalSixKind(sortedHand) ? true : evalStraight(sortedHand) ? true : evalMain(sortedHand);
    console.log(currentPoints);//point evaluation works
}

//this needs to go inside the getPoints function as a callback so it executes after points are tallied

function evalFarkles(playerObjects){
//if no points, next player, assign farkle 
    if (currentPoints === 0 && playerObjects[currentPlayer].rolls === 1) {
        playerObjects[currentPlayer].farkles++;
        alert(`Sorry ${playerObjects[currentPlayer].name}. You just farkled!`)
        updateRound(playerObjectArray);
    }
    //(if player gets three farkles in a row, -1000 points)
    if (currentPoints === 0 && playerObjects[currentPlayer].farkles === 3) {
        playerObjects[currentPlayer].score -= 1000;
        alert(`Oh no, matey! ${playerObjects[currentPlayer].name}. You farkled thrice and lost 1000 points!`);
        playerObjects[currentPlayer].farkles = 0;
        updateRound(playerObjectArray);
    }
    //if second plus rolls yield a zero
    if (currentPoints === 0 && playerObjects[currentPlayer].rolls >= 1) {
        alert(`Bad luck ${playerObjects[currentPlayer].name}. You lost the points you had!`);
        updateRound(playerObjectArray);
    }
    //successful second plus rolls:
    if (currentPoints > 0 && playerObjects[currentPlayer].rolls >= 1) {
        gameMessage.innerHTML = `${playerObjects[currentPlayer].name}! You currently have ${currentPoints} points; Click the die
        you'd like to keep and roll again to try for more points, or hit stay to keep what you have.`
        
    }
}


function getTempHand (array, hand) {

    for (i=0; i<array.length; i++) {
        if (array[i].active === true && playerObjectArray[currentPlayer].rolls >= 1) {
            hand.splice(i, 1);
        }
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
    currentPoints += 3000;
    return true;
}
//function to check for a straight (1, 2, 3, 4, 5, 6) give 1500 points
function evalStraight(hand){
    for(i=0; i<hand.length-1; i++) {
        if (hand[i] != hand[i+1]+1) {
            return false;
        }
    }
    currentPoints += 1500;
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
        currentPoints += 1500;
        return;
    }
//check for triplets
    if (hand[0] === hand[1] && hand[1] === hand[2] && hand[3] === hand[4] && hand[4] === hand[5]) {
        currentPoints += 2500;
        return;
    }
//check hand for points
    if (ones.length >= 3) {
        currentPoints += 300;
    }
    if (ones.length > 3){
        currentPoints += ((ones.length-3) * 100);
    }
    if (ones.length < 3){
        currentPoints += (ones.length * 100);
    }
    if (twos.length >= 3) {
        currentPoints += 200;
    }
    if (threes.length >= 3) {
        currentPoints += 300;
    }
    if (fours.length >= 3) {
        currentPoints += 400;
    }
    if (fives.length >= 3) {
        currentPoints += 500;
    }
    if (fives.length > 3){
        currentPoints += ((fives.length-3) * 50);
    }
    if (fives.length < 3){
        currentPoints += (fives.length * 50);
    }
    if (sixes.length >= 3) {
        currentPoints += 600;
    }
}




















