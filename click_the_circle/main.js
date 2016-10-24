// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds

        // Load the game sprite
        this.game.load.image('circle', 'assets/Circle.png');
        this.updateDelay = false;
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        this.game.stage.backgroundColor = '#71c5cf';

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

        // Timer for adding circles every 1.5s
        this.timer = this.game.time.events.loop(1500, this.addCircle, this);

    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic

        // Gameover when there are more than 5 circles on screen.
        if(this.circles.length > 5){
          this.game.state.start('gameOver', true, false, this.labelScore.text);
        }

        // Logic to decrease the delay for spawning circles everytime the plauer
        // scores a multiple of 10 points.
        if(this.score != 0 && this.score % 10 == 0 && this.updateDelay == false){
          this.timer.delay = this.timer.delay - 100;
          this.updateDelay = true;
        }
        if(this.score % 10 == 1){
          this.updateDelay = false;
        }
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
