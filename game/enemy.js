
var enemyTypes = ["witch"];

function createEnemy(x, y, type) {
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

	var enemy = enemyAttributes(type, enemySprite)

	return enemy;
}

function createRandomEnemy(x, y)
{
	
	var rangeRand = Math.floor(Math.random()*enemyTypes.length);


	return createEnemy(x,y,enemyTypes[rangeRand]);
}

function enemyAttributes(type, spritesheet)
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