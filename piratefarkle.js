//variables
let playerArray = [];
let roundCount = 0;
let round = 1;
let firstPlayer;

var currentPoints = 0;
var currentPlayer;
var dieArray = ['one.png','two.png','three.png','four.png','five.png','six.png'];

const startScreen = document.getElementById("startScreen");
const playerEntry = document.getElementById("playerEntry");
const gameContent = document.getElementById("gameWrapper");
var addPlayers = document.getElementById("playerEntry2");
var playerScoreBoard = document.getElementById("gameContent2");
var gameMessage = document.getElementById("gameConsoleMessage");
var roundText = document.getElementById("roundText");
var playerScoreArray;
var activePlayer;

//classes
class Player {
    constructor(name, score){
        this.name = name;
        this.score = score;
    }
}

//functions
function startGame() {
    startScreen.style.display = "none";
    playerEntry.style.display = "grid";
    playerArray = [];
    playerScoreArray = [];
    addPlayers.innerHTML = "Players:<br>"
}

function addPlayer() {
    var name = document.getElementById("nameInput");
    if (name.value == '') {
        alert('you must input a name!');
        return;
    }else if(playerArray.includes(name.value) ) {
        alert('each player must have a different name!');
        name.value = '';
        return;
    }else{
        playerArray.push(name.value);
        addPlayers.innerHTML += `<br>${name.value}`;
        console.log(playerArray);
        name.value = "";
        }
    //enable carriage returns to add players
    //li created for each player,
    //bulleted only when player is active.
  }

function updatePlayers(array, location){
    for(let i=0; i<array.length; i++) {
        let node = document.createElement("li");
        let textnode = document.createTextNode(`${array[i].name}: ${array[i].score}`);
        node.appendChild(textnode);
        location.appendChild(node);
    }
}

function doneAddingPlayers(array) {
    if (array.length == 1 || array.length == 0) {
        alert('this game requires two or more players');
        startGame();
        return;
    }
    for (i=0; i<array.length; i++) {
        playerScoreArray[i] = new Player(array[i], 0);
    }
    updatePlayers(playerScoreArray, playerScoreBoard);
    choosePlayer(array);
    initializeDice();
}

function choosePlayer(array) {
    firstPlayer = (Math.floor(Math.random() * array.length));
    currentPlayer = firstPlayer;
    alert(`${array[currentPlayer]} is the first player!`);
    gameMessage.innerHTML = `Hello ${array[currentPlayer]}. Please roll the dice.`
    //change color of current player
}

function initializeDice() {
    playerEntry.style.display = "none";
    gameContent.style.display = "grid";
}

function checkScore(el) {
    if (el.score >= 5000) {
        alert(`${el.name} has won!!`);
        //gameMessage.innerHTML = `${el.name} has won!!`;
        startScreen.style.display = "block";
        playerEntry.style.display = "none";
        gameContent.style.display = "none";
        //execute a 'reset game' or document reload function here

    }
}

function updateRound(array) {
    
    //figure out why this executes late
    array.some(checkScore);
    //add current points to current player's total
    array[currentPlayer].score += currentPoints;
    //update player list
    playerScoreBoard.innerHTML = '';
    updatePlayers(playerScoreArray, playerScoreBoard);
    //return to start of array after last player
    if(currentPlayer==(array.length-1)) {currentPlayer = 0;
    }else{
    currentPlayer ++;
    }
    currentPoints = 0;
    roundCount++;
    if (roundCount == array.length){
        roundText.innerHTML = `Round ${++round}:`;
        roundCount = 0;
    }

    gameMessage.innerHTML = `Hello ${array[currentPlayer].name}. Please roll the dice.`
    //if current player set red and bulleted.
    //add 'stay' button?
}

//rules function
function rules() {
    alert('these are the rules!');
}

function rollDice() {
    let currentHand = [];
    for(i=0; i<=5; i++) {
    let roll = (Math.floor(Math.random() * 6));
    document.getElementById(`die${[i]}`).src = dieArray[roll];
    currentHand.push(roll);
    }
    //put hand in order, to check for pairs
    let sortHand = currentHand.sort(function(a, b){return a-b});
    
    //evaluate rolled dice after each turn unless player farkles
    
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
    //function to evaluate hand for points
    function evalHand(hand) {
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
    //check for a sixkind and add points if true. If false, evaluate for straight; if false evaluate hand;
    evalSixKind(sortHand) ? true : evalStraight(sortHand) ? true : evalHand(sortHand);

    
    console.log(currentPoints);

    //if no points, next player, assign farkle (if player gets three farkles in a row, -1000 points)

    console.log(currentHand);
    currentHand = [];
}
//add "click the dice you want to keep and roll again, or"
//enter clicked die into current hand, only roll the number of die not clicked.


    //Count round 1. play screen first player, six die,  hit roll, all die produce random face.

/*     for (round = 1; playerScore.any < 10000; round++) {


    } */
    
    //tally kept die at start of new roll, and add to running total

    //if all six die produce points, keep going until keep points or lose points.
        
    //tally die at end of round and if > 0, add to player score



    //go to next player. repeat above.



    //repeat above until no more players.



    //Count another round.

    //if any player's score reaches 10000, show win screen.

//gameState3 

    //show final scores
    //so and so wins
    //play again?
















