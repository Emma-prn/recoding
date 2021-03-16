var gui = new dat.GUI();
var params = {
    Nb_Square_per_Line: 39,
    Random_Seed: 0,
    Download_Image: function () { return save(); },
};
gui.add(params, "Nb_Square_per_Line", 5, 39, 1);
gui.add(params, "Random_Seed", 0, 10, 1);
gui.add(params, "Download_Image");
var colors = [
    '#c4a41d',
    '#c0231a',
    '#3a5bdc',
    '#130e12',
    '#dcd0c0',
];
function draw() {
    background('#dcd0c0');
    randomSeed(params.Random_Seed);
    var lineSquare = params.Nb_Square_per_Line;
    for (var y = 0; y < height; y += height / lineSquare) {
        var use_palette_1 = random() < 0.8;
        for (var i = 0; i < lineSquare; i++) {
            var x = i * width / lineSquare;
            var r = random();
            var colorSquare = void 0;
            var oldColor = void 0;
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
                    var colorIdx = colors.indexOf(colorSquare);
                    var newIdx = (colorIdx + floor(random(1, colors.length - 1))) % colors.length;
                    colorSquare = colors[newIdx];
                }
            }
            fill(colorSquare);
            stroke(colorSquare);
            rect(x, y, width / lineSquare, height / lineSquare);
        }
    }
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
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