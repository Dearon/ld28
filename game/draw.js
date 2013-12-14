draw = {
	update: function() {
		this.background();
		this.map();
		this.mapOverview();
		stage.addChild(player.sprite);
	},
	background: function() {
		stage.addChild(bg);
		var bg = new createjs.Shape();
		bg.graphics.beginFill('#BBB').drawRect(STAGE_WIDTH/4, STAGE_HEIGHT/4, 400, 300);
		stage.addChild(bg);

		var directions = levelTools.canMove();

		if (directions.up) {
			bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH/2-50, 0, 100, 150);
		}
		if (directions.down) {
			bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH/2-50, STAGE_HEIGHT, 100, -150);
		}
		if (directions.left) {
			bg.graphics.beginFill('#AAA').drawRect(0, STAGE_HEIGHT/2-50, 200, 100);
		}
		if (directions.right) {
			bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH, STAGE_HEIGHT/2-50, -200, 100);
		}
	},
	map: function() {
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
	},
	mapOverview: function() {
		var top = 20 + (20 * player.y);
		var left = 20 + (20 * player.x);

		var block = new createjs.Shape();
		block.graphics.beginFill('#ff0000').drawRect(left, top, 10, 10);
		stage.addChild(block);
	}
}
