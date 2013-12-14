function init() {
	var canvas = document.getElementById("game");
	var stage = new createjs.Stage(canvas);

	var bg = new createjs.Shape();
	bg.graphics.beginFill('#000').drawRect(0, 0, 650, 650);
	stage.addChild(bg);
	stage.update();;
}
