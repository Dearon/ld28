function input() {
	var x = player.x;
	var y = player.y;

	Mousetrap.bind('up', function() {
		player.move('up');
	});
	Mousetrap.bind('down', function() {
		player.move('down');
	});
	Mousetrap.bind('left', function() {
		player.move('left');
	});
	Mousetrap.bind('right', function() {
		player.move('right');
	});
	Mousetrap.bind('ctrl', function() {
		player.selectNextEnemy();
	});
}
