//variables
let playerArray = [];

var currentPoints;
var currentPlayer;
var dieArray = ['one.png','two.png','three.png','four.png','five.png','six.png'];

const startScreen = document.getElementById("startScreen");
const playerEntry = document.getElementById("playerEntry");
const gameContent = document.getElementById("gameWrapper");
var addPlayers = document.getElementById("playerEntry2");
var playerScoreBoard = document.getElementById("gameContent2");
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

function done(array) {
    if (array.length == 1 || array.length == 0) {
        alert('this game requires two or more players');
        startGame();
        return;
    }
    for (i=0; i<array.length; i++) {
        playerScoreArray[i] = new Player(array[i], 0);
        playerScoreBoard.innerHTML += `<br>${playerScoreArray[i].name}: ${playerScoreArray[i].score}`;
        //playerScoreArray.push(player[i]);
        console.log(playerScoreArray[i]);//I'm not going to be able to manipulate the names easily, am I??
    }
    console.log(playerScoreBoard.innerHTML);
choosePlayer(array);
initializeDice();
    //Modal with player's name between each round?
}

function choosePlayer(array) {
    firstPlayer = (Math.floor(Math.random() * array.length));
    currentPlayer = firstPlayer;
    alert(`${array[firstPlayer]} is the first player!`);
}

function initializeDice() {
    playerEntry.style.display = "none";
    gameContent.style.display = "grid";
}

//loop through players each round
function updateRound() {
    //add current points to current player's total
    currentPlayer += currentPlayer;
    currentPoints = 0;
    //playerScoreArray[currentPlayer]
    //reset current points to zero.
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

    currentPoints = 0;
    
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
//add a 'stay' button.
//if no additional points on another roll, farkle.
    
//gameState3
    //play game, farkle or add points until loss
    //repeat for each player until 10000

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
















