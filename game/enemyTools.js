var enemyTools = {
	hashLevelEnemies: {},
	enemyTypes: ["witch"],
	chanceSpawn: 2.0/6.0,

	generateEnemies: function() {
		for(var i = 0; i < level.length; i++)
		{
			for(var j = 0; j < level[0].length; j++)
			{
				if(level[i][j])
				{
					level[i][j]['enemies'] = [];
					if(Math.random() <= this.chanceSpawn) 
					{	
						if(Math.random() <= this.chanceSpawn)
						{
							var enemy = this.waterMonster();
							enemy["selected"] = true;
							level[i][j]['enemies'].push(enemy);
						}
						else	{
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
		}
	},
	createEnemy: function(x, y, type) {
		var enemy = this.witch();

		return enemy;
	},
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
			sprite: waterSprite,
			hp: 300,
			damage: 50
		}

		return waterMonster;
	}
};
