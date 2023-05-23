var cloud,cloudImg;
var trex,trexRunning;
var ground,groundImg;
var visibleGround;
var cacto,cactoimg1,cactoimg2,cactoimg3,cactoimg4,cactoimg5,cactoimg6;
var score=0;
var play=1;  
var end=0;
var gameState=play;
var cloudGp,cactosGp;
var trexcolide;
var gameOver,gameOverimg;
var restart,restartimg;
var jumpSound, pointSound, dieSound;
var record=0

//preload carrega as midías do jogo 
function preload(){
  trexRunning = loadAnimation ("trex1.png","trex3.png","trex4.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage ("cloud.png");
  cactoimg1 = loadImage ("obstacle1.png");
  cactoimg2 = loadImage ("obstacle2.png");
  cactoimg3 = loadImage ("obstacle3.png");
  cactoimg4 = loadImage ("obstacle4.png");
  cactoimg5 = loadImage ("obstacle5.png");
  cactoimg6 = loadImage ("obstacle6.png");
  trexcolide = loadAnimation("trex_collided.png");
  gameOverimg = loadImage ("gameOver.png");
  restartimg = loadImage ("restart.png");
  jumpSound = loadSound("jump.mp3");
  pointSound = loadSound("checkpoint.mp3");
  dieSound = loadSound("die.mp3");

}
//setup faz a aconfiguração
function setup(){
  createCanvas(windowWidth,windowHeight);
 
  trex = createSprite (50,height-40,50);
  trex.addAnimation("running",trexRunning);
  trex.addAnimation("collided",trexcolide);
  trex.scale = 0.5;
  trex.debug = false;           
  trex.setCollider("rectangle",0,0,40,60);
  //trex.setCollider("circle",0,0,30);

  ground = createSprite (width/2,height-40,width,2);
  ground.addImage("ground",groundImg);
  visibleGround = createSprite(width/2,height-20,width,2); 
  visibleGround.visible = false;

  cactosGp = new Group();
  cloudGp = new Group();

  gameOver = createSprite (width/2,height-120);
  gameOver.addImage(gameOverimg);
  gameOver.scale = 0.5;
  gameOver.visible = false

  restart = createSprite (width/2,height-80);
  restart.addImage (restartimg);
  restart.scale = 0.5
  restart.visible = false

 
}
//draw faz o movimento, a ação do jogo
function draw(){
  background("#f0f9f7");

  text("Score: "+score,width-74,height-180);
  
  text("record: "+record,width-74,height-165);

  if (gameState === play){
    ground.velocityX = -(4*score/100);
    if(ground.x<0){
      ground.x = ground.width/2
  }
    score+= Math.round(getFrameRate()/60);

    if (score>0&&score %100===0){
      pointSound.play();
    }

    if (touches.length>0||keyDown ("space")&&trex.y>=height-50){
      trex.velocityY =-10;
      jumpSound.play(); 
      touches=[]
    }
    createcloud();
    createcactos();

    
  }

  if (trex.isTouching(cactosGp)){
    gameState = end 
    
    //dieSound.play();
  }

  if (gameState === end){
  trex.changeAnimation("collided",trexcolide);
  cactosGp.setVelocityXEach(0);

  cloudGp.setVelocityXEach(0);

  cactosGp.setLifetimeEach(-1);

  cloudGp.setLifetimeEach(-1);

  if (record<score){
record=score;
}
  ground.velocityX = 0;
  trex.velocityX = 0; 
  
  gameOver.visible = true;
  restart.visible = true;
  
  if (mousePressedOver(restart)){
 gameState = play;

 gameOver.visible = false;
 restart.visible = false;

trex.changeAnimation("running",trexRunning);

score=0   


cactosGp.destroyEach();
cloudGp.destroyEach();


}
  
 
  }

  trex.velocityY +=0.5;

  trex.collide (visibleGround);

var sorte = Math.round(random(0,6));

   //coordenadas do mouse na tela
  
  drawSprites();
  text("X: "+mouseX+"/ Y: "+mouseY,mouseX,mouseY);
}

function createcloud(){
if  (frameCount % 80 === 0){
cloud = createSprite(width,random(height-190,height-100),40,10);

cloud.velocityX = -(4+score/100); 

cloud.addImage (cloudImg);

cloud.scale = random (0.4,1.3);

cloud.depth = trex.depth-1;

cloud.lifetime = 220;

cloudGp.add(cloud);
}

}

  function createcactos(){
if (frameCount % 60 === 0){
  cacto = createSprite(width, height-40, 40, 10);

  cacto.velocityX = -(6+score/100);
  cacto.scale = 0.5;
  cacto.lifetime = 220;
  cacto.depth = trex.depth+1

cactosGp.add(cacto);
  var lucky = Math.round(random(1,6));
  switch (lucky) {
    case 1:cacto.addImage(cactoimg1);
      break;
    case 2:cacto.addImage(cactoimg2);
      break;   
    case 3:cacto.addImage(cactoimg3);
      break;
    case 4:cacto.addImage(cactoimg4);
      break;
    case 5:cacto.addImage(cactoimg5);
      break;
    case 6:cacto.addImage(cactoimg6);
      break;

  }
}//easteregg
  }

