function Line(game) {
	this.startX;
	this.startY;
	this.endX;
	this.endY;
}

Line.prototype = new Entity();
Line.prototype.constructor = Line;

Line.prototype.draw = function(ctx) {
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(this.startX, this.startY);
	ctx.lineTo(this.endX, this.endY);
	ctx.stroke();
	ctx.restore();
}