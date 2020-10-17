var trex, trexrunning;
var ground,groundimage,invisibleground;
var cloudimage
var obs1,obs2,obs3,obs4,obs5,obs6;
var score=0;
var cloudgroup;
var obstaclegroup;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var trexcollided;
var gameoverimg,gameover,restartimg,restart;
var jump ,die,checkpoint
function preload(){
  trexrunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcollided=loadAnimation("trex_collided.png");
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  groundimage=loadImage("ground2.png")
  cloudimage=loadImage("cloud.png")
  obs1=loadImage("obstacle1.png")
  obs2=loadImage("obstacle2.png")
  obs3=loadImage("obstacle3.png")
  obs4=loadImage("obstacle4.png")
  obs5=loadImage("obstacle5.png")
  obs6=loadImage("obstacle6.png")
  jump=loadSound("jump.mp3");
  checkpoint=loadSound("checkPoint.mp3");
  die=loadSound("die.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(200,150,10,40);
  trex.addAnimation("trex",trexrunning);
  trex.addAnimation("collided",trexcollided);
  trex.scale=0.5;
  trex.x=50;
  
  ground=createSprite(300,180,600,20);
  ground.x=ground.width/2;
  ground.addImage("ground",groundimage)
  cloudgroup=new Group();
  obstaclegroup=new Group();
  invisibleground=createSprite(300,185,600,5); 
  invisibleground.visible=false;
  gameover=createSprite(300,100);
  gameover.addImage(gameoverimg);
  gameover.scale=0.5;
  restart=createSprite(300,150);
  restart.addImage(restartimg);
  restart.scale=0.5;
  gameover.visible=false;
  restart.visible=false;
}

function draw() {
  background(180);
  text("Score: "+score,500,50);
  if(gamestate==PLAY){
    score=score+Math.round(frameCount/60);
    if(score>0 && score%100==0){
      checkpoint.play();
       }
  ground.velocityX=-(6+3*score/100);
    if(ground.x<0){
    ground.x=ground.width/2;
  }
    if(keyDown("space")&& trex.y>=159){ 
    trex.velocityY=-10;
      jump.play();
  }
  
  trex.velocityY=trex.velocityY+0.5;
     spawncloud();  
  spawnobstacle();
    if(obstaclegroup.isTouching(trex)){
      gamestate=END;
      die.play();
       }
     }
  
  else if(gamestate==END){
 ground.velocityX=0;
    trex.velocityY=0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trexcollided);
    gameover.visible=true;
  restart.visible=true;
 }         
  
  if(mousePressedOver(restart)){
    gamestate=PLAY;
    obstaclegroup.destroyEach();
     cloudgroup.destroyEach();
     gameover.visible=false;
  restart.visible=false;
    trex.changeAnimation("trex",trexrunning);
  }

  trex.collide(invisibleground);
  
  drawSprites();
}
function spawncloud(){
  if(World.frameCount %60 ==0){
     var cloud=createSprite(600,120,40,10);
  cloud.velocityX=-2;
    cloud.addImage("cloud",cloudimage);
    cloud.scale=0.5;
    cloud.y=random(70,120);
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1
    cloud.lifetime=300;
    cloudgroup.add(cloud);
}
 
}
function spawnobstacle(){
  if(World.frameCount%60==0){
    var obstacle=createSprite(600,165,10,40);
    obstacle.velocityX=-(6+3*score/100);
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1 : obstacle.addImage (obs1);
        break;
        case 2:obstacle.addImage (obs2);
        break;
        case 3:obstacle.addImage (obs3);
         break;
        case 4:obstacle.addImage (obs4);
         break;
        case 5:obstacle.addImage (obs5);
         break;
        case 6:obstacle.addImage (obs6);
        break;
        default: break;
    }
    obstacle.scale=0.5;
    obstacle.lifetime=100;
    obstaclegroup.add(obstacle);
     }
}