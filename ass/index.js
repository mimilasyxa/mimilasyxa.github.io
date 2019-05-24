var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var circles = [];
var r,g,b;

canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

console.log(canvas.height,canvas.width);

class Circle {
    constructor(x,y,radius,dx,dy){
        this.xCoord = x;
        this.yCoord = y;
        this.raduis = radius;
        this.dx = dx;
        this.dy = dy;
        this.style = getRGB();
    }
    collisionD(){
        if (this.xCoord - this.raduis < 0 || this.xCoord + this.raduis > canvas.width){
        this.dx = -this.dx; 
        this.style = getRGB();
        }
        if (this.yCoord - this.raduis < 0 || this.yCoord + this.raduis > canvas.height){
        this.dy = -this.dy;
        this.style = getRGB();
        }
    }
    draw(){
        ctx.fillStyle = this.style;
        ctx.lineTo(this.xCoord,this.yCoord);
        ctx.lineTo(this.xCoord - this.raduis/1.5, this.yCoord - this.raduis/1.5);
        ctx.lineTo(this.xCoord , this.yCoord + this.raduis/1.5);
        ctx.arc(this.xCoord,this.yCoord,this.raduis,0,Math.PI*2);
    }
    update(){
        this.xCoord = this.xCoord + this.dx;
        this.yCoord = this.yCoord + this.dy;
        ctx.beginPath();
        this.draw(this.xCoord,this.yCoord);
        this.collisionD();
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }

}

for (var i=0;i<200;i++)
    circles[i] = new Circle(giveW(),giveH(),Math.random()*40,(Math.random() - 0.5) * 10,(Math.random() - 0.5) * 10);

window.requestAnimationFrame(drawing)
function drawing(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i<circles.length ; i++){
        circles[i].update();    
    }
    window.requestAnimationFrame(drawing)
    }

function giveW(){
    do {
        var W = (Math.random() * 1000 * 1.6);
    }
    while(W + 100> canvas.width || W - 100 < 0)
    return W;
}

function giveH(){
    do {
        var H = (Math.random() * 1000);
    }
    while(H + 100> canvas.height || H - 100 < 0)
    return H;
}

function getRGB(){
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    return ["rgb(" + r + "," + g + "," + b + ")"];
}
