const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

let player = {x:100,y:400}
let ball = {x:120,y:380,vx:0,vy:0,shoot:false}

let hoop = {x:800,y:200}

let score = 0

document.addEventListener("keydown",e=>{

if(e.key=="ArrowRight") player.x+=10
if(e.key=="ArrowLeft") player.x-=10

if(e.key==" " && !ball.shoot){

ball.shoot=true
ball.vx=10
ball.vy=-12

}

})

function update(){

if(!ball.shoot){

ball.x=player.x+20
ball.y=player.y

}

if(ball.shoot){

ball.x+=ball.vx
ball.y+=ball.vy
ball.vy+=0.5

}

if(ball.x>hoop.x && ball.y<hoop.y+50){

score++
ball.shoot=false

}

}

function draw(){

ctx.clearRect(0,0,900,500)

ctx.fillStyle="blue"
ctx.fillRect(player.x,player.y,40,80)

ctx.beginPath()
ctx.arc(ball.x,ball.y,10,0,Math.PI*2)
ctx.fillStyle="orange"
ctx.fill()

ctx.fillStyle="red"
ctx.fillRect(hoop.x,hoop.y,10,80)

ctx.fillStyle="white"
ctx.font="20px Arial"
ctx.fillText("Score: "+score,20,30)

}

function loop(){

update()
draw()
requestAnimationFrame(loop)

}

loop()