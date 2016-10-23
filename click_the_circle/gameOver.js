var gameOverState = {
  init: function(score){
    this.gameScore = this.game.add.text(135, 150, "Score: " + score ,
      {font: "30px Arial", fill: "#ffffff"});
  },

  create: function(){
    this.game.stage.backgroundColor = '#71c5cf';

    this.gameTitle = this.game.add.text(20,275, "Click anywhere to try again!",
      {font: "30px Arial", fill: "#ffffff"});

  },

  update: function(){
    if (this.game.input.activePointer.isDown){
      this.startGame();
    }
  },

  startGame: function(){
    this.game.state.start("main");
  },
};
