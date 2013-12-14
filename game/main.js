
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
	ilevel = level.length; jlevel = level.length;
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
	createjs.Ticker.addEventListener("tick", update);
	stage.update();
}

function update(event)
{
	//TODO:Player access index.
	stage.removeAllChildren();
	drawMap();
	stage.update();
}

function drawMap()
{

	// stage.addChild(bg);
	// var bg = new createjs.Shape();
	// bg.graphics.beginFill('#BBB').drawRect(STAGE_WIDTH/4, STAGE_HEIGHT/4, 400, 300);
	// stage.addChild(bg);

	// //Draw door ways.
	// var tempi = ilevel, tempj = jlevel;
	// if(tempi > 0)
	// {
	// 	console.log("THERE IS A PATH!");
	// }


}

