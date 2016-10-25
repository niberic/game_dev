var gameOverState = {
  init: function(score, clicks){
    this.game.add.text(135, 150, "Score: " + score ,
      {font: "30px Arial", fill: "#ffffff"});

    var accuracy = Math.round(score / clicks) * 100;
    this.game.add.text(125, 200, "Accuracy: " + accuracy,
      {font: "30px Arial", fill: "#ffffff"});

    console.log("Score = " + score);
    console.log("Clicks = " + clicks);
  },

  create: function(){
    this.game.stage.backgroundColor = '#71c5cf';

    // this.gameTitle = this.game.add.text(20,275, "Click anywhere to try again!",
    //   {font: "30px Arial", fill: "#ffffff"});

    this.gameTitle = this.game.add.text(35,275, "Press Space to try again!",
      {font: "30px Arial", fill: "#ffffff"});

    // Listen on the space input to start the game.
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.startGame, this);

  },

  update: function(){
    // if (this.game.input.activePointer.isDown){
    //   this.startGame();
    // }
  },

  startGame: function(){
    this.game.state.start("main");
  },
};
