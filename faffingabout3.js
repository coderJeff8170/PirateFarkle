

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

var dieImageArray = ['one.png','two.png','three.png','four.png','five.png','six.png'];//added
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
}//added

//when a new game is started, an array of die objects must be created - i.e. put this in a function.
//think you only need one die array that's global for the whole game, and iterable/changeable
//by game functions....
let dieArray = [];
//initial die object array creator - once created it can be manipulated. there's no need to make another one
//needs inside a function, an IIFE?

(function(){
  for (i=0; i<=5; i++) {
      dieArray[i] = new Die(`die${i}`, 'one.png');
      }
})();

//WORK UP A JS FIDDLE TO PLAY WITH ACTIVATING AND DEACTIVATING DIVS.


// on click, you can assign the instance to be false.
// toggle could be just assign opposite boolean, like if(clicked) {dieArray[i].active = !dieArray[i].active}
// so every time clicked it would be opposite it's own value
// when false, it will appear faded
//dieArray[3].active = false;
//dieArray[5].active = false;

//now roll for values...
//let valueArray = [];
//so every time the dice are rolled, the array of active die objects is entered...(they're all active at first)
//why not just roll the active ones...
//console.log(dieArray);

/* function getNewHand (array1, array2) {
  for (i=0; i<array1.length; i++) {
    if (array1[i].active === true) {
    array1[i].value = array1[i].rollDie();
    console.log(array1[i].value);
    array2.push(array1[i].value);
    }
    return array2;
    //document.getElementById(`die${[i]}`).src = array[i].value;
  }
  console.log(array2);
} */


//let p = getNewHand(dieArray, valueArray);
//console.log(p);//why undefined??

//makes class name inactive/inverts on click, inverts on hover
var dieDiv = document.getElementById("die");
var dieClass = dieDiv.getElementsByClassName("die");
for (var i = 0; i < dieClass.length; i++) {
  dieClass[i].addEventListener("click", function() {
  if(this.className != "die inactive") {
  this.className = "die inactive";
  }else{
  this.className = "die";
  }
  });
}
//it's important to remember that elements you want to iterate over inside another element
//must be selected by the outer element's ID, and THEN by the individual similar elements
//works on lists, or groups of similar elements.





//when you hit 'stay', it should first call a function that sets all die with class 'die inactive'
//to have active === false

function processHand(dieInterfaces, dieObjects) {
  for(i=0; i<dieInterfaces.length; i++) {
    if(dieInterfaces[i].className === 'die inactive') {
      dieObjects[i].active = false;
    }else{
      dieObjects[i].active = true;
    }
  }
  getNewHand(dieObjects);
}

function getNewHand (array) {
  let newHand = [];
  for (i=0; i<array.length; i++) {
    if (array[i].active === true) {
    array[i].value = array[i].rollDie();
    newHand.push(array[i].value);
    document.getElementById(`die${[i]}`).src = dieImageArray[array[i].value];
    }
  }
  console.log(newHand);
  return newHand;
}


//let p = getNewHand(dieArray);
//let z = getNewHand(dieArray);//every time you call for p
//console.log(p);
//console.log(z);//each time you call getNewHand, it's gonna be different.
//Oh my fucking god.
//I did it.



