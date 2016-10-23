var gameTitleState = {
  preload: function() {
      // This function will be executed at the beginning
      // That's where we load the images and sounds

      // Load the game sprite
      this.game.load.image('startButton', 'assets/Start Button.png');
  },

  create: function(){
    this.game.stage.backgroundColor = '#71c5cf';

    // Add a start button and make it transition into the main state on click.
    var image = this.game.add.sprite(this.game.world.centerX,
      this.game.world.centerY, 'startButton');
    image.anchor.set(0.5);
    image.inputEnabled = true;
    image.events.onInputDown.add(this.startGame, this);

  },

  startGame: function(){
    this.game.state.start("main");
  },

};
