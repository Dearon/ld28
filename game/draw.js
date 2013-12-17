draw = {
	entities: [],
	update: function() {
			//Added stage.remove to graphics to create a better gameover look.
		this.background();
		this.exit();
		this.minimap();
		this.player();
		this.enemies();
		this.items();
		this.selected();
		this.UserInterface();

			//Entities store effects such as probe light etc. :/
		for(var i = 0; i < this.entities.length; i++)
			this.entities[i].update();

		if (player.hp <= 0) {
			this.gameover();
			createjs.Ticker.setPaused(true);
		}
	},
	background: function() {
		stage.addChild(bg);
		var bg = new createjs.Shape();
		bg.graphics.beginFill('#BBB').drawRect(STAGE_WIDTH/4, STAGE_HEIGHT/4, 400, 300);

		var directions = levelTools.canMove(player.x, player.y);

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
	exit: function() {
		if (level[player.y][player.x].exit) {
			var block = new createjs.Bitmap(contentManager.imgExit);
			block.x = STAGE_WIDTH/2 - 32;
			block.y = 375;
			stage.addChild(block);
		}
	},
	minimap: function() {
		// The minimap is 5x5 so we'll set x and y to the top-left position of those rooms
		var x = player.x - 2;
		var y = player.y - 2;

		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				left = (STAGE_WIDTH - 150) + (25 * i);
				up = 10 + (25 * j);
				
				if ((y + j) > 0 && (y + j) < level.length && (x + i) > 0 && (x + i) < level[0].length && level[y + j][x + i]) {
					
					if(level[y+j][x+i].visited == true) {
						var directions = levelTools.canMove(x + i, y + j);

						if (directions.up && j > 0) {
							var block = new createjs.Shape();
							block.graphics.beginFill('#fff').drawRect(left + 5, up - 10, 5, 10);
							stage.addChild(block);
						}
						if (directions.down && j < 4) {
							var block = new createjs.Shape();
							block.graphics.beginFill('#fff').drawRect(left + 5, up + 15, 5, 10);
							stage.addChild(block);
						}
						if (directions.left && i > 0) {
							var block = new createjs.Shape();
							block.graphics.beginFill('#fff').drawRect(left - 10, up + 5, 10, 5);
							stage.addChild(block);
						}
						if (directions.right && i < 4) {
							var block = new createjs.Shape();
							block.graphics.beginFill('#fff').drawRect(left + 15, up + 5, 10, 5);
							stage.addChild(block);
						}

					
						if ((x + i) == player.x && (y + j) == player.y) {
							var color = '#0066FF';
						} else {
							var color = '#fff';
						}

						//handle icons
						if(level[y+j][x+i].exit)
						{
							var bitmap = new createjs.Bitmap(contentManager.iconExit);
							bitmap.x = left; bitmap.y = up;
							stage.addChild(bitmap);
						}
						else if(level[y+j][x+i].items.length > 0)
						{
							var bitmap = new createjs.Bitmap(contentManager.iconTreasure);
							bitmap.x = left; bitmap.y = up;
							stage.addChild(bitmap);
						}
						else if(level[y+j][x+i].enemies.length >= 5)
						{
							var bitmap = new createjs.Bitmap(contentManager.iconHard);
							bitmap.x = left; bitmap.y = up;
							stage.addChild(bitmap);
						}
						else if(level[y+j][x+i].enemies.length >= 3)
						{
							var bitmap = new createjs.Bitmap(contentManager.iconNormal);
							bitmap.x = left; bitmap.y = up;
							stage.addChild(bitmap);
						}
						else if(level[y+j][x+i].enemies.length >= 1)
						{
							var bitmap;

							if(level[y+j][x+i].enemies[0].type === "waterMonster")
								bitmap = new createjs.Bitmap(contentManager.iconHard);
							else
								bitmap = new createjs.Bitmap(contentManager.iconEasy);


							bitmap.x = left; bitmap.y = up;
							stage.addChild(bitmap);
						}
						

						var block = new createjs.Shape();

						if ((x + i) == player.x && (y + j) == player.y) {
							var color = '#0066FF';
							block.graphics.setStrokeStyle(3).beginStroke(color).drawRect(left, up, 15, 15);
						} else {
							var color = '#fff';
							block.graphics.setStrokeStyle(1).beginStroke(color).drawRect(left, up, 15, 15);
						}

						//Evaluate
						stage.addChild(block);
						
					}
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

		//Sets Player to inBattle
		if(enemies.length > 0)	
			player.inBattle = true;
		else if(player.inBattle == true)
		{
			player.inBattle = false;
			player.hasProbe = true;
			player.hasPotion = true;
		}

		$.each(enemies, function(index, item) {
			item.sprite.x = 240 + (60 * index);
			item.sprite.y = 210;

			stage.addChild(item.sprite);

			var hpText = new createjs.Text(item.hp, "20px Arial", "#ff0000");
			hpText.x = 230 + (60 * index)
			hpText.y = 260;
			stage.addChild(hpText);
		});
	},
	items: function() {
		var items = level[player.y][player.x]['items'];

		$.each(items, function(index, item) {
			item.sprite.x = 225;
			item.sprite.y = 418;
			stage.addChild(item.sprite);
		});
	},
	selected: function() {
		var enemies = level[player.y][player.x]['enemies'];

		if (level[player.y][player.x].enemies.length > 0) {
			$.each(enemies, function(index, item) {
				if (item.selected) {
					selected = true;

					var up = 135;
					//Sets
					up -= item.sprite.spriteSheet._regY/2;
					var left = 230 + (60 * index);

					var arrow = new createjs.Shape();
					arrow.graphics.beginFill('#ff0000').drawRect(left, up, 20, 20);
					player.pointer.x = left;
					player.pointer.y = up
					stage.addChild(player.pointer);
				}
			});
		}

		if (level[player.y][player.x].items.length > 0) {
			var arrow = new createjs.Shape();
			arrow.graphics.beginFill('#ff0000').drawRect(215, 375, 20, 20);
			player.pointer.x = 215;
			player.pointer.y = 375;
			stage.addChild(player.pointer);
		}

		if (level[player.y][player.x].exit) {
			var arrow = new createjs.Shape();
			arrow.graphics.beginFill('#ff0000').drawRect(STAGE_WIDTH/2 - 5, 375 - 10, 20, 20);
			player.pointer.x = STAGE_WIDTH/2 - 5;
			player.pointer.y = 375 - 10;
			stage.addChild(player.pointer);
		
		}
	},
	UserInterface: function() {
		//Probe
		var probe = new createjs.Bitmap(contentManager.iconProbe);
		probe.x = 0;
		probe.y = STAGE_HEIGHT - 56;
		stage.addChild(probe);

		var probeAmount = (player.hasProbe ? "1" : "0");
		var probeText = new createjs.Text('Probes:  '+probeAmount, "20px Courier", "#00FF00");
		probeText.x += 64;
		probeText.y = STAGE_HEIGHT - 35;

		stage.addChild(probeText);

		var probe = new createjs.Bitmap(contentManager.iconPotion);
		probe.x = 0;
		probe.y = STAGE_HEIGHT - 61 - 32;
		stage.addChild(probe);

		var potAmount = (player.hasPotion ? "1" : "0");
		var probeText = new createjs.Text('Potions: '+potAmount, "20px Courier", "#00FF00");
		probeText.x += 64;
		probeText.y = STAGE_HEIGHT - 40 -32;

		stage.addChild(probeText);

		var playerHP = player.hp+"/"+player.maxhp
		var probeText = new createjs.Text('HP: '+playerHP, "20px Courier", "#00FF00");
		probeText.x += 64;
		probeText.y = STAGE_HEIGHT - 40 -32*2;

		stage.addChild(probeText);

		var playerDMG = player.damage
		var probeText = new createjs.Text('ATTK: '+playerDMG, "20px Courier", "#00FF00");
		probeText.x += 64;
		probeText.y = STAGE_HEIGHT - 40 -32*3;		
		stage.addChild(probeText);

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

		var scoreCalculator = new createjs.Text("Score: "+player.score, "50px Courier", "#00FF00");
		scoreCalculator.x = STAGE_WIDTH/3 - 100;
		scoreCalculator.y = STAGE_HEIGHT/3 + 100;
		stage.addChild(scoreCalculator);

		stage.update();
		stage.update();
	},
	nextlevel: function() {
		var t = new createjs.Shape();
		t.graphics.beginFill('00000').drawRect(0, 0,STAGE_WIDTH , STAGE_HEIGHT);
		t.alpha = 0.75;
		stage.addChild(t);

		var hpText = new createjs.Text('You win!', "50px Courier", "Blue");
		hpText.x = STAGE_WIDTH/3;
		hpText.y = STAGE_HEIGHT/3;
		stage.addChild(hpText);


		var scoreCalculator = new createjs.Text("Score: "+player.score, "50px Courier", "#00FF00");
		scoreCalculator.x = STAGE_WIDTH/3 - 100;
		scoreCalculator.y = STAGE_HEIGHT/3 + 100;
		stage.addChild(scoreCalculator);

		stage.update();
		createjs.Ticker.setPaused(true)
	}
}
