draw = {
	update: function() {
			//Added stage.remove to graphics to create a better gameover look.
		this.background();
		this.minimap();
		this.player();
		this.enemies();

		if (player.hp <= 0) {
			this.gameover();
			createjs.Ticker.setPaused(true);
		}
	},
	background: function() {
		stage.addChild(bg);
		var bg = new createjs.Shape();
		bg.graphics.beginFill('#BBB').drawRect(STAGE_WIDTH/4, STAGE_HEIGHT/4, 400, 300);

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

		stage.addChild(bg);
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
	player: function() {
		stage.addChild(player.sprite);
		var hpText = new createjs.Text(player.hp, "20px Arial", "#ff0000");
		hpText.x = 385;
		hpText.y = 350;
		stage.addChild(hpText);
	},
	enemies: function() {
		var enemies = level[player.y][player.x]['enemies'];
		$.each(enemies, function(index, item) {
			item.sprite.x = 240 + (60 * index);
			item.sprite.y = 210;

			stage.addChild(item.sprite);

			if (item.selected) {
				var up = 135;
				//Sets
				up -= item.sprite.spriteSheet._regY/2;
				var left = 230 + (60 * index);

				var arrow = new createjs.Shape();
				arrow.graphics.beginFill('#ff0000').drawRect(left, up, 20, 20);
				stage.addChild(arrow);
			}

			var hpText = new createjs.Text(item.hp, "20px Arial", "#ff0000");
			hpText.x = 230 + (60 * index)
			hpText.y = 260;
			stage.addChild(hpText);
		});
	},
	gameover: function() {
		var t = new createjs.Shape();
		t.graphics.beginFill('ff0000').drawRect(0, 0,STAGE_WIDTH , STAGE_HEIGHT);
		t.alpha = 0.5;
		stage.addChild(t);

		var hpText = new createjs.Text('Game Over', "50px Courier", "black");
		hpText.x = STAGE_WIDTH/3;
		hpText.y = STAGE_HEIGHT/3;
		stage.addChild(hpText);

		stage.update();
	}
}
