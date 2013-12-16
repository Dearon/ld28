items = {
	chest: function() {
		var chestSpriteSheet = new createjs.SpriteSheet({
			framerate: 1,
			images: ["assets/images/treasure.png"],
			frames: {width: 96, height: 96, regX: 48, regY: 48},
			animations: {
				idle: [0,0,"idle"],
				open: [1, 9, "idle"]
			}
		});

		var chestSprite = new createjs.Sprite(chestSpriteSheet, "idle");

		var chest = {
			sprite: chestSprite,
		}

		return chest;
	},
}
