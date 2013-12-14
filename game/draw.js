draw = {
	update: function() {
		this.background();
		this.minimap();
		stage.addChild(player.sprite);
		stage.addChild(Enemy.sprite);

		var enemies = (enemyTools.hashLevelEnemies[player.y+" "+player.x].enemies);
		for(var i = 0; i < enemies.length; i++)
			stage.addChild(enemies[i].sprite);
	},
	background: function() {
		stage.addChild(bg);
		var bg = new createjs.Shape();
		bg.graphics.beginFill('#BBB').drawRect(STAGE_WIDTH/4, STAGE_HEIGHT/4, 400, 300);
		stage.addChild(bg);

		var directions = levelTools.canMove();

		if (directions.up) {
			bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH/2-50, 0, 100, 150);
		}
		if (directions.down) {
			bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH/2-50, STAGE_HEIGHT, 100, -150);
		}
		if (directions.left) {
			bg.graphics.beginFill('#AAA').drawRect(0, STAGE_HEIGHT/2-50, 200, 100);
		}
		if (directions.right) {
			bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH, STAGE_HEIGHT/2-50, -200, 100);
		}
	},
	minimap: function() {
		var x = player.x - 1;
		var y = player.y - 1;

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				left = (STAGE_WIDTH - 130) + (40 * i);
				up = 20 + (40 * j);

				if (level[y + j][x + i]) {
					if ((x + i) == player.x && (y + j) == player.y) {
						var color = '#ff0000';

						var directions = levelTools.canMove();

						if (directions.up) {
							var block = new createjs.Shape();
							block.graphics.beginFill('#fff').drawRect(left + 10, up - 10, 10, 10);
							stage.addChild(block);
						}
						if (directions.down) {
							var block = new createjs.Shape();
							block.graphics.beginFill('#fff').drawRect(left + 10, up + 30, 10, 10);
							stage.addChild(block);
						}
						if (directions.left) {
							var block = new createjs.Shape();
							block.graphics.beginFill('#fff').drawRect(left - 10, up + 10, 10, 10);
							stage.addChild(block);
						}
						if (directions.right) {
							var block = new createjs.Shape();
							block.graphics.beginFill('#fff').drawRect(left + 30, up + 10, 10, 10);
							stage.addChild(block);
						}
					} else {
						var color = '#fff';
					}
					
					var block = new createjs.Shape();
					block.graphics.beginFill(color).drawRect(left, up, 30, 30);
					stage.addChild(block);
				}
			}
		}
	},
}
