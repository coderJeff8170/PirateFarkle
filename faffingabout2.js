

//The grand finale, except for styling...
//so, in order to make each die clickable, we're going to have to add an event listener?
//we're going to have to add a status to each die, active or inactive
//you can click on or off the die until you roll or stay
//when rolled again, active die relinquish their points, and inactive die become permanently inactive..
//there will have to be a second, third, etc array for each subsequent roll in same round
//this array will only contain the rolls of each active die, and will be evaluated for points


//ok so the first thing we do is figure out the new way to get the first array of rolls
//which removes the random function from rollDice and puts it in the die class
//we're going to have to link the dice in the interface with the dice in the array object
//when making active and when showing the rolled dice... we may have to generate a face a la alberto, then.
//then we're going to have to use a click to toggle activate/deactivate each die
//and add css to grey out the deactivated....

var dieImageArray = ['one.png','two.png','three.png','four.png','five.png','six.png'];
//Die constructor w/roll method
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

let initialDieArray = [];
//initial die object array creator
//needs inside a function
for (i=0; i<=5; i++) {
initialDieArray[i] = new Die(`die${i}`, 'one.png');
}

// on click, you can assign the instance to be false.
// toggle could be just assign opposite boolean, like if(clicked) {dieArray[i].active = !dieArray[i].active}
// so every time clicked it would be opposite it's own value
// when false, it will appear faded
initialDieArray[3].active = false;
initialDieArray[5].active = false;

let activeDieArray = [];

//makes a new array featuring only active die from old array of die objects
function makeActiveDieArray (array1, array2) {
    //array2 = [];//runs before the loop is finished! needs to be assigned outside this function
    //and inside the one that calls it..
    for (i=0; i<array1.length; i++) {
        if (array1[i].active === true) {
        array2.push(array1[i]);
        }
    }
}

//calls the above on initial and creates active
makeActiveDieArray(initialDieArray, activeDieArray);

//now roll for values...
let valueArray = [];
//so every time the dice are rolled, the array of active die objects is entered...(they're all active at first)
//why not just roll the active ones...




function getNewHand (array) {
  for (i=0; i<array.length; i++) {
    array[i].value = array[i].rollDie();
    valueArray.push(array[i].value);
    //document.getElementById(`die${[i]}`).src = array[i].value;
  }
  
}

getNewHand(activeDieArray);
//console.log(initialDieArray);
//console.log(activeDieArray);
//console.log(valueArray);

//activeDieArray[4].value = 2 // interesting - cannot set value at this new array as it's undefined..
//initialDieArray[4].value = 2; // works
//console.log(initialDieArray);
//console.log(activeDieArray);
console.log(initialDieArray);
initialDieArray.rollDie;
console.log(initialDieArray);
