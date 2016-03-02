function Note(game, note, circle, n, i, color) {
	Entity.call(this, game, 0, 0);
	var radius = circle.radius;
	this.x = (1/(n*n)+1) * radius * Math.cos(i * 2 * Math.PI / n - Math.PI / 2),
	this.y = (1/(n*n)+1) * radius * Math.sin(i * 2 * Math.PI / n - Math.PI / 2),
	this.textX =  0.9 * radius * Math.cos(i * 2 * Math.PI / n - Math.PI / 2);
	this.textY =  0.9 * radius * Math.sin(i * 2 * Math.PI / n - Math.PI / 2);
	this.radius = Math.PI * radius / n;
	this.circle = circle;
	this.n = n;
	this.i = i;
	var rgb = waveLengthToRGB(Math.pow(2, (this.i - 8) / 12) * 440);
	// this.color = "rgb(" + Math.round(Math.random() * 255) + ", "
						// + Math.round(Math.random() * 255) + ", "
						// + Math.round(Math.random() * 255) + ")";
	this.color = "rgb(" + rgb.red + "," + rgb.green + "," + rgb.blue + ")";
	this.note = note;
}

Note.prototype = new Entity();
Note.prototype.constructor = Note;

Note.prototype.draw = function(ctx) {
	var circle = this.circle;
	ctx.strokeStyle = this.color;
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.arc(circle.x, circle.y, circle.radius,
			2 * Math.PI / this.n * this.i - Math.PI / 2 - Math.PI / this.n,
			2 * Math.PI / this.n * this.i - Math.PI / 2 + Math.PI / this.n, false);
	ctx.stroke();
	
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.arc(circle.x, circle.y, circle.radius,
			2 * Math.PI / this.n * this.i - Math.PI / 2 - Math.PI / this.n - Math.PI / 1440,
			2 * Math.PI / this.n * this.i - Math.PI / 2 - Math.PI / this.n + Math.PI / 1440, false);
	ctx.stroke();
	
	ctx.font = "16pt Arial, sans-serif";
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(this.note, this.textX, this.textY);
}

Note.prototype.play = function() {
	new Audio("piano/Piano.mf." + piano[this.note + 6] + ".mp3").play();
}

var piano = [
"G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4",
"E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5",
"Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5"];

//adapted from http://stackoverflow.com/questions/1472514/convert-light-frequency-to-rgb
function waveLengthToRGB(wavelength){
	while (wavelength < 380) wavelength *= 2;
	while (wavelength > 780) wavelength /= 2;
	
	var Gamma = 0.80;
	var IntensityMax = 255;
	
    var factor;
    var red, green, blue;
	
    if((wavelength >= 380) && (wavelength < 440)) {
        red = -(wavelength - 440) / (440 - 380);
        green = 0.0;
        blue = 1.0;
    } else if((wavelength >= 440) && (wavelength < 490)) {
        red = 0.0;
        green = (wavelength - 440) / (490 - 440);
        blue = 1.0;
    } else if((wavelength >= 490) && (wavelength < 510)) {
        red = 0.0;
        green = 1.0;
        blue = -(wavelength - 510) / (510 - 490);
    } else if((wavelength >= 510) && (wavelength < 580)) {
        red = (wavelength - 510) / (580 - 510);
        green = 1.0;
        blue = 0.0;
    } else if((wavelength >= 580) && (wavelength < 645)) {
        red = 1.0;
        green = -(wavelength - 645) / (645 - 580);
        blue = 0.0;
    } else if((wavelength >= 645) && (wavelength < 781)) {
        red = 1.0;
        green = 0.0;
        blue = 0.0;
    } else {
        red = 0.0;
        green = 0.0;
        blue = 0.0;
    };

    // Let the intensity fall off near the vision limits

    if((wavelength >= 380) && (wavelength<420)) {
        factor = 0.3 + 0.7*(wavelength - 380) / (420 - 380);
    } else if((wavelength >= 420) && (wavelength < 701)) {
        factor = 1.0;
    } else if((wavelength >= 701) && (wavelength < 781)) {
        factor = 0.3 + 0.7*(780 - wavelength) / (780 - 700);
    } else {
        factor = 0.0;
    };


    // Don't want 0^x = 1 for x <> 0
    return {red:red == 0.0 ? 0 :  Math.round(IntensityMax * Math.pow(red * factor, Gamma)),
			   green:green == 0.0 ? 0 : Math.round(IntensityMax * Math.pow(green * factor, Gamma)),
			   blue:blue == 0.0 ? 0 : Math.round(IntensityMax * Math.pow(blue * factor, Gamma)),
	}
}