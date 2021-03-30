class Game {
  constructor(){
    this.image1=loadImage("images/rank1.png");
    this.image2=loadImage("images/rank2.png");
    this.image3=loadImage("images/rank3.png");
    this.image4=loadImage("images/rank4.jpg");
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1=createSprite(100,200);
    car2=createSprite(300,200);
    car3=createSprite(500,200);
    car4=createSprite(700,200);
    cars=[car1,car2,car3,car4];

    car1.addImage(car1Img)
    car2.addImage(car2Img)
    car3.addImage(car3Img)
    car4.addImage(car4Img)
  }

  play(){
    form.hide();
   // textSize(30);
   // text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(groundImg);
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);

      var index=0,x=230,y;
      for(var i in allPlayers){
        index=index+1;
        x=x+220;
        y=displayHeight-allPlayers[i].distance

cars[index-1].x=x
cars[index-1].y=y
        if (index === player.index){

  //cars[index-1].shapeColor="red";
  stroke(10);
  fill("red")
  ellipse(x,y,60,60);
  camera.position.x=displayWidth/2;
  camera.position.y=cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=20
      player.update();
    }
    if(player.distance>4200){
      gameState=2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
      if(player.rank==1){
        image(this.image1,displayWidth/2-200,-displayHeight*4-300,400,400)
      }
      if(player.rank==2){
        image(this.image2,displayWidth/2-200,-displayHeight*4-300,400,400)
      }
      if(player.rank==3){
        image(this.image3,displayWidth/2-200,-displayHeight*4-300,400,400)
      }
      if(player.rank==4){
        image(this.image4,displayWidth/2-200,-displayHeight*4-300,400,400)
      }
    }
    drawSprites();
  }
  end(){
    console.log("GAME ENDED");
  }
}
