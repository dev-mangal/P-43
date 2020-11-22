var harry;
var voldemort;
var edges;
var harryimg,voldemortimg,bgimg,hpuimg;
var invw,hspell,vspell,hspellImg,vspellImg;
var hpu,invground,allPlayers,characters,count =0;
var database, gameState = 0,playerCount = 0,player,form,game;
function preload(){
  harryimg=loadImage("images/piha.png");
  voldemortimg=loadImage("images/pivo.png");
  hspellImg = loadAnimation("images/spell.png","images/spell.2.png","images/spell.3.png","images/spell.4.png");
  bgimg=loadImage("images/bgimg2.jpg");
  hpuimg=loadAnimation("images/harry power up.png","images/cropped-blank.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  database = firebase.database();

  game= new Game();
  game.start();
}

function draw() {
 
  if(playerCount === 2){
    game.update(1);
    game.play();
  }

  /*if(gameState === 1){
    game.play();
  }*/

  drawSprites();
}