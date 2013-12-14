function playerMovement(stage, level) {
	var x = player.x;
	var y = player.y;

	Mousetrap.bind('up', function() {
		player.x-=1;
	});
	Mousetrap.bind('down', function() {
		player.x+=1;
	});
	Mousetrap.bind('left', function() {
		player.y-=1;
	});
	Mousetrap.bind('right', function() {
		player.y+=1;
	});
}
