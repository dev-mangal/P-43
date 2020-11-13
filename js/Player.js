class Player {
  constructor(){
    this.index = null;
    this.health = 200;
    this.name = null;
    this.rank = null;
    this.xPos = width/2-30;
    this.yPos = height-200;
  }

  
  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }
  getPosition(){
    var playerIndex = "players/player" + this.index;
    var playerPositionRef = database.ref(playerIndex +'/position');
    playerPositionRef.on("value",(data)=>{
      var playerPosition = data.val();
      this.xPos = playerPosition.x;
      this.yPos = playerPosition.y;
    })
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      health:this.health,
      position : {x : this.xPos,
        y : this.yPos}
    });
  }
  
  updatePosition(x,y){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex +'/position').update({
      x : this.xPos + x,
      y : this.yPos + y
    })
    
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

   getrankdata(){
    var rankinfo = database.ref('rank');
    rankinfo.on("value",(data)=>{
      this.rank = data.val();
    })
  }

  static updaterank(rank){
    database.ref('/').update({
      'rank' : rank
    });
  }
}