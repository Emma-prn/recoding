// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Nb_Square_per_Line : 39,
    Random_Seed: 0,
    Download_Image: () => save(),
}
gui.add(params,"Nb_Square_per_Line",5,39,1)
gui.add(params,"Random_Seed",0,10,1)
gui.add(params, "Download_Image")

interface Square {
  x: number,
  y: number,
  col: string,
}

let modified_squares: Square[] = [];

// -------------------
//       Drawing
// -------------------

const colors = [
  '#c4a41d', // Jaune
  '#c0231a', // Rouge
  '#3a5bdc', // Bleue
  '#130e12', // Noir
  '#dcd0c0', // Blanc
]

function draw() {
	background(colors[4]);
  randomSeed(params.Random_Seed);
  let lineSquare = params.Nb_Square_per_Line;
	for (let y = 0; y < height; y += height/lineSquare) {
    const use_palette_1 = random() < 0.8;
    let colorSquare: string;
    colorSquare = pickColor(use_palette_1);
    for (let i = 0; i < lineSquare; i++) {
      if (random() < 0.05) {
        colorSquare = pickColor(use_palette_1);
      }
      let x = i*width/lineSquare;
      const r = random()
      if (i == 15) {
        if (r < 0.6) {
          colorSquare = colors[3];
        }
      }
      else if (i == 16 || i == 17 || i == 18) {
        if (r < 0.8) {
          colorSquare = colors[0];
        }
      }
      else if (i == 30) {
        if (r < 0.15) {
          colorSquare = colors[1];
        }
      }
      else {
        if (r < 0.05) {
          const colorIdx = colors.indexOf(colorSquare);
          const newIdx = (colorIdx + floor(random(1, colors.length-1))) % colors.length
          colorSquare = colors[newIdx];
        }
      }
      if (i >= 16 && colorSquare == colors[0] && r > 0.95) {
        fill(colors[3])
        stroke(colors[3])
      }
      else {
        fill(colorSquare)
        stroke(colorSquare);
      }
      rect(x,y,width/lineSquare,height/lineSquare);
		}
	}
  modified_squares.forEach(function(sq) {
    fill(sq.col);
    stroke(sq.col);
    rect(sq.x,sq.y,width/lineSquare,height/lineSquare);
  },this);
}

function pickColor(use_palette_1: boolean): string{
  let r = random();
  if (use_palette_1) {
    if (r < 0.8) {
      return colors[4]; 
    }
    else if (r < 0.9) {
      return colors[3];
    }
    else {
      return colors[1];
    }
  }
  else {
    if (r < 0.15) {
      return colors[2];
    }
    else if (r < 0.85) {
      return colors[0];
    }
    else if (r < 0.95) {
      return colors[3];
    }
    else {
      return colors[4];
    }
  }
}
// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}

function keyPressed() {
  if (keyCode === 107 && params.Nb_Square_per_Line < 40) {
    params.Nb_Square_per_Line++;
  }
  else if (keyCode === 109 && params.Nb_Square_per_Line > 5) {
    params.Nb_Square_per_Line--; 
  }
  else if(keyCode === 32){
    params.Random_Seed++;
  }
  return false;
}

function mousePressed() {
  const w = width / params.Nb_Square_per_Line;
  const x = floor(mouseX / w) * w;
  const y = floor(mouseY / w) * w;
  let newSquare = {x: x, y: y, col: '#130e12'};
  modified_squares.push(newSquare);
  console.log(modified_squares);
}