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

    hspell = createSprite(harry.x+10,height-200,50,10);
    hspell.addAnimation("hspell",hspellImg);
    hspell.visible = false;
    vspell = createSprite(voldemort.x-10,height-200,50,10);
    //vspell.addAnimation("vspell",vspellImg);
    vspell.visible = false;
    edges=createEdgeSprites();
  }

  play(){
    form.hide();
    background(bgimg);

    Player.getPlayerInfo();
    player.getrankdata();
    player.getPosition();
    player.getHealth();
    
  if(allPlayers !== undefined){
    harry.visible = true;
    voldemort.visible = true;
    
    var x = 40,y = height-200;
    var j = 0;
    stroke(255);
    strokeWeight(10);
    line(10,10,allPlayers.player2.health,10);
    for(var i in allPlayers){
       j++;
  
          textSize(15);
          fill("lightgreen");

          
          if(j === 1){
            
            x = allPlayers[i].position.x;
            if ((keyIsDown(RIGHT_ARROW) && x<width/2-100) && player.index !== null) {
              console.log(player.xPos);
              player.updatePosition(player.xPos+7,player.yPos);
            }
            
            if ((keyIsDown(LEFT_ARROW) && x>40) && player.index !== null) {
              console.log(player.xPos);
              player.updatePosition(player.xPos-7,player.yPos);
            }

            /*if(vspell.isTouching(harry)){
              vspell.x = voldemort.x - 10;
              vspell.visible= false;  
              vspell.velocityX = 0;            
              player.updateHealth(20);
            }*/

            text("+ : " + allPlayers.player1.health,x-25,y-70);
          }
            
          else if(j === 2){
           
            x = allPlayers[i].position.x;
            if ((keyIsDown(RIGHT_ARROW) && x<width-40) && player.index !== null) {
              console.log(player.xPos);
              player.updatePosition(player.xPos+7,player.yPos);
            }
            
            if ((keyIsDown(LEFT_ARROW) && x>width/2+80) && player.index !== null) {
              console.log(player.xPos);
              player.updatePosition(player.xPos-7,player.yPos);
            }

            /*if(keyDown("space") && player.index!==null){
              vspell.visible=true;
              vspell.velocityX = -4;
            }*/
            
            
            text("+ : " + allPlayers.player2.health,x-25,y-70);
          }
         
          if(keyDown("space") && player.index===1){
            //hspell.x = harry.x + 10;
            hspell.visible=true;
            hspell.velocityX = 8;
          }
          if(hspell.x > allPlayers.player2.position.x){
            count++;
            console.log(count);
            hspell.x = allPlayers.player1.position.x + 10;
            hspell.velocityX = 0;
            //hspell.visible= false;              
            player.updateHealth(2,20*count);
          }
          console.log(width/2);
                
          if(j === player.index){
            fill("white");
            textSize(12);
            text(allPlayers[i].name ,x-25,y-100);
          }  
        
        characters[j-1].x = x
        characters[j-1].y = y;

        characters[j-1].collide(edges[0]);
        characters[j-1].collide(edges[1]);
        characters[j-1].collide(invground);
        characters[j-1].collide(invw);
       /*if((keyDown("space")||keyDown(UP_ARROW)) && player.yPos>415 && player.index!==null){
          characters[j-1].velocityY=-10;
        }
      
        characters[j-1].velocityY=characters[j-1].velocityY+1;*/
      }
      drawSprites();
    }

  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
