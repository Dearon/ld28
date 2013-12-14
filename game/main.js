function init() {
	var canvas = document.getElementById("game");
	var stage = new createjs.Stage(canvas);

	var bg = new createjs.Shape();
	bg.graphics.beginFill('#000').drawRect(0, 0, 650, 650);
	stage.addChild(bg);
	stage.update();

	var level = levelGeneration();

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

	stage.update();

	playerMovement(stage, level);
}
