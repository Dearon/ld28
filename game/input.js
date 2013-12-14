function playerMovement(stage, level) {
	var x = player.x;
	var y = player.y;

	Mousetrap.bind('up', function() {
		player.x-=1;
		drawPlayerMap(stage, level, x, y);
	});
	Mousetrap.bind('down', function() {
		player.x+=1;
		drawPlayerMap(stage, level, x, y);
	});
	Mousetrap.bind('left', function() {
		player.y-=1;
		drawPlayerMap(stage, level, x, y);
	});
	Mousetrap.bind('right', function() {
		player.y+=1;
		drawPlayerMap(stage, level, x, y);
	});
}
