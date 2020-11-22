class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('Reset');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    background(bgimg);
    this.title.html("Harry Potter Multiplayer");
    this.title.style('color:white')
    this.title.position(width/2 - 100, 0);

    this.input.position(width/2 - 40 , height/2 - 80);
    this.button.position(width/2 + 30, height/2);
    this.reset.position(width-100,20);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
     
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;

      player.update();
      player.updateCount(playerCount);

      if(player.index === 1)
        player.updatePosition(40,height-200);
      else if(player.index === 2)
        player.updatePosition(width-40,height-200);
      this.greeting.html("Hello " + player.name);
      this.greeting.style('color:white');
      this.greeting.position(width/2 - 70, height/4);
    });

    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      database.ref('players').remove();
    });

  }
}
