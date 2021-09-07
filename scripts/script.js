const body = document.body
const div = document.createElement('div');
const gridContainer = document.getElementById('grid-container');
div.className = 'main-grid';
gridContainer.appendChild(div);

let mainGridDimension = 512; // Setting the main grid dimension (in px)

// Getting the grid size from the slider
let gridInputElem = document.querySelector('input[type="range"]');
let rangeValue = function(){
  let newValue = gridInputElem.value;
  let target = document.querySelector('.value');
//   target.innerHTML = newValue;
  target.textContent = newValue + ' x ' + newValue;
}

// color = document.getElementById('colorpicker').value;

gridInputElem.addEventListener("input", rangeValue);
N = document.getElementById('myRange').value;

gridInputElem.onchange = function() {
    N = gridInputElem.value;
    clearGrid();
    // resetGrid(color);
}

// Clear grid 
function clearGrid() {
    color = document.getElementById('colorpicker').value;
    let mainGrid = document.querySelector('.main-grid');
    while (mainGrid.firstChild) {
        mainGrid.removeChild(mainGrid.firstChild);
    }
    createGrid();
    resetGrid(color);
}

// Create grid using slider value

function createGrid() {
    gridContainer.appendChild(div);
    elem = document.querySelectorAll('.element-grid');
    
    let N = gridInputElem.value;
    
    let elementGridPercentage = 100/N;

    div.style.width = mainGridDimension+'px';
    div.style.height = mainGridDimension+'px';

    for (let i = 0; i < N*N; i++) {
        let elementDiv = document.createElement('div');
        elementDiv.className = 'element-grid';
        div.appendChild(elementDiv);
        elementDiv.style.width = elementGridPercentage+'\%';
        elementDiv.style.height = elementGridPercentage+'\%';
    }
}

// Reset the grid and define hover behaviour
function resetGrid(color) {
    elementDiv = document.querySelectorAll('.element-grid');
    elementDiv.forEach(element => {
        element.addEventListener('mouseenter', hoverin);
        element.addEventListener('mouseleave', hoverout);
        function hoverin() {element.style.backgroundColor = color;}
        function hoverout() {element.style.backgroundColor = color;}
    });
}

// Set the default color to black
function blackGrid() {
    color = 'black';
    resetGrid(color);
}

// Set default color to background color to mimic erasing
function eraser() {
    color = '#ebebeb';
    resetGrid(color);
}

// Function to generate a random color
function randomColor() {
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}

// Function to reset grid by calling on randomColor on every mouseover
function rainbowGrid() {
    elementDiv = document.querySelectorAll('.element-grid');
    elementDiv.forEach(element => {
        element.addEventListener('mouseenter', hoverin);
        element.addEventListener('mouseleave', hoverout);
        function hoverin() {element.style.backgroundColor = randomColor();}
        function hoverout() {element.style.backgroundColor = randomColor();}
    });
}

// Get the latest value from the color picker and reset grid to use that as filler. 
// Also set the background of the button to that value
let color_picker = document.getElementById("colorpicker");
let color_picker_wrapper = document.getElementById("color-picker-wrapper");
color_picker.onchange = function() {
	color_picker_wrapper.style.backgroundColor = color_picker.value;
    resetGrid(color_picker.value);    
}
color_picker_wrapper.style.backgroundColor = color_picker.value;

// On first run
createGrid();
resetGrid('black');
