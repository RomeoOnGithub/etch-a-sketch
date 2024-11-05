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
        
        //(counter-error) 100 x 100 limit
        if (selectedGridSize > 100) {
            alert("Grid size cannot be larger than 100. Please enter a smaller value.");
            return;
        }

        //select grid size
        gridSize = selectedGridSize;
        clearGrid();
        createGrid(gridSize);
    });

//create cells
    function createGrid(size) {
        let currentColorMode = 'black';

        for (i = 0; i < size * size; i++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell-style');
            newCell.dataset.opacityLevel = '0';
            newCell.dataset.increasing = 'true'; 
            grid.appendChild(newCell);
        }

        //🔄 refresh option
        document.getElementById('refresh').addEventListener("click", function () {
            clearGrid();
            createGrid(gridSize);
        });

    //format cells
        const cellSize = 100 / size;
        const cells = document.querySelectorAll('.cell-style');
        
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.width = `${cellSize}%`;
            cells[i].style.height = `${cellSize}%`;

            //'hover' effect (change color)
            cells[i].addEventListener("mouseenter", function() {
                cells[i].classList.remove('black-hover', 'randomized-RGB', 'selected-color', 'white', 'gradual-opacity');

                if (currentColorMode === 'black') {
                    cells[i].classList.add('black-hover');
                } else if (currentColorMode === 'random') {
                    cells[i].style.setProperty('--randomValueSet', fetchRandomColor());
                    cells[i].classList.add('randomized-RGB');
                } else if (currentColorMode === 'custom') {
                    cells[i].classList.add('selected-color');
                } else if (currentColorMode === 'opacity') {
                    updateOpacity(cells[i]);              
                } else if (currentColorMode === 'white') {
                    cells[i].classList.add('white');
                }
            });
        }            
        
            document.getElementById('white').addEventListener("click", function() {
                currentColorMode = 'white';
            });

            //Default (black)
            document.getElementById('black').addEventListener("click", function () {
                currentColorMode = 'black';
            });

            //Select Color
            document.getElementById('Color Selector').addEventListener("click", function () {
                currentColorMode = 'custom';
            });

            //random RGB 
            document.getElementById('Randomized RGB').addEventListener("click", function() {
                currentColorMode = 'random';
            });

            //10% opacity
            document.getElementById('10% Opacity').addEventListener("click", function() {
                currentColorMode = 'opacity';
            });

            function updateOpacity(cell) {
                let opacityLevel = parseInt(cell.dataset.opacityLevel);
                let isIncreasing = cell.dataset.increasing === 'true';
                if (isIncreasing) {
                    opacityLevel += 1;
                    if (opacityLevel >= 10) {
                        isIncreasing = false;
                    }
                } else {
                    opacityLevel -= 1;
                    if (opacityLevel <= 0) {
                        isIncreasing = true;
                    }
                }
                
                cell.dataset.opacityLevel = opacityLevel.toString();
                cell.dataset.increasing = isIncreasing.toString();
                cell.classList.add('gradual-opacity');
                cell.style.setProperty('--opacityLevel', opacityLevel / 10);
            }
        }

function fetchRandomColor() {
//fetch value sets (RGB color code)
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

//generate grid
createGrid(gridSize);

