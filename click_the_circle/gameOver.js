var gameOverState = {
  init: function(score){
    this.gameScore = this.game.add.text(135, 150, "Score: " + score ,
      {font: "30px Arial", fill: "#ffffff"});
  },

  create: function(){
    this.game.stage.backgroundColor = '#71c5cf';

    this.gameTitle = this.game.add.text(35,275, "Press Space to try again!",
      {font: "30px Arial", fill: "#ffffff"});

    // Listen on the space input to start the game.
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.startGame, this);
  },

  startGame: function(){
    this.game.state.start("main");
  },
};
