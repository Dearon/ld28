var enemyTools = {
	hashLevelEnemies: {},
	enemyTypes: ["witch"],
	chanceSpawn: 1.0/6.0,

	createEnemy: function(x, y, type) {
		var enemySpriteSheet = new createjs.SpriteSheet({
			framerate: 1,
			images: ["assets/images/"+type+".png"],
			frames: {width: 96, height: 96, regX: 48, regY: 48},
			animations: {
				stand: [0,8,"stand"],
				attack: [9, 16, "stand"]
			}
		});

		var enemySprite = new createjs.Sprite(enemySpriteSheet, "stand");
		enemySprite.x = x; 
		enemySprite.y = y;

		var enemy = this.enemyAttributes(type, enemySprite)

		return enemy;
	},
	createRandomEnemy: function(x, y) {
		var rangeRand = Math.floor(Math.random()*this.enemyTypes.length);
		return this.createEnemy(x,y,this.enemyTypes[rangeRand]);
	},
	generateEnemies: function() {
		for(var i =0; i < level.length; i++)
		{
			for(var j = 0; j < level[0].length; j++)
			{
				if(level[i][j])
				{	
					this.hashLevelEnemies[i+" "+j] = {
							enemies: [],
					} 
					if(Math.random() > this.chanceSpawn) 
					{
						var numberOfEnemies = Math.ceil(Math.random()*6);
						
						for(var iEnemy = 0; iEnemy < numberOfEnemies; iEnemy++)
						{
							var x = STAGE_WIDTH/4 +  iEnemy*50;
							var y = STAGE_WIDTH/4;
							this.hashLevelEnemies[i+" "+j].enemies.push(this.createEnemy(x,y,"witch"));
						}
					}
				}

			}
		}
		console.log("Do i even get here yall?");
	},
	enemyAttributes: function(type, spritesheet)
	{
		if(type ==="witch")
		{
			return attrb = {
				sprite: spritesheet,
				x: spritesheet.x,
				y: spritesheet.y,
				hp: 50,
				dmg: 10
			}
		}
	}
};





