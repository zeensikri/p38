var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score  = 0;
var gameOver;
var restart;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(810, 200);
  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  for(var i=0; i < 18000; i=i+200){
    var obstacle = createSprite(i,165,10,40);    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
  obstacle.scale = 0.5;
  obstaclesGroup.add(obstacle);
} 

for(var i=0; i < 18000; i=i+150){

  var cloud = createSprite(i,120,40,10);
  cloud.y = Math.round(random(80,120));
  cloud.addImage(cloudImage);
  cloud.scale = 0.5;
    

}
  
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  trex.velocityX = 3;

  ground = createSprite(1800,180,18000,20);
  ground.addImage("ground",groundImage);
  ground.x = 0;
  ground.x = ground.width/2
  ground.scale = 2.5;

console.log(ground.width);
  
  gameOver = createSprite(300,100);
  restart = createSprite(300,140);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  restart.addImage(restartImg);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  
  invisibleGround = createSprite(200,190,18000,10);
  invisibleGround.visible = false;
  

  
  score = 0;
}

function draw() {
  background(180);
  if(gameState === PLAY){
    trex.velocityX = 3;

  }
  text("Score: "+ score, camera.x + 70, camera.y - 50);
  camera.position.x = trex.x - 20;
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
  }
  
  if(keyDown("space") && trex.y >= 159) {
    trex.velocityY = -14;
  }
  
 if(obstaclesGroup.isTouching(trex)){
   gameState = END;
 }

  trex.velocityY = trex.velocityY + 0.53;
  
  
  trex.collide(invisibleGround);
    
 
  
   if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    gameOver.x = camera.position.x;
    gameOver.y = camera.position.y - 50;
    restart.x = camera.position.x;
    restart.y = camera.position.y;
    
    //set velcity of each game object to 0
    trex.velocityX = 0;
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    //obstaclesGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
    reset();
  }
    
  }
  drawSprites();
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  gameOver.visible = false;
  trex.x = trex.x - 100; 
  trex.changeAnimation("running",trex_running);
  if(localStorage["HighestScore"] < score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  score = 0;
}