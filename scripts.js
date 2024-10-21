const grid = document.querySelector('#grid');
let gridSize = 16; //default grid size

function createGrid(size) {
//create cells
    for (i = 0; i < size * size; i++) {
        const newCell = document.createElement('div');
        newCell.classList.add('cell-style');
        grid.appendChild(newCell);    
    }

//dynamically format cells to fit with 'grid' container (dynamic CSS)
    const cellSize = 100 / size;
    const cells = document.querySelectorAll('.cell-style');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.width = `${cellSize}%`;
        cells[i].style.height = `${cellSize}%`;

        //'hover' effect (change color)
        cells[i].addEventListener("mouseenter", function() {
            cells[i].classList.add('cell-color');
        })
    }
}

createGrid(gridSize);