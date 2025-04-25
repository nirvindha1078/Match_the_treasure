var grid = document.querySelector(".grid");
var feedBack = document.querySelector("#feedback");
var attemptNum = document.querySelector("#attempts");
var restartButton = document.querySelector("#restart");
var treasures = [];
var attempts = 0;
var gameOver = false;
function randomNum() {
    treasures = [
        { row: Math.floor(Math.random() * 3), col: Math.floor(Math.random() * 3) },
        { row: Math.floor(Math.random() * 3), col: Math.floor(Math.random() * 3) }
    ];
    while (treasures[0].row === treasures[1].row && treasures[0].col === treasures[1].col) {
        treasures[1] = { row: Math.floor(Math.random() * 3), col: Math.floor(Math.random()) };
    }
}
function createGrid() {
    grid.innerHTML = "";
    var _loop_1 = function (row) {
        var _loop_2 = function (col) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row.toString();
            cell.dataset.col = col.toString();
            if (!gameOver) {
                cell.addEventListener('click', function () { return handleClick(row, col, cell); });
            }
            grid.appendChild(cell);
        };
        for (var col = 0; col < 3; col++) {
            _loop_2(col);
        }
    };
    for (var row = 0; row < 3; row++) {
        _loop_1(row);
    }
}
function handleClick(row, col, cell) {
    if (cell.classList.contains('clicked'))
        return;
    attempts++;
    attemptNum.textContent = "Number of Attempts : ".concat(attempts);
    cell.classList.add('clicked');
    var found = treasures.some(function (treasures) { return treasures.row === row && treasures.col === col; });
    if (found) {
        cell.classList.add('treasure');
        feedBack.textContent = 'You found the treasure!';
        treasures = treasures.filter(function (treasures) { return !(treasures.row === row && treasures.col === col); });
        if (treasures.length === 0) {
            feedBack.textContent = 'You found all the treasure! Restart to play again.';
            document.getElementById('grid-heading').innerHTML = "You Won!!";
            gameOver = true;
            disableAllCells();
        }
    }
    else {
        feedBack.textContent = 'Try again!';
    }
}
function disableAllCells() {
    var cells = document.querySelectorAll('.cell');
    cells.forEach(function (cell) {
        cell.style.pointerEvents = 'none';
    });
}
function restartGame() {
    attempts = 0;
    attemptNum.textContent = 'Number of Attempts : 0';
    feedBack.textContent = 'Find the Treasure!';
    document.getElementById('grid-heading').innerHTML = "Click any cell";
    var cells = document.querySelectorAll('.cell');
    cells.forEach(function (cell) {
        cell.style.pointerEvents = 'auto';
    });
    randomNum();
    createGrid();
}
restartButton.addEventListener('click', restartGame);
randomNum();
createGrid();
