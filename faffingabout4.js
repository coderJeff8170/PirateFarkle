//onclick, call the function on the div clicked on... event listener?
//can you call 'this'? nope

//how about once you've clicked the die you don't want, and the style changes
//you could get all elements in that div by tag name, check them for specific style,
//and then make inactive the objects in the dieArray that correspond.



/* function dieAppearance() {
    var x = document.getElementsByClassName("die");
    for(i=0; i<x.length; i++){
        if (x.style.opacity === 1) {
            x.style.opacity = 0.5;
          } else {
            x.style.opacity = 1;
          }
    }
  } */
  let myDice = document.getElementsByClassName("die");
  
  for(i=0; i<x.length; i++){
  myDice[i].addEventlistener("click", dieAppearance);
    }

  function dieAppearance(die) {
    let x = document.getElementById(die);
        if (x.style.opacity === 1) {
            x.style.opacity = 0.5;
          } else {
            x.style.opacity = 1;
          }
  }