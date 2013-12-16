function init() {
	//Globals
	STAGE_WIDTH = 800;
	STAGE_HEIGHT = 600;

	var canvas = document.getElementById("game");
	stage = new createjs.Stage(canvas);

	level = levelTools.create();
	enemyTools.generateEnemies();
	player = createPlayer();

	//Initialise first visited section
	level[player.y][player.x].visited = true;
	// Draw any updates that have happened
	createjs.Ticker.addEventListener("tick", update);
	// Listen to any inputs
	input();
}

function update(event)
{
	//TODO:Player access index.
	if(!event.paused)
	{
		stage.removeAllChildren();
		draw.update();
		stage.update();
	}
}
