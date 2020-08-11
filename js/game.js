var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/suslik.png";
bg.src = "img/bg_2.png";
fg.src = "img/fg_2.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 400;

// При нажатии на какую-либо кнопку
/*
document.addEventListener("keydown", moveUp);

function moveUp() {
 yPos -= 25;
 fly.play();
}
*/




// Создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
// Позиция персонажа
var xPos = 400;
var yPos = 340;
var grav = 10;

document.addEventListener("keyup", move);

function move(){
	if(event.code == 'ArrowRight'){
		xPos += 25;
	}
	else if(event.code == 'ArrowLeft'){
		xPos -= 25;
	}
	else if(event.code == 'ArrowUp' || yPos < 240){
		yPos = 240;
	}

	/*
	else if(event.code == 'ArrowDown'){
		yPos += 25;
	}
	*/	

}

document.addEventListener("keyup", gravity);

function gravity(){
	if(yPos == 240){
		
		var jump = setInterval(function(){
			yPos += grav;
			if (yPos >= 340){
				clearInterval(jump);	
			}
		}, 100);
	}
};






function draw() {
 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x--;

 if(pipe[i].x == 125) {
 pipe.push({ 
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 // Отслеживание прикосновений
 /*
 if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
 location.reload(); // Перезагрузка страницы
 }
*/
 if(pipe[i].x == 5) {
 score++;
 score_audio.play();
 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);

// yPos += grav;



 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Score: " + score, 10, cvs.height - 20);

 requestAnimationFrame(draw);
}

pipeBottom.onload = draw;