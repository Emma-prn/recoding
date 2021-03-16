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
      else if (i == 16) {
        if (r < 0.6) {
          colorSquare = colors[0];
        }
      }
      else {
        if (r < 0.2) {
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
function pickColor(use_palette_1: boolean): string{
  let r = random();
  if (use_palette_1) {
    if (r < 0.7) {
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
    if (r < 0.2) {
      return colors[2];
    }
    else if (r < 0.6) {
      return colors[0];
    }
    else if (r < 0.8) {
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