enemies = {
	witch: function() {
		var witchSpriteSheet = new createjs.SpriteSheet({
			framerate: 1,
			images: ["assets/images/ghost.png"],
			frames: {width: 96, height: 96, regX: 48, regY: 48},
			animations: {
				stand: [0,8,"stand"],
				attack: [9, 15, "stand"]
			}
		});

		var witchSprite = new createjs.Sprite(witchSpriteSheet, "stand");
		witchSprite.onAnimationEnd = function() {
			console.log('test');
		}

		var witch = {
			type: "witch",
			sprite: witchSprite,
			hp: 50,
			damage: 10
		}

		return witch;
	},
	waterMonster: function() {
		var waterSpriteSheet = new createjs.SpriteSheet({
			framerate: 1,
			images: ["assets/images/watermonster.png"],
			frames: {width: 288, height: 288, regX: 288/2, regY: 288/2},
			animations: {
				stand: [0,11,"stand"],
				attack: [12, 22, "stand"]
			}
		});

		var waterSprite = new createjs.Sprite(waterSpriteSheet, "stand");
		
		var waterMonster = {
			type: "waterMonster",
			sprite: waterSprite,
			hp: 300,
			damage: 50
		}

		return waterMonster;
	}
}
