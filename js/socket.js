function startSocket(game) {
	var socket = io.connect("http://76.28.150.193:8888");

	socket.on("load", function (data) {
		game2 = JSON.parse(data.data, function(key, value) {
			if (key == 'game') { return game; }
			else { return value; }
		});
		
		game.notes.forEach(function(d){ d.removeFromWorld = true; });
		game.noteCreator.removeFromWorld = true;
		
		var notes = game2.notes.map(function(d) { return d.note; });
		game.noteCreator = new NoteCreator(game, notes);
		game.notes = game.noteCreator.notes;
		game.addEntity(game.noteCreator);
		
		scaleOptions = document.getElementById("scale").options;
		var noteString = notes.join(",");
		scaleOptions[scaleOptions.length - 1].selected = true;
		for (var i = 0; i < scaleOptions.length; i++) {
			if (scaleOptions[i].value == noteString) {
				scaleOptions[i].selected = true;
			}
		}
		
		var customScale = document.getElementById("customScale");
		customScale.hidden = true;
		if (scaleOptions[scaleOptions.length - 1].selected) {
			customScale.value = noteString;
			customScale.hidden = false;
		}
		
		game.balls.forEach(function(d){ d.removeFromWorld = true; });
		game.balls = [];
		for (var i = 0; i < game2.balls.length; i++) {			
			var ball2 = game2.balls[i];
			var ball = new Ball(game, ball2.radius, ball2.x, ball2.y, ball2.velocity, ball2.color);
			game.balls.push(ball);
			game.addEntity(ball);
		}
		document.getElementById("ballNum").value = game.balls.length;
		
	});
	
	var stateInput = document.getElementById("state");
	stateInput.value = "a";
	var saveState = document.getElementById("save");
	var loadState = document.getElementById("load");
	
	saveState.onclick = function() {
		socket.emit("save", {
			studentname: "Manvir Singh",
			statename: stateInput.value,
			data: JSON.stringify(game, function(key, value) {
				if (key == 'game') { return "game"; }
				else { return value; }
			}),
		});
	}
	
	loadState.onclick = function() {
		socket.emit("load", {
			studentname: "Manvir Singh",
			statename: stateInput.value,
		});
	}
}