// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Random_Seed: 0,
    Download_Image: () => save(),
}
gui.add(params,"Random_Seed",0,10,1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

const colors = [
  '#c4a41d',
  '#c0231a',
  '#3a5bdc',
  '#130e12',
]
function draw() {
	background('#dcd0c0');
  randomSeed(params.Random_Seed);
  let lineSquare = 39;
	for (var y = 0; y < height; y += height/lineSquare) {
    let colorLine = [];
    let suite = 2;
    let indexColor = 0;
    let nbColors = Math.floor((random() * 2) +2);
    for (let i = 0; i < nbColors; i++) {
      colorLine[i] = random(colors);
    }
    console.log(colorLine);
    colorLine.push('#dcd0c0','#dcd0c0','#dcd0c0');
    for (var x = 0; x < width; x += width/lineSquare) {
      let indexColorCurrent = -1;
      if (suite == 2) {
        let colorSquare = random(colorLine);
        indexColor = colorLine.indexOf(colorSquare);
        fill(colorSquare);
        stroke(colorSquare);
      }
      else if(suite == 1) {
        let colorSquare = random(colorLine);
        indexColorCurrent = colorLine.indexOf(colorSquare);
        while (indexColorCurrent != indexColor) {
          colorSquare = random(colorLine);
          indexColorCurrent = colorLine.indexOf(colorSquare);
        }
        fill(colorSquare);
        stroke(colorSquare);
      }
      else if(suite == 0) {
        let colorSquare = random(colorLine);
        indexColorCurrent = colorLine.indexOf(colorSquare);
        while (indexColorCurrent == indexColor){
          colorSquare = random(colorLine);
          indexColorCurrent = colorLine.indexOf(colorSquare);
        }
        fill(colorSquare);
        stroke(colorSquare);
      }
      rect(x,y,width/lineSquare,height/lineSquare);
      suite = Math.floor((random() * 1) +0.5);
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