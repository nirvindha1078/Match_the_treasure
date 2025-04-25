
const grid=document.querySelector(".grid")!;
const feedBack=document.querySelector("#feedback")!;
const attemptNum=document.querySelector("#attempts")!;
const restartButton=document.querySelector("#restart")!;

let treasures:{row:number, col:number}[]=[];
let attempts=0;
let gameOver=false;

function randomNum():void{
    treasures=[
        {row:Math.floor(Math.random()*3), col:Math.floor(Math.random()*3)},
        {row:Math.floor(Math.random()*3), col:Math.floor(Math.random()*3)}
    ];
    while(treasures[0].row === treasures[1].row && treasures[0].col === treasures[1].col){
        treasures[1]={row:Math.floor(Math.random()*3),col:Math.floor(Math.random())};
    }
}

function createGrid():void{
    grid.innerHTML="";
    for(let row=0;row<3;row++){
        for(let col=0;col<3;col++){
            const cell=document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row=row.toString();
            cell.dataset.col=col.toString();

            if(!gameOver){
                cell.addEventListener('click',()=>handleClick(row,col,cell));
            }
            grid.appendChild(cell);

        }
    }
}

function handleClick(row:number, col:number, cell:HTMLElement):void{

    if(cell.classList.contains('clicked')) return;

    attempts++;
    attemptNum.textContent= `Number of Attempts : ${attempts}`;

    cell.classList.add('clicked');

    const found=treasures.some(treasures => treasures.row===row && treasures.col===col);

    if(found){
        cell.classList.add('treasure');
        feedBack.textContent='You found the treasure!';
        treasures=treasures.filter(treasures => !(treasures.row === row && treasures.col === col));

        if(treasures.length === 0){
            feedBack.textContent='You found all the treasure! Restart to play again.';
            document.getElementById('grid-heading')!.innerHTML="You Won!!";
            gameOver=true;
            disableAllCells();
        }
    }else{
        feedBack.textContent='Try again!';
    }
}

function disableAllCells():void{
    const cells=document.querySelectorAll('.cell') as NodeListOf<HTMLElement>;
    cells.forEach((cell)=>{
        cell.style.pointerEvents='none';
    });
}

function restartGame():void{
    attempts=0;
    attemptNum.textContent='Number of Attempts : 0';
    feedBack.textContent='Find the Treasure!';
    document.getElementById('grid-heading')!.innerHTML="Click any cell";
    const cells=document.querySelectorAll('.cell') as NodeListOf<HTMLElement>;
    cells.forEach((cell)=>{
        cell.style.pointerEvents='auto';
    });
    randomNum();
    createGrid();
}

restartButton.addEventListener('click',restartGame);

randomNum();
createGrid();