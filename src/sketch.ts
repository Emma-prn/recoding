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
]
function draw() {
	background('#dcd0c0'); // Blanc
  randomSeed(params.Random_Seed);
  let lineSquare = params.Nb_Square_per_Line;
	for (var y = 0; y < height; y += height/lineSquare) {
    let colorLine = [];
    let indexColor = 0;
    let nbColors = Math.floor((random() * 2) +2);
    for (let i = 0; i < nbColors; i++) {
      colorLine[i] = random(colors);
    }
    colorLine.push('#dcd0c0');
    for (var x = 0; x < width; x += width/lineSquare) {
      const r = random()
      let colorSquare;
      if (r < 0.7) {
        colorSquare = '#dcd0c0' // Proba de 0.7 d'avoir du blanc
      }
      else if (r < 0.9) {
        colorSquare = '#130e12' // Proba de 0.9 - 0.7 = 0.2 d'avoir du noir
      }
      else {
        colorSquare = '#c0231a' // Proba de 1 - 0.9 = 0.1 d'avoir du rouge
      }
      fill(colorSquare);
      stroke(colorSquare);
      if (x == 12 * width/lineSquare) {
        fill('#130e12');
        stroke('#130e12');
      }
      else if (x == 13 * width/lineSquare) {
        fill('#c4a41d');
        stroke('#c4a41d');
      }
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