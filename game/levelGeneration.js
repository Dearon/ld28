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

	level = levelSpider(level, x, y, 100, 5);

	return level;
}

function levelSpider(level, x, y, chance, chanceDecrease) {
	level[y][x] = true;

	var width = level.length;
	var height = level[0].length;

	for (var i = -1; i < 2; i = i + 2) {
		if ((y + i) != 0 && (y + i) != height) {
			if (level[y + i][x] == false) {
				var random = Math.round(Math.random() * (100 - 0) + 0);
				if (random <= chance) {
					level = levelSpider(level, x, y + i, chance - chanceDecrease, chanceDecrease);
				}
			}
		}
	}

	for (var i = -1; i < 2; i = i + 2) {
		if ((x + i) != 0 && (x + i) != height) {
			if (level[y][x + i] == false) {
				var random = Math.round(Math.random() * (100 - 0) + 0);
				if (random <= chance) {
					level = levelSpider(level, x + i, y, chance - chanceDecrease, chanceDecrease);
				}
			}
		}
	}

	return level;
}
