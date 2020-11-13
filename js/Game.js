class Game {
  constructor(){

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

    voldemort=createSprite(width-20,height-200,10,10);
    voldemort.addImage(voldemortimg);
    voldemort.visible = false;
    harry=createSprite(20,height-200,10,10);
    harry.addImage(harryimg);
    harry.visible = false;

    characters = [harry,voldemort];
  
    invground=createSprite(width/2,height-130,width,20);
    invground.visible=false;
    invw=createSprite(width/2,304,80,608);
    invw.visible=false;
    hpu=createSprite(random(40,620),random(40,568),10,10);
    hpu.addAnimation("power up",hpuimg);
    hpu.visible = false;
    edges=createEdgeSprites();
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getrankdata();
    player.getPosition();

    harry.visible = true;
    voldemort.visible = true;
    
  if(allPlayers !== undefined){
    background(bgimg);
    
    var x = 20;
    var y = height-200;
    var j=0;
      for(var i in allPlayers){
        j++;
        
      
        if(keyDown(RIGHT_ARROW)&&player.xPos<width-7){
          player.updatePosition(7,0);
          characters[j-1].x = player.xPos;;
        }
        if(keyDown(LEFT_ARROW)&&player.xPos>7){
          player.updatePosition(-7,0);
          characters[j-1].x = player.xPos;;
        }

        characters[j-1].collide(edges[0]);
        characters[j-1].collide(edges[1]);
        characters[j-1].collide(invground);
        characters[j-1].collide(invw);
      
        if(i === player.index){ 
          textSize(18);
          fill("white");
          text(allPlayers[i].name,player.xPos-5,player.ypos-40);
        }       
            
            
          
          if(((keyDown("space")||keyDown(UP_ARROW))&&player.yPos>415)&&player.index!==null){
            characters[j-1].velocityY=-10  ;
            player.update();
            
          }
          characters[j-1].velocityY=characters[j-1].velocityY+1;
          characters[j-1].y = player.yPos;
      }
      drawSprites();
    }

  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
