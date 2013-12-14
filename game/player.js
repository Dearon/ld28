function playerMovement(stage, level) {
	var x = Math.ceil(level.length / 2);
	var y = Math.ceil(level[0].length / 2);

	drawPlayer(stage, level, x, y);

	Mousetrap.bind('up', function() {
		x-=1;
		drawPlayer(stage, level, x, y);
	});
	Mousetrap.bind('down', function() {
		x+=1;
		drawPlayer(stage, level, x, y);
	});
	Mousetrap.bind('left', function() {
		y-=1;
		drawPlayer(stage, level, x, y);
	});
	Mousetrap.bind('right', function() {
		y+=1;
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
