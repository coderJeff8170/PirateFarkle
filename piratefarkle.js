
//variables

//an array of 'name: points' objects
let players = [];

var currentPoints = 0;
var currentPlayer = 0;
var dieArray = ['one.png','two.png','three.png','four.png','five.png','six.png'];



const startScreen = document.getElementById("startScreen");
const gameContent = document.getElementById("gameContent");

//gameState0/start screen/global functions
    //reset
//enterPlayers should be a modal window, or a new div?
    function enterPlayers() {

    }
    //rules function
    function rules() {
        alert('these are the rules!');
    }

//gameState1
    function startGame() {
        startScreen.style.display = "none";
        gameContent.style.display = "inline-block";
    }
        //how many players? If only one player, alert 'this game requires two or more players', reset input.
        //player 1 name, set score to 0, add to object or array of players
        //repeat until number of players set
        //play button
//six random dice roll function called every time button is pushed
//and show a corresponding face in the html for each dice/roll.

//gameState2
    //roll high score to determine first player to go.
    //result of high score changes value of currentPlayer, this player starts game and then it's sequential.


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
    
    //function to check for a straight and add points if true.
    function evalStraight(hand){
        for(i=0; i<hand.length-1; i++) {
            if (hand[i] != hand[i+1]) {
                return false;
            }
        }
        crntPnts = crntPnts + 1000;
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
    
        if (hand[0] === hand[1] && hand[2] === hand[3] && hand[4] === hand[5]) {
            crntPnts = crntPnts + 500;
            return;
        }
    
        if (ones.length === 3) {
            crntPnts = crntPnts + 1000;
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
    //check for a straight and add points if true. If false, evaluate hand for points;
    evalStraight(sortHand) ? true : evalHand(sortHand);

    
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
















