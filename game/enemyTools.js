var enemyTools = {
	hashLevelEnemies: {},
	enemyTypes: ["witch"],
	chanceSpawn: 2.0/6.0,

	generateEnemies: function() {
		for(var i = 0; i < level.length; i++)
		{
			for(var j = 0; j < level[0].length; j++)
			{											//So the monsters dont spawn where player is.
				if(level[i][j] && ! level[i][j].exit && !(i == player.x && j == player.y))
				{
					if(Math.random() <= this.chanceSpawn) 
					{	
						if(Math.random() <= this.chanceSpawn/2)
						{
							var enemy = enemies.waterMonster();
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
		var enemy = enemies.witch();

		return enemy;
	}
};
