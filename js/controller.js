function startController(game, num, size) {
	var canvas = document.getElementById("gameWorld");
	var numInput = document.getElementById("ballNum");
	var sizeInput = document.getElementById("ballSize");
	var scaleInput = document.getElementById("scale");
	var customScaleInput = document.getElementById("customScale");
	var updateBtn = document.getElementById("update");
	var clearBtn = document.getElementById("clear");
	numChanged = sizeChanged = scaleChanged = false;
	
	
	updateBtn.onclick = function() {
		if (scaleChanged) {
			var scale = scaleInput.value;
			if (scale == "custom") {
				scale = customScaleInput.value;
			}
			var notes = scale.split(",");
			game.notes.forEach(function(d) { d.removeFromWorld = true; });
			game.noteCreator.removeFromWorld = true;
			game.notes = [];

			game.noteCreator = new NoteCreator(game, notes);
			game.notes = game.noteCreator.notes;
			game.addEntity(game.noteCreator);
		}
		if (numChanged) {
			game.balls.forEach(function(d){ d.removeFromWorld = true; });
			game.balls = [];
			num = parseInt(numInput.value);
			for (var i = 0; i < num; i++) {
				var ball = new Ball(game, parseInt(sizeInput.value));
				game.balls.push(ball);
				game.addEntity(ball);
			}
		}
		
		if (sizeChanged) {
			for (var i = 0; i < game.balls.length; i++) {
				game.balls[i].radius = parseInt(sizeInput.value);
			}
		}
		numChanged = sizeChanged = scaleChanged = false;
	}
	
	clearBtn.onclick = function() {
		numInput.value = 0;
		numChanged = true;
		updateBtn.onclick();
	}
	
	numInput.onchange = function() {
		numChanged = true;
	}
	
	sizeInput.onchange = function() {
		sizeChanged = true;
	}
	
	scaleInput.onchange = 
	customScaleInput.onchange = function() {
		var scale = scaleInput.value;
		if (scale == "custom") {
			customScaleInput.hidden = false;
		} else {
			customScaleInput.hidden = true;
		}
		scaleChanged = true;
	}
	
	var line = game.line;
	mousedown = false;
	canvas.onmousedown = function(e) {
		mousedown = true;
		line.startX = line.endX = e.layerX;
		line.startY = line.endY = e.layerY;
	};
	
	canvas.onmousemove = function(e) {
		if (mousedown) {
			line.endX = e.layerX;
			line.endY = e.layerY;
		}
	}
	
	canvas.onmouseup = function(e) {
		mousedown = false;
		var x = line.startX - canvas.width / 2;
		var y = line.startY - canvas.height / 2;
		var ball = new Ball(game, parseInt(sizeInput.value), x, y);
		ball.velocity = {x: (line.startX - line.endX)/10,
						 y: (line.startY - line.endY)/10};
		game.addEntity(ball);
		game.balls.push(ball);
		numInput.value++;
		line.startX = line.startY = line.endX
					= line.endY = null;
	}
}