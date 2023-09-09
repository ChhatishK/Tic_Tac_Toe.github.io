const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winnigPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//let's create a function to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "0";
    } else {
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winnigPositions.forEach((position) => {
        // all 3 boxes should be non-empty and exactly same in value
        if ((gameGrid[position[0]] === "X" && gameGrid[position[1]] === "X" && gameGrid[position[2]] === "X")
        || (gameGrid[position[0]] === "0" && gameGrid[position[1]] === "0" && gameGrid[position[2]] ==="0")) {
            
            if (gameGrid[position[1]] === "X") {
                answer = "X";
            } else {
                answer = "0";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // when there is no winner

    let fillCount = 0;
    gameGrid.forEach(box => {
        if (box !== "") {
            fillCount++;
        }
    });

    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied !"
        newGameBtn.classList.add('active')
    }
}

function handleClick(index) {
    
    if (gameGrid[index] == "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none";
        swapTurn();
        //check the win
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);
