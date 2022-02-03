var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameoverImg,gameover;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  gameoverImg=loadImage("gameOver.png")
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  
  
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg); 
  frog.setCollider("rectangle",0,0,100,100) 
  
  //create coin group and climber group
  coinGroup=new Group();
  climbersGroup=new Group();


  
}

function draw(){

  background(0);
  drawSprites();

  textSize(20);
  fill("red");
  text("Your Score: "+score, 450,60);

 

  if(ocean.position.y > 300 )
  {
    ocean.position.y = 250;
  }

  if (gameState === "play") {

    ocean.setVelocity(0,0.3);

    if(keyDown("space"))
    {
      frog.velocityY = -5;
    }
   else{
     frog.velocityY = 3
   }

   if(keyDown("right") && frog.position.x < 550)               
   {
     frog.position.x +=3; 
     frog.setVelocity(0,0);                
   }
   
   if(keyDown("left") && frog.position.x > 10)
   {
   
     frog.position.x -=3; 
     frog.setVelocity(0,0);                
   }

   spawnCoin();
    
  }
  
  if (gameState === "end"){

  //textSize(25);
  //fill("red");
  //text("GAME OVER", 240,200);
    gameover=createSprite(240,200);
    gameover.addImage("over",gameoverImg);

  climbersGroup.destroyEach();
  coinGroup.destroyEach();
 

  }

  if(climbersGroup.isTouching(frog))
  {
    frog.setVelocity(0,0); 
  }

  else if(coinGroup.isTouching(frog))
  {
    score++    ;
  }
  if(frog.position.y>450)
  {
    gameState="end";
  }

  
}

// create the coin and climber in the same function
function spawnCoin() {
  

  if (frameCount % 280 === 0) {
    //make the x position of the coin and climber the same
    climber = createSprite(Math.round(random(1,450)),40,20,20);
    climber.addImage("climb",climberImg);
    climber.setVelocity(0,1.5);
    climber.scale=0.3;
    climber.lifetime=255 ;

    climbersGroup.add(climber);

    coin = createSprite(climber.x,10,20,20);
    coin.addImage("coin",coinImg);
    coin.setVelocity(0,1.5);
    coin.scale=0.1;
    coin.lifetime=255;
    coinGroup.add(coin);




  }
}

