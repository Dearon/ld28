draw = {
	update: function() {
		this.background();
		this.checkBounds();
		this.map();
		this.mapOverview();
		stage.addChild(player.sprite);
	},
	background: function() {
		stage.addChild(bg);
		var bg = new createjs.Shape();
		bg.graphics.beginFill('#BBB').drawRect(STAGE_WIDTH/4, STAGE_HEIGHT/4, 400, 300);
		stage.addChild(bg);

		//Draw door ways.
		if(player.x <= level.length && player.x >= 0 && player.y <=level.length && player.y >= 0)
		{	
			//top
			if(this.checkBounds(player.x - 1, player.y) && level[player.x-1][player.y])
			{
				bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH/2-50, 0, 100, 150);
			}
			//left
			if(this.checkBounds(player.x, player.y - 1) && level[player.x][player.y-1])
			{
				bg.graphics.beginFill('#AAA').drawRect(0, STAGE_HEIGHT/2-50, 200, 100);
			}
			//down
			if(this.checkBounds(player.x+1, player.y) && level[player.x+1][player.y])
			{
				bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH/2-50, STAGE_HEIGHT, 100, -150);
			}
			//right
			if(this.checkBounds(player.x, player.y+1) && level[player.x][player.y+1])
			{
				bg.graphics.beginFill('#AAA').drawRect(STAGE_WIDTH, STAGE_HEIGHT/2-50, -200, 100);
			}
		}
	},
	checkBounds: function(i, j) {
		return(i <= level.length && i >= 0 && j <=level.length && j >= 0)
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
		var top = 20 + (20 * player.x);
		var left = 20 + (20 * player.y);

		var block = new createjs.Shape();
		block.graphics.beginFill('#ff0000').drawRect(left, top, 10, 10);
		stage.addChild(block);
	}
}
