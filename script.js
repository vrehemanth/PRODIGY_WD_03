let boxes = document.querySelectorAll(".box");
let turnBoxX = document.querySelector(".turn-box:nth-child(2)");
let turnBoxO = document.querySelector(".turn-box:nth-child(3)");

let currentTurn = "X";
let gameOver = false;

turnBoxX.classList.add("active");

boxes.forEach(box => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        if (!gameOver && box.innerHTML === "") {
            box.innerHTML = currentTurn;
            checkWin();
            checkDraw();
            switchTurn();
        }
    });
});

function switchTurn() {
    if (currentTurn === "X") {
        currentTurn = "O";
        turnBoxX.classList.remove("active");
        turnBoxO.classList.add("active");
        document.querySelector(".bg").style.left = "110px";
    } else {
        currentTurn = "X";
        turnBoxO.classList.remove("active");
        turnBoxX.classList.add("active");
        document.querySelector(".bg").style.left = "0";
    }
}

function checkWin() {
    let winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let boxA = boxes[a].innerHTML;
        let boxB = boxes[b].innerHTML;
        let boxC = boxes[c].innerHTML;

        if (boxA !== "" && boxA === boxB && boxA === boxC) {
            gameOver = true;
            document.querySelector("#results").innerHTML = currentTurn + " wins!";
            document.querySelector("#play-again").style.display = "inline";

            pattern.forEach(index => {
                boxes[index].style.backgroundColor = "#08D9D6";
                boxes[index].style.color = "#000";
            });
            break; // Exit the loop once a winner is found
        }
    }
}

function checkDraw() {
    if (!gameOver) {
        let draw = true;
        boxes.forEach(box => {
            if (box.innerHTML === "") draw = false;
        });

        if (draw) {
            gameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    gameOver = false;
    currentTurn = "X";
    turnBoxO.classList.remove("active");
    turnBoxX.classList.add("active");
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.removeProperty("background-color");
        box.style.color = "#fff";
    });
});
