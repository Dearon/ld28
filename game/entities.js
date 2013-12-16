var entities ={
	//Probe Entity Effect.
	createWhiteOut: function()
	{
		var whiteOutSpriteSheet = new createjs.SpriteSheet({
			framerate: 1,
			images: ["assets/images/whiteout.png"],
			frames: {width: 800, height: 601, regX: 400, regY: 300.5},
			animations: {
				start: [0,11,false]
			}
		});

		whiteOutSpriteSheet.x =
		whiteOutSpriteSheet.y = STAGE_HEIGHT/2;

		var whiteOut = {
			sprite: new createjs.Sprite(whiteOutSpriteSheet, "start"),
			TTL: 1.0,
			update: function(){
				if(this.TTL <= 0) {
					this.remove();
				}
				else {
					this.TTL -= 0.05;
					this.sprite.alpha = this.TTL;
					this.sprite.x =STAGE_WIDTH/2;
					this.sprite.y = STAGE_HEIGHT/2;
					stage.addChild(this.sprite);
				}
			},
			fadeout: function() {

			},
			remove: function(){
				//console.log(draw.entities.indexOf(this));
			}
		}
		draw.entities.push(whiteOut)
	}
}
