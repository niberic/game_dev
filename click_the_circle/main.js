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

        // Create an empty group
        this.circles = this.game.add.group();

        var circle = this.game.add.sprite(this.game.world.centerX,
          this.game.world.centerY, 'circle');
        circle.anchor.set(0.5);
        circle.inputEnabled = true;
        circle.events.onInputDown.add(this.delCircle, this);
        this.circles.add(circle);

        // Timer for adding rows of pipes every 1.5s
        this.timer = this.game.time.events.loop(1500, this.addCircle, this);
    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic
    },

    addCircle: function() {
      var circle = this.game.add.sprite(0+getRandomNumber(350),
                                        0+getRandomNumber(440),
                                        'circle');
      circle.inputEnabled = true;
      circle.events.onInputDown.add(this.delCircle, this);
      this.circles.add(circle);
    },

    delCircle: function(circle){
      this.addScore();
      circle.destroy(true);
    },

    addScore: function() {
      ++this.score;
      this.labelScore.text = this.score;
    },
};
