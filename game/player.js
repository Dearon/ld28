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
