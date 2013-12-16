var levelTools = {
	create: function() {
		var width = 21;
		var height = 21;

		var level = [];

		for (var i = 0; i < height; i++) {
			level[i] = [];

			for (var j = 0; j < width; j++) {
				level[i][j] = false;
			}
		}

		var x = Math.ceil(width / 2);
		var y = Math.ceil(height / 2);

		level[y][x] = {};
		//Visited.
		level = this.spider(level, x, y, 100, 5);
		level = this.createExit(level);

		return level;
	},
	spider: function(level, x, y, chance, chanceDecrease) {
		level[y][x] = {};
		level[y][x].visited = false;
		level[y][x].exit = false;

		var width = level.length;
		var height = level[0].length;

		for (var i = -1; i < 2; i = i + 2) {
			if ((y + i) != 0 && (y + i) != height) {
				if (level[y + i][x] == false) {
					var random = Math.round(Math.random() * (100 - 0) + 0);
					if (random <= chance) {
						level = this.spider(level, x, y + i, chance - chanceDecrease, chanceDecrease);
					}
				}
			}
		}

		for (var i = -1; i < 2; i = i + 2) {
			if ((x + i) != 0 && (x + i) != height) {
				if (level[y][x + i] == false) {
					var random = Math.round(Math.random() * (100 - 0) + 0);
					if (random <= chance) {
						level = this.spider(level, x + i, y, chance - chanceDecrease, chanceDecrease);
					}
				}
			}
		}

		return level;
	},
	createExit: function(level) {
		var x = Math.round(Math.random() * level[0].length);
		var y = Math.round(Math.random() * level.length);

		console.log(x + "- " + y);

		if (level[y][x]) {
			level[y][x].exit = true;
		} else {
			level = this.createExit(level);
		}

		return level;
	},
	canMove: function(x, y) {
		var directions = {
			up: false,
			down: false,
			left: false,
			right: false
		};

		if (y > 0 && y < level.length && x > 0 && x < level[0].length) {
			if (level[y - 1][x]) {
				directions['up'] = true;
			}

			if (y < (level.length - 1)) {
				if (level[y + 1][x]) {
					directions['down'] = true;
				}
			}

			if (level[y][x - 1]) {
				directions['left'] = true;
			}

			if (x < (level[0].length - 1)) {
				if (level[y][x + 1]) {
					directions['right'] = true;
				}
			}
		}

		return directions;
	}
}
