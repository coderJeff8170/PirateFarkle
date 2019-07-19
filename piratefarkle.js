
//variables
let playerArray = [];

var currentPoints = 0;
var currentPlayer = 0;
var dieArray = ['one.png','two.png','three.png','four.png','five.png','six.png'];

const startScreen = document.getElementById("startScreen");
const playerEntry = document.getElementById("playerEntry");
const gameContent = document.getElementById("gameWrapper");

class Player {
    constructor(name, score){
        this.name = name;
        this.score = score;
    }
}

function startGame() {
    startScreen.style.display = "none";
    playerEntry.style.display = "block";
}

//how many players? If only one player, alert 'this game requires two or more players', reset input.
function addPlayer() {
    var x = document.getElementById("myText").value;
    playerArray.push(x);
    console.log(playerArray);
    //enable carriage returns to add players
    //reset field value after each addition.
    //show each player's name as it's entered, with score?
    //div for players, right sidebar (topbar for mobile), li created for each player,
    //bulleted only when player is active.
  }

function done(array) {
    var playerScoreArray = [];
    for (i=0; i<array.length; i++) {
        playerScoreArray[i] = new Player(array[i], 0);
        //playerScoreArray.push(player[i]);
        console.log(playerScoreArray[i]);
    }
    //go to game screen, random player, loop through players each round
    //starting with random player
    //Modal with player's name between each round.

    //randomizer determines first player to go.
    //result changes value of currentPlayer, this player starts game and then it's sequential.
    //need "activePlayer" function?
    playerEntry.style.display = "none";
    gameContent.style.display = "grid";
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

    //tally points

    let crntPnts = 0;
    
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
        crntPnts = crntPnts + 3000;
        return true;
    }
    //function to check for a straight (1, 2, 3, 4, 5, 6) give 1500 points
    function evalStraight(hand){
        for(i=0; i<hand.length-1; i++) {
            if (hand[i] != hand[i+1]+1) {
                return false;
            }
        }
        crntPnts = crntPnts + 1500;
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
            crntPnts = crntPnts + 1500;
            return;
        }
    //check for triplets
    if (hand[0] === hand[1] && hand[1] === hand[2] && hand[3] === hand[4] && hand[4] === hand[5]) {
        crntPnts = crntPnts + 2500;
        return;
    }

    //check hand for points
        if (ones.length === 3) {
            crntPnts = crntPnts + 300;
        } else {
            crntPnts = crntPnts + (ones.length * 100);
        }
        if (twos.length === 3) {
            crntPnts = crntPnts + 200;
        }
        if (threes.length === 3) {
            crntPnts = crntPnts + 300;
        }
        if (fours.length === 3) {
            crntPnts = crntPnts + 400;
        }
        if (fives.length === 3) {
            crntPnts = crntPnts + 500;
        } else {
            crntPnts = crntPnts + (fives.length * 50);
        }
        if (sixes.length === 3) {
            crntPnts = crntPnts + 600;
        }
    }
    //check for a sixkind and add points if true. If false, evaluate for straight; if false evaluate hand;
    evalSixKind(sortHand) ? true : evalStraight(sortHand) ? true : evalHand(sortHand);

    
    console.log(crntPnts);

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
















