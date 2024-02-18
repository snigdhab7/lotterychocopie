import kaboom from "kaboom"
// Initialize Kaboom
// Initialize Kaboom
kaboom({
    width: 800,
    height: 800, // Make the canvas square for a 10x10 grid
    scale: 1,
    background: [212, 110, 179],
});

// Load transparent shape sprites
loadSprite("bean", "sprites/bean.png");
loadSprite("bobo", "sprites/bobo.png");
loadSprite("btfly", "sprites/btfly.png");
loadSprite("dino", "sprites/dino.png");
loadSprite("ghosty", "sprites/ghosty.png");
loadSprite("mark", "sprites/mark.png");
loadSprite("mushroom", "sprites/mushroom.png");
loadSprite("pineapple", "sprites/pineapple.png");
loadSprite("sun", "sprites/sun.png");
loadSprite("watermelon", "sprites/watermelon.png");
loadSprite("nutella", "sprites/nutella.png");
loadSprite("chocopie", "sprites/chocopie.png");
loadSprite("cookie", "sprites/cookie.png");
loadSprite("cheesecake", "sprites/cheesecake.png");
loadSprite("cupcake", "sprites/cupcake.png");
loadSprite("icecream", "sprites/icecream.png");
// Shape, color, and alignment options
const shapes = ["nutella","chocopie","cheesecake","cookie","cupcake","icecream"];
const colors = {
    red: rgb(255, 0, 0),
    blue: rgb(0, 0, 255),
    green: rgb(0, 255, 0),
    yellow: rgb(255, 255, 0),
};

const gridSize = 5;
const cellSize = 600 / gridSize; // Assuming canvas width and height of 800

const userSelection = {
    sprite: "nutella", // Example sprite
    color: "blue", // Example color
};

function getColorName(colorObj) {
    for (const [name, rgbValue] of Object.entries(colors)) {
        if (colorObj.r === rgbValue.r && colorObj.g === rgbValue.g && colorObj.b === rgbValue.b) {
            return name; // This returns 'red', 'blue', 'green', or 'yellow'
        }
    }
    return null; // If the color doesn't match any predefined color
}

// Helper function to check for win condition
// Helper function to check for win condition
function checkForWin() {
    const cells = get("cell"); // Retrieve all cells
    for (const cell of cells) {
		console.log("cell",cell.name," ",userSelection.sprite," ",cell.color," ",colors[userSelection.color] )
        // Check if this cell has the user's selected shape and color
        if ((cell.name)==(userSelection.sprite)) {
            const cellColor = getColorName(cell.color);
		console.log("cell3333",cell.name," ",cell.color," ",cellColor," ",userSelection.color )
            if (colorEquals(cell.color, colors[userSelection.color])) {
				addKaboom(cell.pos)
				
                return true;
            }
        }
    }
    return false;
}

// Helper function to compare Kaboom.js color arrays
function colorEquals(colorA, colorB) {
    return colorA.r === colorB.r && colorA.g === colorB.g && colorA.b === colorB.b && colorA.a === colorB.a;
}


// Function to generate a single grid cell
function generateCell(x, y, shape, chosenColor) {
	const theSprite = shape;
    add([
        sprite(shape),
        pos(100 + x * cellSize, 100 + y * cellSize),  // Position at the top-left corner of the grid cell
        //scale(0.1), // Scale down the sprite to fit in the cell
        color(colors[chosenColor]), // Apply color transformation
        anchor("topleft"), // Set origin to top-left for correct positioning
        "cell", // Tag this game object as "cell" for potential future use
		shape,
		{ name: shape },
    ]);
}


// Function to generate the entire grid
function generateGrid() {
	
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const shape = choose(shapes);
            const chosenColor = choose(Object.keys(colors));
            generateCell(x, y, shape, chosenColor);
        }
    }
}

// Main game scene
scene("main", () => {
    generateGrid();
	
    // After grid generation, check for win condition
    if (checkForWin()) {
        add([
            text("You Win!", 32),
            pos(width() / 2, height() / 2),
            anchor("center"),
        ]);
		
    } else {
        add([
            text("You Lose!", 32),
            pos(width() / 2, height() / 2),
            anchor("center"),
        ]);
    
	}
});


// Start the game
go("main");
