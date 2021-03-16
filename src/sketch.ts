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
	background('#dcd0c0'); // Blanc
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
          colorSquare = '#dcd0c0'; 
        }
        else if (r < 0.9) {
          colorSquare = '#130e12';
        }
        else {
          colorSquare = '#c0231a';
        }
        oldColor = colorSquare;
      }
      else {
        if (r < 0.2) {
          colorSquare = '#3a5bdc';
        }
        else if (r < 0.6) {
          colorSquare = '#c4a41d';
        }
        else if (r < 0.8) {
          colorSquare = '#130e12';
        }
        else {
          colorSquare = '#dcd0c0';
        }
        oldColor = colorSquare;
      }
      if (i == 15) {
        colorSquare = '#130e12';
        oldColor = colorSquare;
      }
      else if (i == 16) {
        colorSquare = '#c4a41d';
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