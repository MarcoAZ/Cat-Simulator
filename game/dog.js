// get reference to dog image
var dogSprites = new Image();
dogSprites.src = "../assets/dog.png";

var dog = {
	name: "Dog",
	width: 70,
	height: 60,
	x: 30,
	y: house.topMold.height+house.wall.height+house.wallpaper.height+30,
	speed: 10,
	friction: 0.85,
	velX: 0,
	velY: 0,
	currFrame: 0,
	yFrame: null,
	yLastFrame: null,
	lastFrame: null,
	idleFrame: null,
	canChase: true,
	health: 100
}

dog.chaseInit = function(catX, catY) {
	var targetX = catX - dog.x;
	var targetY = catY - dog.y;
	if (targetX > 0) {
		var startFrame = 0;
		dog.currFrame = startFrame;
		dog.lastFrame = 8;
		dog.idleFrame = 34;
	}
	else{
		var startFrame = 9;
		dog.currFrame = startFrame;
		dog.lastFrame = 17;
		dog.idleFrame = 35;
	}
	if (targetY < 0) {
		var yStartFrame = 18;
		dog.yFrame = yStartFrame;
		dog.yLastFrame = 25;
	}
	else{
		var yStartFrame = 26;
		dog.yFrame = yStartFrame;
		dog.yLastFrame = 33;
	}

	return {
		startFrame: startFrame,
		yStartFrame: yStartFrame,
		targetX: targetX,
		targetY: targetY
	}
};


var chaseData;
var	startFrame, yStartFrame;
var cX, cY;
var tX, tY;

var startRestTime;

dog.chase = function(catX, catY) {
	if(dog.canChase){
		dog.canChase = false;
		chaseData = dog.chaseInit(catX, catY);
		startFrame = chaseData.startFrame;
		yStartFrame = chaseData.yStartFrame;
		cX = catX;
		cY = catY;
		tX = chaseData.targetX;
		tY = chaseData.targetY;

		requestAnimationFrame(dog.chase);
	}
	else{
		dog.velX *= dog.friction;
		dog.velY *= dog.friction;

		if(tX > 0){
			if(dog.velX < dog.speed){
				dog.velX++;
			}
		}
		else{
			if (dog.velX > -dog.speed) {
				dog.velX--;
			}
		}

		if (tY > 0) {
			if (dog.velY < dog.speed) {
				dog.velY++;
			}
		}
		else{
			if (dog.velY > -dog.speed) {
				dog.velY--;
			}
		}

		if (Math.abs(cX - dog.x) - dog.width/5 > 0) {
			dog.x += dog.velX;
			if(tick % 2 ===0){
				dog.currFrame++;
				if (dog.currFrame > dog.lastFrame) {
					dog.currFrame = startFrame;
				}
			}
			requestAnimationFrame(dog.chase);
		}
		else if (Math.abs(cY - dog.y) - dog.height/5 > 0) {
			dog.y += dog.velY;
			if(tick % 2 === 0){
				dog.currFrame++;
				if (dog.currFrame < yStartFrame || dog.currFrame > dog.yLastFrame) {
					dog.currFrame = yStartFrame;
				}
			}
			requestAnimationFrame(dog.chase);
		}
		else{
			dog.currFrame = dog.idleFrame;
			cancelAnimationFrame(dog.chase);

			if (dog.tiredFromChasing() ) {
				startRestTime = Date.now();
				dog.rest();
			}
			else{
				dog.canChase = true;
			}
		}
	}
};

var timesChased = 0;
dog.tiredFromChasing = function() {
	timesChased++;
	if (timesChased % 5 == 0) {
		return true;
	}
	else{
		return false;
	}
};

dog.rest = function() {
	var currentTime = Date.now();
	var timePassedInSeconds = (currentTime - startRestTime)/1000;

	if (timePassedInSeconds < 4) {
		requestAnimationFrame(dog.rest);
	}
	else{
		dog.canChase = true;
		//later will replace with bark() attack which sets this var to true.
	}
	
};


var wait = -1;
dog.AI = function(){
	wait++;
	if (wait % 100 === 0 && dog.canChase) {
		dog.chase(cat.x, cat.y);
	}

	//border collisions
	if(dog.x > width - cat.width){
		dog.x = width - cat.width;
	}
	else if(dog.x < 0){
		dog.x = 0;
	}
	if (dog.y < house.topMold.height+house.wall.height+house.wallpaper.height - cat.height){
		dog.y = house.topMold.height+house.wall.height+house.wallpaper.height - cat.height;
	}
	else if (dog.y > height - cat.height) {
		dog.y = height - cat.height;
	}
};

// a drawing function
dog.draw = function() {
	ctx.drawImage(dogSprites,
		dogAnim[dog.currFrame].x, dogAnim[dog.currFrame].y, dog.width, dog.height,
		dog.x, dog.y, dog.width, dog.height);
	healthBar(dog.name, dog.health, 280, 35);
};

// an array with each sprite frame
var dogAnim = [];
dogAnim[0] = {x: 0, y: 0}; //right
dogAnim[1] = {x: 70, y: 0};
dogAnim[2] = {x: 140, y: 0};
dogAnim[3] = {x: 210, y: 0};
dogAnim[4] = {x: 280, y: 0};
dogAnim[5] = {x: 350, y: 0};
dogAnim[6] = {x: 420, y: 0};
dogAnim[7] = {x: 490, y: 0};
dogAnim[8] = {x: 560, y: 0};
dogAnim[9] = {x: 0, y: 60}; //left
dogAnim[10] = {x: 70, y: 60};
dogAnim[11] = {x: 140, y: 60};
dogAnim[12] = {x: 210, y: 60};
dogAnim[13] = {x: 280, y: 60};
dogAnim[14] = {x: 350, y: 60};
dogAnim[15] = {x: 420, y: 60};
dogAnim[16] = {x: 490, y: 60};
dogAnim[17] = {x: 560, y: 60};
dogAnim[18] = {x: 0, y: 120}; //up
dogAnim[19] = {x: 70, y: 120};
dogAnim[20] = {x: 140, y: 120};
dogAnim[21] = {x: 210, y: 120};
dogAnim[22] = {x: 280, y: 120};
dogAnim[23] = {x: 350, y: 120};
dogAnim[24] = {x: 420, y: 120};
dogAnim[25] = {x: 490, y: 120};
dogAnim[26] = {x: 0, y: 180}; //down
dogAnim[27] = {x: 70, y: 180};
dogAnim[28] = {x: 140, y: 180};
dogAnim[29] = {x: 210, y: 180};
dogAnim[30] = {x: 280, y: 180};
dogAnim[31] = {x: 350, y: 180};
dogAnim[32] = {x: 420, y: 180};
dogAnim[33] = {x: 490, y: 180};
dogAnim[34] = {x: 560, y: 120}; //idle right
dogAnim[35] = {x: 560, y: 180}; //idle left
