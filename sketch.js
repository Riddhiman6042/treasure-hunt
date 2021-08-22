var path,boy,cash,diamonds,jwellery,sword,gameOver;
var pathImg,boyImg,cashImg,diamondsImg,jewelleryImg,swordImg, gameOverImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var lives = 5;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  runnerImg = loadImage("Runner-1.png")
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;

// making the game over scene
gameOver = createSprite(200,200);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.7;


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jewelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  gameOver.visible = false;

    createCash();
    createDiamonds();
    createJewellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 150;

      
    }else if(jewelleryG.isTouching(boy)) {
      jewelleryG.destroyEach();
      treasureCollection = treasureCollection + 100;
    }else{
      if(swordGroup.isTouching(boy)) {

        lives = lives - 1;
        swordGroup.destroyEach();
        swordGroup.setVelocityYEach(0);
    }
  }

    if(lives == 0)
     {
      gameState = END;

      cashG.destroyEach();
      cashG.setVelocityYEach(0);

      diamondsG.destroyEach();
      diamondsG.setVelocityYEach(0);

      jewelleryG.destroyEach();
      jewelleryG.setVelocityYEach(0);

      boy.addAnimation("stop",runnerImg);

      gameOver.visible = true;
     }

  boy.setCollider("circle",0,0,60);  
  
  drawSprites();

  textSize(20);

  fill(255);

  text("Treasure: "+ treasureCollection,40,30);
  text("Lives left: " + lives,250,32)
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 220;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = 220;
  diamondsG.add(diamonds);
}
}

function createJewellery() {
  if (World.frameCount % 410 == 0) {
  var jewellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jewellery.addImage(jewelleryImg);
  jewellery.scale=0.13;
  jewellery.velocityY = 5;
  jewellery.lifetime = 220;
  jewelleryG.add(jewellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 5;
  sword.lifetime = 220;
  swordGroup.add(sword);
  }
}