var enemyTools = {
	hashLevelEnemies: {},
	enemyTypes: ["witch"],
	chanceSpawn: 1.0/6.0,

	generateEnemies: function() {
		for(var i = 0; i < level.length; i++)
		{
			for(var j = 0; j < level[0].length; j++)
			{
				if(level[i][j])
				{
					level[i][j]['enemies'] = [];
					if(Math.random() > this.chanceSpawn) 
					{
						var numberOfEnemies = Math.ceil(Math.random()*6);
						
						for(var k = 0; k < numberOfEnemies; k++)
						{
							var enemy = this.createEnemy();
							
							if (k == 0) {
								enemy['selected'] = true;
							} else {
								enemy['selected'] = false;
							}

							level[i][j]['enemies'].push(enemy);
						}
					}
				}

			}
		}
	},
	createEnemy: function(x, y, type) {
		var enemy = this.witch();

		return enemy;
	},
	witch: function() {
		var witchSpriteSheet = new createjs.SpriteSheet({
			framerate: 1,
			images: ["assets/images/witch.png"],
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
			sprite: witchSprite,
			hp: 50,
			damage: 10
		}

		return witch;
	}
};
