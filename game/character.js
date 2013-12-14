(function(window){
	var Character = function (imgCharacter)
	{
		this.initialize();
	}
	// Character inherits from BitmapAnimation
  	// Variables.
	Character.prototype = new createjs.Sprite();
	Character.prototype.BitmapAnimation_initialize = Character.prototype.initialize;
	Character.prototype.initialize = function() {
		var localSpriteSheet = new createjs.SpriteSheet({
			framerate:  1,
			images: ["assets/images/player.png"],
			frames: {width: 32, height: 32, regX: 16, regY: 16},
			animations: {
				stand: [0,8,"stand"],
				die: [2, 13, false]
			}
		});
		this.BitmapAnimation_initialize(localSpriteSheet);
		this.gotoAndPlay("stand");
	}

	window.Character = Character;
}(window))