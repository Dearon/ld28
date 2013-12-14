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
		y: Math.floor(level[0].length/2)
	}

	return player;
}

function playerMovement(stage, level) {
	var x = player.x;
	var y = player.y;

	drawPlayerMap(stage, level, x, y);

	Mousetrap.bind('up', function() {
		player.x-=1;
		drawPlayerMap(stage, level, x, y);
	});
	Mousetrap.bind('down', function() {
		player.x+=1;
		drawPlayerMap(stage, level, x, y);
	});
	Mousetrap.bind('left', function() {
		player.y-=1;
		drawPlayerMap(stage, level, x, y);
	});
	Mousetrap.bind('right', function() {
		player.y+=1;
		drawPlayerMap(stage, level, x, y);
	});
}

function drawPlayerMap(stage, level, x, y) {
	var top = 20 + (20 * x);
	var left = 20 + (20 * y);

	var block = new createjs.Shape();
	block.graphics.beginFill('#ff0000').drawRect(left, top, 10, 10);
	stage.addChild(block);

}
