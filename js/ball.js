function Ball(game, radius, x, y, velocity, color) {
	x = x || 0;
	y = y || 0;
	radius = radius || 10;
	Entity.call(this, game, x, y);
	this.radius = radius || 10;
	
	var boundary = this.game.circle.radius;
	var ball = this;
	while (this.game.balls.filter(function(d) { return d.collide(ball); })[0]) {
		this.x = (Math.round(Math.random()) ? -1 : 1)
			   * (Math.random() * boundary - radius / 2);
		this.y = (Math.round(Math.random()) ? -1 : 1)
			   * (Math.random() * boundary - radius / 2);
	}
	
	this.velocity = velocity || {
		x: (Math.round(Math.random()) ? -1 : 1)
		 * (Math.random() * 5 + 3),
		y: (Math.round(Math.random()) ? -1 : 1)
		 * (Math.random() * 5 + 3)
	};
	
	this.color = color || "black";
	
	//"rgb(" + Math.round(Math.random() * 255) + ", "
	//+ Math.round(Math.random() * 255) + ", "
	//+ Math.round(Math.random() * 255) + ")";
}

Ball.prototype = new Entity();
Ball.prototype.constructor = Ball;

Ball.prototype.collide = function (other) {
    return distance(this, other) < this.radius + other.radius;
};

function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

Ball.prototype.update = function() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
	
	var circle = this.game.circle;
	
	//boundary collision
	if (!this.collide({x:circle.x, y:circle.y, radius: circle.radius - this.radius*2})) {
		var radius = Math.sqrt(this.x * this.x + this.y * this.y);
		var boundRadius = circle.radius - this.radius;
		
		this.x *= boundRadius / radius;
		this.y *= boundRadius / radius;
		
		var magn = Math.sqrt(this.x * this.x + this.y * this.y);
		var normal = {x: this.x / magn, y:this.y / magn};
		var dotProd = 2 * (normal.x * this.velocity.x + normal.y * this.velocity.y);
		normal.x *= dotProd;
		normal.y *= dotProd;
		this.velocity.x -= normal.x;
		this.velocity.y -= normal.y;
		
		var ball = this;
		var note = this.game.notes.filter(function(d) {
			return ball.collide(d);
		})[0];
		note.play();
		this.color = note.color;
	}
	
	//ball collision
	var balls = this.game.balls;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i] != this && this.collide(balls[i])) {
			var velocity = this.velocity;
			this.velocity = balls[i].velocity;
			balls[i].velocity = velocity;
		}
	}
}

Ball.prototype.draw = function(ctx) {
    ctx.beginPath();
	ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.closePath();
	ctx.fill();
}