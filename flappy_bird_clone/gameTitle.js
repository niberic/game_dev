var gameTitleState = {
  create: function(){
    this.game.stage.backgroundColor = '#71c5cf';

    this.gameTitle = this.game.add.text(50,225, "Press Space to Start!",
      {font: "30px Arial", fill: "#ffffff"});

    // Listen on the space input to start the game.
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.startGame, this);
  },

  startGame: function(){
    this.game.state.start("main");
  },

};
