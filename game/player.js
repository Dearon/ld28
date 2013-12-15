function createPlayer() {
	var playerSpriteSheet = new createjs.SpriteSheet({
		framerate: 1,
		images: ["assets/images/player.png"],
		frames: {width: 96, height: 96, regX: 48, regY: 48},
		animations: {
			stand: [0,7,"stand"],
			die: [9, 18, false]
		}
	});

	var playerSprite = new createjs.Sprite(playerSpriteSheet, "stand");
	playerSprite.x = STAGE_WIDTH/2;
	playerSprite.y = STAGE_HEIGHT/2;

	var player = {
		sprite: playerSprite,
		x: Math.floor(level.length/2),
		y: Math.floor(level[0].length/2),
		hp: 100,
		damage: 25,
		move: function(direction) {
			var directions = levelTools.canMove();

			if (directions[direction]) {
				if (direction == 'up') {
					this.y -= 1;
				}
				if (direction == 'down') {
					this.y += 1;
				}
				if (direction == 'left') {
					this.x -= 1;
				}
				if (direction == 'right') {
					this.x += 1;
				}
			}
		},
		selectNextEnemy: function() {
			var enemies = level[player.y][player.x]['enemies'];
			var next = false;

			if (enemies.length > 0) {
				$.each(enemies, function(index, item) {
					if (next) {
						item['selected'] = true;
						next = false;
					} else if (item['selected']) {
						item['selected'] = false;
						next = true;
					}
				});

				if (next) {
					enemies[0]['selected'] = true;
				}
			}
		},
		attackEnemy: function() {
			var enemies = level[player.y][player.x]['enemies'];

			if (enemies.length > 0) {
				var enemy = {};
				var enemyIndex = 0;

				$.each(enemies, function(index, item) {
					if (item['selected']) {
						enemy = item;
						enemyIndex = index;
					}
				});

				enemy.hp -= player.damage;

				if (enemy.hp <= 0) {
					enemies.splice(enemyIndex, 1);

					if (enemies.length > 0) {
						enemies[0]['selected'] = true;
					}
				}

				$.each(enemies, function(index, item) {
					item.sprite.gotoAndPlay('attack');
					player.hp -= enemy.damage;
				});

				if (player.hp <= 0) {
					console.log('Game Over');
				}
			}
		}
	}

	return player;
}
