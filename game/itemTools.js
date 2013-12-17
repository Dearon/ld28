var itemTools = {
	generateItems: function() {
		for(var i = 0; i < level.length; i++) {
			for(var j = 0; j < level[0].length; j++) {
				if(level[i][j] && ! level[i][j].exit && level[i][j].enemies.length == 0) {
					if (Math.random() >= 0.75) {
						var chest = items.chest();
						level[i][j].items.push(chest);
					}
				}

			}
		}
	},
};

