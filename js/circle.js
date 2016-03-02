function Circle(game, radius) {
	Entity.call(this, game, 0, 0);
	this.radius = radius;
}

Circle.prototype = new Entity();
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
	ctx.closePath();
	ctx.stroke();
}