function init() {
	//Globals
	STAGE_WIDTH = 800;
	STAGE_HEIGHT = 600;

	var canvas = document.getElementById("game");
	stage = new createjs.Stage(canvas);

	level = levelGeneration(); 

	player = createPlayer();
	
	createjs.Ticker.addEventListener("tick", update);
}

function update(event)
{
	//TODO:Player access index.
	stage.removeAllChildren();
	drawBackground();
	drawMap();
	stage.addChild(player.sprite);
	playerMovement(stage, level);

	stage.update();
}

function drawBackground()
{
	stage.addChild(bg);
	var bg = new createjs.Shape();
	bg.graphics.beginFill('#BBB').drawRect(STAGE_WIDTH/4, STAGE_HEIGHT/4, 400, 300);
	stage.addChild(bg);

	//Draw door ways.
	if(player.x <= level.length && player.x >= 0 && player.y <=level.length && player.y >= 0)
	{	
		//top
		if(checkBounds(player.x - 1, player.y) && level[player.x-1][player.y])
		{
			bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH/2-50, 0, 100, 150);
		}
		//left
		if(checkBounds(player.x, player.y - 1) && level[player.x][player.y-1])
		{
			bg.graphics.beginFill('#AAA').drawRect(0, STAGE_HEIGHT/2-50, 200, 100);
		}
		//down
		if(checkBounds(player.x+1, player.y) && level[player.x+1][player.y])
		{

			bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH/2-50, STAGE_HEIGHT, 100, -150);
		}
		//right
		if(checkBounds(player.x, player.y+1) && level[player.x][player.y+1])
		{
			bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH, STAGE_HEIGHT/2-50, -200, 100);
		}
	}
}
function checkBounds(i, j)
{
	return(i <= level.length && i >= 0 && j <=level.length && j >= 0)
}

function drawMap()
{
	$.each(level, function(index, item) {
		$.each(item, function(innerIndex, innerItem) {
			if (innerItem) {
				var top = 20 + (20 * index);
				var left = 20 + (20 * innerIndex);

				var block = new createjs.Shape();
				block.graphics.beginFill('#fff').drawRect(left, top, 10, 10);
				stage.addChild(block);
			}
		});
	});
}
