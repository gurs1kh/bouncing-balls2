function NoteCreator(game, notes) {
	this.game = game;
	this.notes = [];
	var radius = this.game.circle.radius;
	n = notes.length;
	for (var i = 0; i < n; i++) {
		var note = new Note(game,
							parseInt(notes[i]),
							this.game.circle,
							n, i);
		this.notes.push(note);
	}
}

NoteCreator.prototype = new Entity();
NoteCreator.prototype.constructor = NoteCreator;

NoteCreator.prototype.draw = function(ctx) {
	for (var i = 0; i < this.notes.length; i++) {
		ctx.save();
		this.notes[i].draw(ctx);
		ctx.restore();
	}
}