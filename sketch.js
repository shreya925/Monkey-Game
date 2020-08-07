var background, backgroundImage, monkey, monkeyAnimation, obstacle, obstacleGroup, obstacleImage, invisibleGround, banana, bananaGroup, bananaImage, obstacle, obstacleImage, obstacleGroup, time, score, restart, restartImage;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
backgroundImage = loadImage("jungle2.jpg");
monkeyAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
bananaImage = loadImage("Banana.png");
obstacleImage = loadImage("stone.png");
restartImage = loadImage("restart-1.png");
}

function setup(){
createCanvas(600,300);
background = createSprite(200, 30, 800, 400);
background.addImage("jungle1", backgroundImage);
background.scale = 1.5;

monkey = createSprite(75, 250, 10, 10);
monkey.addAnimation("monkey1", monkeyAnimation);
monkey.scale = 0.11;
monkey.setCollider("circle", 0, 0, 200);
  
invisibleGround = createSprite(300, 270, 600, 3);
invisibleGround.visible = false;
  
obstacleGroup = new Group();
bananaGroup = new Group();
  
time = 0;
score = 0;
  
restart = createSprite(300, 225, 25, 25);
restart.addImage("restart1", restartImage);
restart.scale = 0.5;
restart.visible = false;
}

function draw(){
  
drawSprites();
  
monkey.collide(invisibleGround);
  
  if (background.x < 0){
    background.x = background.width/2;
  }

if(gameState === PLAY){
  background.velocityX = -6;
  
  if (background.x < 0){
    background.x = background.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 225){
    monkey.velocityY = -15;
    }
  
  monkey.velocityY = monkey.velocityY +0.96;
  
  if(bananaGroup.isTouching(monkey)){
    score = score +2;
    bananaGroup.destroyEach();
      switch(score){
        case 10: monkey.scale = 0.12;
          break;
        case 20: monkey.scale = 0.14;
          break;
        case 30: monkey.scale = 0.16;
          break;
        case 40: monkey.scale = 0.18;
          break;
        default: break;
      }
    }
  
  spawnBanana();  
  spawnObstacles();
  
  if(obstacleGroup.isTouching(monkey)){
      monkey.scale = 0.11;
    }
  
  if(obstacleGroup.isTouching(monkey) && monkey.scale === 0.11){
    gameState = END;
    }
  }
  
  if(gameState === END){
    background.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    restart.visible = true;
    time = 0;
    if(mousePressedOver(restart)){
       reset();
      }
  }
  
text("survival time: " +time, 500, 50);
time = Math.round(frameCount/frameRate());
  
text("score: " +score, 500, 60);
}

function spawnBanana() {
  if(frameCount % 100 === 0){
    var banana = createSprite(600, 200, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.y = Math.round(random(90, 190)); 
    banana.velocityX = -6;
    banana.lifetime = 250; 
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth +1;
    banana.depth = background.depth;
    banana.depth = background.depth +1;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(600, 260, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.17;
    obstacle.velocityX = -6;
    obstacle.lifetime = 120;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth +1;
    obstacle.setCollider("circle", 0, 0, 200);
    obstacleGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  count = 0;
  restart.visible = false;
  }