var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var challenge=["#1","#2","#3","#4","#5","#6","#7","#8","#9","#10","#11","#12"];
var timeR = Math.random() *(400 - 150) + 150;
var userInput;a = 0; 

canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

canvH = canvas.height;
canvW = canvas.width;

// подготовка, создание секторов / текста
function text(){
    ctx.beginPath();
    ctx.save()
    ctx.translate(canvW/2, canvH/2);
    ctx.rotate(((180/challenge.length) - 2)* Math.PI/180);
    ctx.font = "20px Arial";
    ctx.fillText(challenge[0],75,11); 
    for (var i = 1; i<challenge.length ;i++){
    ctx.rotate(180/challenge.length*2 * Math.PI/180);
    ctx.fillText(challenge[i], 75,11); 
    }
    ctx.restore();
    ctx.closePath();
}

function draw() {
    ctx.beginPath()
    ctx.strokeStyle = "RGB(255,155,0)"
    ctx.lineTo(canvW/2, canvH/2);
    ctx.arc(canvW/2 ,canvH/2 ,400 ,0 , (180/challenge.length * 2) * Math.PI/180);
    ctx.lineTo(canvW/2, canvH/2);
    for (var i = 1 ; i<challenge.length ; i++){
    ctx.arc(canvW/2 ,canvH/2 ,400 ,i * (180/challenge.length*2) * Math.PI/180 ,(i + 1) * (180/challenge.length*2) * Math.PI/180);
    ctx.lineTo(canvW/2, canvH/2);
    }
    ctx.stroke();
    ctx.closePath();
}

function arrow(){
    ctx.fillStyle = "RGB(255,155,0)";
    ctx.beginPath();
    ctx.moveTo(canvW/2 + 450, canvH/2);
    ctx.lineTo(canvW/2 + 450 + 30, canvH/2 - 10);
    ctx.lineTo(canvW/2 + 450 + 30, canvH/2 + 10);
    ctx.closePath();
    ctx.stroke();
}

function startBTN(){
    ctx.beginPath();
    ctx.moveTo(canvW/2 + 490, canvH/2 - 20);
    ctx.lineTo(canvW/2 + 490 + 100, canvH/2 - 20);
    ctx.lineTo(canvW/2 + 490 + 100, canvH/2 + 20);
    ctx.lineTo(canvW/2 + 490, canvH/2 + 20);
    ctx.font = "30px Arial";
    ctx.fillText("START",canvW/2 + 492,canvH/2 + 10); 
    ctx.closePath();
    ctx.stroke();
}

function ownChallenges(){
    ctx.beginPath();
    ctx.strokeStyle = "RGB(255,155,0)";
    ctx.moveTo(canvW/2 - 710, canvH/2 - 20);
    ctx.lineTo(canvW/2 - 435, canvH/2 - 20);
    ctx.lineTo(canvW/2 - 435, canvH/2 + 20);
    ctx.lineTo(canvW/2 - 710, canvH/2 + 20);
    ctx.font = "30px Arial";
    ctx.fillText("OWN OUTCOMES",canvW/2 - 700,canvH/2 + 10); 
    ctx.closePath();
    ctx.stroke();
}

function updateCanv(){ //Очистка всего канваса для новых данных от ввода пользователя
    ctx.clearRect(0,0,canvW,canvH);
    ownChallenges();
    draw();
    text();
    arrow();
    startBTN();
}
updateCanv();

canvas.addEventListener("click", function(event){ // проверка находится ли курсор внутри кнопки START / OWN OUTCOMES
    x = event.clientX;
    y = event.clientY;
    if ((x > canvW/2 + 490 && x < canvW/2 + 590)&(y > canvH/2 - 20 && y < canvH/2 + 20)){
        mainDraw();
    }
    if ((x > canvW/2 - 710 && x < canvW/2 - 435)&(y > canvH/2 - 20 && y < canvH/2 + 20)){
       userInput = prompt("To make your own wheel you need to write down outcomes divided by comma.Then press OK.\nДля создания собственного колеса фортуны вам необходимо вписать исходы разделённые запятой.Затем нажать OK");
       challenge =  userInput.split(",");
       updateCanv();
    }
})
// дальше будет сама анимация
function mainDraw(){
    ctx.clearRect(0 ,0 ,canvW ,canvH);
    ownChallenges();
    arrow();
    startBTN();
    ctx.save();
    ctx.translate(canvW/2, canvH/2);
    ctx.rotate(a * 1.1* Math.PI/180);
    ctx.translate(-canvW/2, -canvH/2);
    draw();
    text();
    ctx.restore();
    a+=5;
    if (a < timeR){
    window.requestAnimationFrame(mainDraw);
    }
    else {
        stop;
        a = 0;
        timeR = Math.random() *(400 - 150) + 150;
    }
}


