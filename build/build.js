var gui = new dat.GUI();
var params = {
    Nb_Square_per_Line: 39,
    Random_Seed: 0,
    Download_Image: function () { return save(); },
};
gui.add(params, "Nb_Square_per_Line", 5, 39, 1);
gui.add(params, "Random_Seed", 0, 10, 1);
gui.add(params, "Download_Image");
var modified_squares = [];
var colors = [
    '#c4a41d',
    '#c0231a',
    '#3a5bdc',
    '#130e12',
    '#dcd0c0',
];
function draw() {
    background(colors[4]);
    randomSeed(params.Random_Seed);
    var lineSquare = params.Nb_Square_per_Line;
    for (var y = 0; y < height; y += height / lineSquare) {
        var use_palette_1 = random() < 0.8;
        var colorSquare = void 0;
        colorSquare = pickColor(use_palette_1);
        for (var i = 0; i < lineSquare; i++) {
            if (random() < 0.05) {
                colorSquare = pickColor(use_palette_1);
            }
            var x = i * width / lineSquare;
            var r = random();
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
                    var colorIdx = colors.indexOf(colorSquare);
                    var newIdx = (colorIdx + floor(random(1, colors.length - 1))) % colors.length;
                    colorSquare = colors[newIdx];
                }
            }
            if (i >= 16 && colorSquare == colors[0] && r > 0.95) {
                fill(colors[3]);
                stroke(colors[3]);
            }
            else {
                fill(colorSquare);
                stroke(colorSquare);
            }
            rect(x, y, width / lineSquare, height / lineSquare);
        }
    }
    modified_squares.forEach(function (sq) {
        fill(sq.col);
        stroke(sq.col);
        rect(sq.x, sq.y, width / lineSquare, height / lineSquare);
    }, this);
}
function pickColor(use_palette_1) {
    var r = random();
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
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
function keyPressed() {
    if (keyCode === 107 && params.Nb_Square_per_Line < 40) {
        params.Nb_Square_per_Line++;
    }
    else if (keyCode === 109 && params.Nb_Square_per_Line > 5) {
        params.Nb_Square_per_Line--;
    }
    else if (keyCode === 32) {
        params.Random_Seed++;
    }
    return false;
}
function mousePressed() {
    var w = width / params.Nb_Square_per_Line;
    var x = floor(mouseX / w) * w;
    var y = floor(mouseY / w) * w;
    var newSquare = { x: x, y: y, col: '#9c2d89' };
    modified_squares.push(newSquare);
    console.log(modified_squares);
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map