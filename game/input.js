function input() {
	var x = player.x;
	var y = player.y;

	Mousetrap.bind('up', function() {
		player.move('up');
		return false;
	});
	Mousetrap.bind('down', function() {
		player.move('down');
		return false;
	});
	Mousetrap.bind('left', function() {
		player.move('left');
		return false;
	});
	Mousetrap.bind('right', function() {
		player.move('right');
		return false;
	});
	Mousetrap.bind('ctrl', function() {
		player.selectNextEnemy();
		return false;
	});
	Mousetrap.bind('space', function() {
		player.attackEnemy();
		return false;
	});
}
