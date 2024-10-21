const grid = document.querySelector('#grid');

//grid size
    //default grid size
    let gridSize = 16;
    
    //clear the existing grid
    function clearGrid() {
        const grid = document.getElementById('grid');
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
    }  

    //selected grid size
    document.getElementById('gridSizeSelector').addEventListener("click", function() {
        let selectedGridSize = Number(window.prompt("enter a value to determine the grid size (max. 100)"));

        gridSize = selectedGridSize;
        clearGrid();
        createGrid(gridSize);
    });

//create cells
    function createGrid(size) {
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