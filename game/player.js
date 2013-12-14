function createPlayer() {
	var playerSpriteSheet = new createjs.SpriteSheet({
		framerate: 1,
		images: ["assets/images/player.png"],
		frames: {width: 32, height: 32, regX: 16, regY: 16},
		animations: {
			stand: [0,8,"stand"],
			die: [2, 13, false]
		}
	});

	var playerSprite = new createjs.Sprite(playerSpriteSheet, "stand");
	playerSprite.x = STAGE_WIDTH/2;
	playerSprite.y = STAGE_HEIGHT/2;

	var player = {
		sprite: playerSprite,
		x: Math.floor(level.length/2),
		y: Math.floor(level[0].length/2),
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
		}
	}

	return player;
}
