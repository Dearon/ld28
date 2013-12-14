function levelGeneration() {
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

	level[y][x] = true;

	level = levelSpider(level, x, y, 80);

	/*levelSpider(100);

	for (var i = 0; i < 4; i++) {
		var chance = 100;

		if (i == 1) {
			while(chance != 0) {
				var random = Math.round(Math.random() * (100 - 0) + 0);
				if (random <= chance) {
					console.log('Yay');
				}

				chance-= 5;
			}
		}
	}*/

	return level;
}

function levelSpider(level, x, y, chance) {
	level[y][x] = true;

	if (! level[y - 1][x]) {
		var random = Math.round(Math.random() * (100 - 0) + 0);
		if (random <= chance) {
			level = levelSpider(level, x, y - 1, chance - 5);
		}
	}

	if (! level[y][x + 1]) {
		var random = Math.round(Math.random() * (100 - 0) + 0);
		if (random <= chance) {
			level = levelSpider(level, x + 1, y, chance - 5);
		}
	}

	if (! level[y + 1][x]) {
		var random = Math.round(Math.random() * (100 - 0) + 0);
		if (random <= chance) {
			level = levelSpider(level, x, y + 1, chance - 5);
		}
	}

	if (! level[y][x -1]) {
		var random = Math.round(Math.random() * (100 - 0) + 0);
		if (random <= chance) {
			level = levelSpider(level, x - 1, y, chance - 5);
		}
	}

	return level;
}
