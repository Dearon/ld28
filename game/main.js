
function init() {
	//Globals
	STAGE_WIDTH = 800; STAGE_HEIGHT = 600;
	level = null; 
	//Intialise level index for player movement.
	
	stage = null;

	var canvas = document.getElementById("game");
	stage = new createjs.Stage(canvas);


	
	stage.update();

	level = levelGeneration(); 
	ilevel = Math.floor(level.length/2); jlevel = Math.floor(level[0].length/2)	;
	drawMap();
	createjs.Ticker.addEventListener("tick", update);

	Player = new Character("4");
	Player.x = STAGE_WIDTH/2;
	Player.y = STAGE_HEIGHT/2;

	stage.addChild(Player);

	stage.update();
}

function update(event)
{
	//TODO:Player access index.
	stage.removeAllChildren();
	drawBackground();
	drawMap();
	stage.addChild(Player);
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
	if(ilevel <= level.length && ilevel >= 0 && jlevel <=level.length && jlevel >= 0)
	{	
		//top
		if(checkBounds(ilevel - 1, jlevel) && level[ilevel-1][jlevel])
		{
			bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH/2-50, 0, 100, 150);
		}
		//left
		if(checkBounds(ilevel, jlevel - 1) && level[ilevel][jlevel-1])
		{
			bg.graphics.beginFill('#AAA').drawRect(0, STAGE_HEIGHT/2-50, 200, 100);
		}
		//down
		if(checkBounds(ilevel+1, jlevel) && level[ilevel+1][jlevel])
		{

			bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH/2-50, STAGE_HEIGHT, 100, -150);
		}
		//right
		if(checkBounds(ilevel, jlevel+1) && level[ilevel][jlevel+1])
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


