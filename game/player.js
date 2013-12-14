function playerMovement(stage, level) {
	var x = ilevel;
	var y = jlevel;

	drawPlayer(stage, level, x, y);

	Mousetrap.bind('up', function() {
		ilevel-=1;
		drawPlayer(stage, level, x, y);
	});
	Mousetrap.bind('down', function() {
		ilevel+=1;
		drawPlayer(stage, level, x, y);
	});
	Mousetrap.bind('left', function() {
		jlevel-=1;
		drawPlayer(stage, level, x, y);
	});
	Mousetrap.bind('right', function() {
		jlevel+=1;
		drawPlayer(stage, level, x, y);
	});
}

function drawPlayer(stage, level, x, y) {
	var top = 20 + (20 * x);
	var left = 20 + (20 * y);

	var block = new createjs.Shape();
	block.graphics.beginFill('#ff0000').drawRect(left, top, 10, 10);
	stage.addChild(block);

	stage.update();
}
