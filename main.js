var currentPlayer = 'X';

function changePlayer() {
  if(currentPlayer === 'X') {
    currentPlayer = 'O';  
  } else {
    currentPlayer = 'X';
  }

  document.getElementById("turn-tracker").innerHTML = "Player " + currentPlayer + "'s turn";
  // `Player ${currentPlayer}'s turn`
}

function selectBox(event) {

  var squareNode = event.target;

  // checks to see if square already selected
  if( squareNode.innerHTML === ""){
    squareNode.style.backgroundColor = "#FFF0F5"

    //"any DOM node".innerHTML = "blah";
    // in here the DOM node is event.target

    squareNode.innerHTML = currentPlayer;
  
    // let isGameOver = checkWinConditions();

    // // this setTimeout is to allow for the setTimeout in checkWinConditions to run
    // // before changing the current player.  Otherwise, the alert will say the wrong player
    // // won
    // // setTimeout(function() {
    // //   changePlayer();
    // // }, 10)

    // console.log(isGameOver);

    // if(!isGameOver) {
    //   changePlayer();
    //   chooseRandomSquare();
    // }
  }
}


function checkWinConditions() {

  // when this is pulled out of this function for code reusability, it breaks the
  // functionality -- win conditions aren't met 
  // tried with both let and var it made no differences
  // WHY?!
  let topLeft =  document.getElementById("top-left").innerHTML;
  let topMiddle = document.getElementById("top-middle").innerHTML;
  let topRight = document.getElementById("top-right").innerHTML;
  let middleLeft = document.getElementById("middle-left").innerHTML;
  let middleMiddle = document.getElementById("middle-middle").innerHTML;
  let middleRight = document.getElementById("middle-right").innerHTML;
  let bottomLeft = document.getElementById("bottom-left").innerHTML;
  let bottomMiddle = document.getElementById("bottom-middle").innerHTML;
  let bottomRight = document.getElementById("bottom-right").innerHTML;

  // if statement covers win conditions, else if covers draw conditions
  if((topLeft !== "" && topLeft === topMiddle && topMiddle === topRight )|| // top row win
    (middleLeft !== "" && middleLeft === middleMiddle && middleMiddle === middleRight) || // middle row win
    (bottomLeft !== "" && bottomLeft === bottomMiddle && bottomMiddle === bottomRight) || // borrom row win
    (topLeft !== ""  && topLeft ===middleLeft && middleLeft === bottomLeft) || // left columnn win
    (topMiddle !== "" && topMiddle === middleMiddle && middleMiddle === bottomMiddle) || // middle column win
    (topRight !== "" && topRight === middleRight && middleRight === bottomRight) || // right column win
    (topLeft!== "" && topLeft === middleMiddle && middleMiddle === bottomRight) || // top-left-down diagonal win
    (topRight !== "" && topRight === middleMiddle && middleMiddle === bottomLeft) // top-right-down diagonal win
    ){
      // this fixes problem where alert shows before play registers on page
      setTimeout(function() {
        window.alert(`${currentPlayer} wins`);
      }, 9)

      return true;
     //window.alert(`${currentPlayer} wins`);
  } else if(topLeft !== "" && topMiddle !== "" && topRight !== "" 
    && middleLeft !== "" && middleMiddle !== "" && middleRight !== ""
    && bottomLeft !== "" && bottomMiddle !== "" && bottomRight !== ""){
      setTimeout(function() {
        window.alert("It's a tie!");
      }, 9)

      return true;
  }

  return false;
}

function chooseRandomSquare(){

  //const emptySquares = squareList.filter(square => square.innerHTML === "")
  // this doesn't work becuase squareList is not an actual array.


  // array of node objects.
  const emptySquares = [];

  squareList.forEach(function (square) {
    if(square.innerHTML === ""){
      emptySquares.push(square);
    }
  })

  console.log(emptySquares, "empty squares")  // lists current empty squares

  // selects random index to use to pick square from empty squares
  const index = Math.floor(Math.random() * emptySquares.length);

  console.log(index);  // selects a random index 

  var selectedSquare = emptySquares[index]; 

  console.log(typeof selectedSquare);
  console.log(selectedSquare);

  console.log(selectedSquare.id);

  selectedSquare.innerHTML = currentPlayer;

  selectedSquare.style.backgroundColor = "#FFF0F5";
  
}

function play (event) {
  selectBox(event);

  let isGameOver = checkWinConditions();

  let single = document.getElementById("single");
  let multi = document.getElementById("multi");

  single.disabled = true;
  multi.disabled = true;


  // the way this is set up allows you to change the mode (single v multi) mid-game
  // I am not sure how to prevent the user from chanigng mid game

  // Play against computer
  if(single.checked == true){
    
    if(!isGameOver) {
      changePlayer();

      setTimeout(function() {
        chooseRandomSquare();
        changePlayer();
      }, 500)
    }
  } else {
    // play against your friend
    if(!isGameOver) {
      changePlayer();
    }
  }
}

let squareList = document.querySelectorAll("td");

squareList.forEach(function (square) {
  square.onclick = play;
})



// function playSingle (event) {
//   selectBox(event);

//   let isGameOver = checkWinConditions();

//   if(!isGameOver) {
//     changePlayer();

//     setTimeout(function() {
//       chooseRandomSquare();
//       changePlayer();
//     }, 500)
//   }
// }

// function playMulti (event) {
//   selectBox(event);

//   let isGameOver = checkWinConditions();

//   if(!isGameOver) {
//     changePlayer();

//   }
// }

// let squareList = document.querySelectorAll("td");

// let single = document.getElementById("single");
// let multi = document.getElementById("multi");

// if(single.checked === true){
//     squareList.forEach(function (square) {
//       square.onclick = playSingle;
//     })
// } else if (multi.checked === true){
//   squareList.forEach(function (square) {
//     square.onclick = playMulti;
//   })
// }

  



var startOver = document.getElementById("restart");

startOver.onclick = function () {

  changePlayer();

  // changes the squares background color to white
  squareList.forEach(function (square) {
    square.style.backgroundColor = "white";
    square.innerHTML = "";
  })
  single.disabled = false;
  multi.disabled = false;

}