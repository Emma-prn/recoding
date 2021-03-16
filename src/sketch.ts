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
	background(colors[4]); // Blanc
  randomSeed(params.Random_Seed);
  let lineSquare = params.Nb_Square_per_Line;
	for (let y = 0; y < height; y += height/lineSquare) {
    const use_palette_1 = random() < 0.8;
    for (let i = 0; i < lineSquare; i++) {
      let x = i*width/lineSquare;
      const r = random()
      let colorSquare;
      let oldColor;
      if (use_palette_1) {
        if (r < 0.7) {
          colorSquare = colors[4]; 
        }
        else if (r < 0.9) {
          colorSquare = colors[3];
        }
        else {
          colorSquare = colors[1];
        }
        oldColor = colorSquare;
      }
      else {
        if (r < 0.2) {
          colorSquare = colors[2];
        }
        else if (r < 0.6) {
          colorSquare = colors[0];
        }
        else if (r < 0.8) {
          colorSquare = colors[3];
        }
        else {
          colorSquare = colors[4];
        }
        oldColor = colorSquare;
      }
      if (i == 15) {
        if (r < 0.6) {
          colorSquare = colors[3];
        }
        oldColor = colorSquare;
      }
      else if (i == 16) {
        if (r < 0.6) {
          colorSquare = colors[0];
        }
        oldColor = colorSquare;
      }
      else {
        if (r < 0.8) {
          colorSquare = oldColor;
        }
        else {
          const colorIdx = colors.indexOf(colorSquare);
          const newIdx = (colorIdx + floor(random(1, colors.length-1))) % colors.length
          colorSquare = colors[newIdx];
        }
      }
      fill(colorSquare);
      stroke(colorSquare);
      rect(x,y,width/lineSquare,height/lineSquare);
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