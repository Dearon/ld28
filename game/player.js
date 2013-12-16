function createPlayer() {
	var playerSpriteSheet = new createjs.SpriteSheet({
		framerate: 1,
		images: ["assets/images/player.png"],
		frames: {width: 96, height: 96, regX: 48, regY: 48},
		animations: {
			stand: [0,7,"stand"],
			die: [9, 18, false],
			attack: [18, 20, "stand"]
		}
	});

	var playerSprite = new createjs.Sprite(playerSpriteSheet, "stand");
	playerSprite.x = STAGE_WIDTH/2;
	playerSprite.y = STAGE_HEIGHT/2;

	var player = {
		sprite: playerSprite,
		x: Math.floor(level.length/2),
		y: Math.floor(level[0].length/2),
		maxhp: 100,
		hp: 100,
		damage: 25,
		inBattle: false,
		hasProbe: true,
		hasPotion: true,
		move: function(direction) {
			var directions = levelTools.canMove(player.x, player.y);
			if(!player.inBattle) 
			{
				if (directions[direction]) 
				{
					if (direction == 'up') 
					{
						this.y -= 1;
					}
					if (direction == 'down') {
						this.y += 1;
					}
					if (direction == 'left') {
						this.x -= 1;
					}
					if (direction == 'right') {
						this.x += 1;
					}
				}
			}
			level[this.y][this.x].visited = true;
			console.log(this.x + " - " + this.y);
		},
		selectNext: function() {
			var enemies = level[player.y][player.x]['enemies'];
			var next = false;

			if (enemies.length > 0) {
				$.each(enemies, function(index, item) {
					if (next) {
						item['selected'] = true;
						next = false;
					} else if (item['selected']) {
						item['selected'] = false;
						next = true;
					}
				});

				if (next) {
					enemies[0]['selected'] = true;
				}
			}
		},
		useSelection: function() {
			var enemies = level[player.y][player.x]['enemies'];
			var items = level[player.y][player.x]['items'];

			if (enemies.length > 0) {
				var enemy = {};
				var enemyIndex = 0;

				$.each(enemies, function(index, item) {
					if (item['selected']) {
						enemy = item;
						enemyIndex = index;
						attack = true;
					}
				});

				enemy.hp -= player.damage;

				if (enemy.hp <= 0) {
					enemies.splice(enemyIndex, 1);

					if (enemies.length > 0) {
						enemies[0]['selected'] = true;
					}
				}
				//Attack player animation.
				player.sprite.gotoAndPlay("attack");


				$.each(enemies, function(index, item) {
					item.sprite.gotoAndPlay('attack');
					player.hp -= enemy.damage;
				});
			}

			if (items.length > 0) {
				$.each(items, function(index, item) {
					if (! item.opened) {
						item.sprite.gotoAndPlay('open');
						item.opened = true;

						var random = 2;

						if (! player.hasProbe) {
							random += 1;
						}

						if (! player.hasPotion) {
							random += 1;
						}

						var roll = Math.round(Math.random() * (random - 1) + 1);
						console.log(roll);

						if (roll == 1) {
							console.log(player.hp);
							player.maxhp += 10;
							player.hp += 10;
						} else if (roll == 2) {
							player.damage += 10;
						} else {
							if (player.hasProbe && ! player.hasPotion) {
								player.hasPotion = true;
							} if (! player.hasProbe && player.hasPotion) {
								player.hasProbe = true;
							} else {
								var secondRoll = Math.round(Math.random() * (2 - 1) + 1);

								if (secondRoll == 1) {
									player.hasProbe = true;
								} else {
									player.hasPotion = true;
								}
							}
						}
					}
				});
			}

			if (level[player.y][player.x].exit) {
				console.log('Freedom!');
			}
		},
		useProbe: function(){
			if(this.hasProbe === true) {
				entities.createWhiteOut();
				for(var i = -1; i < 2; i++) {
					for(var j = -1; j < 2; j++) {
					
						if (player.x + i >= 0 && player.x + i < level.length && 
							player.y + j >= 0 && player.y + j < level[0].length)
						{
							level[player.y+j][player.x+i].visited = true;
						}
					}
				}
			}
			this.hasProbe = false;
			console.log(this.hasProbe);
		},
		usePotion: function(){
			if(this.hasPotion)
			{
				this.hp += 50;

				if(this.hp > this.maxhp)
					this.hp = this.maxhp;

				this.hasPotion = false;
			}
		}
	}

	return player;
}
