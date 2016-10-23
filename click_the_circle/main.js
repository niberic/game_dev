// Create our 'main' state that will contain the game


var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds

        // Load the game sprite
        this.game.load.image('circle', 'assets/Circle.png');
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        this.game.stage.backgroundColor = 'white';

        // Scorer
        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0",
          {font: "30px Arial", fill: "#ffffff"});

        var image = this.game.add.sprite(this.game.world.centerX,
          this.game.world.centerY, 'circle');
        image.anchor.set(0.5);
        image.inputEnabled = true;
        image.events.onInputDown.add(this.addScore, this);
    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic
    },

    addScore: function() {
      ++this.score;
      this.labelScore.text = this.score;
    },
};
