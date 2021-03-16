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
];
function draw() {
    background('#dcd0c0');
    randomSeed(params.Random_Seed);
    var lineSquare = params.Nb_Square_per_Line;
    for (var y = 0; y < height; y += height / lineSquare) {
        var colorLine = [];
        var suite = 2;
        var indexColor = 0;
        var nbColors = Math.floor((random() * 2) + 2);
        for (var i = 0; i < nbColors; i++) {
            colorLine[i] = random(colors);
        }
        colorLine.push('#dcd0c0', '#dcd0c0', '#dcd0c0');
        for (var x = 0; x < width; x += width / lineSquare) {
            var indexColorCurrent = -1;
            if (suite == 2) {
                var colorSquare = random(colorLine);
                indexColor = colorLine.indexOf(colorSquare);
                fill(colorSquare);
                stroke(colorSquare);
            }
            else if (suite == 1) {
                var colorSquare = random(colorLine);
                indexColorCurrent = colorLine.indexOf(colorSquare);
                while (indexColorCurrent != indexColor) {
                    colorSquare = random(colorLine);
                    indexColorCurrent = colorLine.indexOf(colorSquare);
                }
                fill(colorSquare);
                stroke(colorSquare);
            }
            else if (suite == 0) {
                var colorSquare = random(colorLine);
                indexColorCurrent = colorLine.indexOf(colorSquare);
                while (indexColorCurrent == indexColor) {
                    colorSquare = random(colorLine);
                    indexColorCurrent = colorLine.indexOf(colorSquare);
                }
                fill(colorSquare);
                stroke(colorSquare);
            }
            rect(x, y, width / lineSquare, height / lineSquare);
            suite = Math.floor(random(39)) >= 7 ? 1 : 0;
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