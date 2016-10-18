// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds

        // Load the bird sprite
        this.game.load.image('bird', 'assets/bird.png');

        // Load the pipe sprites
        this.game.load.image('pipe', 'assets/pipe.png');

        // Load jump audio
        this.game.load.audio('jump', 'assets/jump.wav');
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        // Change the background color of the game to blue.
        this.game.stage.backgroundColor = '#71c5cf';

        // Set the physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird at the position x=100, y=245
        this.bird = this.game.add.sprite(100, 245, 'bird');

        // Add physics to the bird
        // Needed for: Movment, gravity, collisions, etc.
        this.game.physics.arcade.enable(this.bird);

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;

        // Call the 'jump' function when the spacekey is hit.
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        // Create an empty groupo
        this.pipes = this.game.add.group();

        // Timer for adding rows of pipes every 1.5s
        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

        // Scorer
        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0",
          {font: "30px Arial", fill: "#ffffff"});

        // Move the anchor to the left and downward
        this.bird.anchor.setTo(-0.2, 0.5);

        // Add the jump sound to the game.
        this.jumpSound = this.game.add.audio('jump');

    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic
        if (this.bird.y < 0 || this.bird.y > 490)
          this.restartGame();

        // Restart the game if bird collides with a pipe.
        this.game.physics.arcade.overlap(
          this.bird, this.pipes, this.hitPipe, null, this);

        // Make the bird rotate a little when jumping.
        if (this.bird.angle < 20)
          this.bird.angle += 1;
    },

    jump: function(){
      // If the bird is dead, then don't allow jumping
      if (this.bird.alive == false)
          return;

      // Add a vertical velocity to the bird
      this.bird.body.velocity.y = -350;

      // Create an animation on the bird
      var animation = this.game.add.tween(this.bird);

      // Change the angle of hte bird to -20* in 100ms
      animation.to({angle:-20}, 100);

      // Start the animation
      animation.start();

      // One liner for above animation code.
      // game.add.tween(this.bird).to({angle: -20}, 100).start();

      // Play the jump sound!
      this.jumpSound.play();
    },

    restartGame: function(){
      // Start the 'gameOver' state, which restarts the game.
      this.game.state.start('gameOver', true, false, this.labelScore.text);
    },

    addOnePipe: function(x,y){
      // Create a pipe at the position (x,y)
      var pipe = this.game.add.sprite(x, y, 'pipe');

      // Add the pipe to our previously created group
      this.pipes.add(pipe);

      // Enable physics on the pipe.
      this.game.physics.arcade.enable(pipe);

      // Add velocity to the pipe to make it move left
      pipe.body.velocity.x = -200;

      // Automatically kill the pipe when it's no longer visible.
      pipe.checkWorldBounds = true;
      pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function(){
      // Randomly pick a number between 1 and 5
      // This will be the hole position
      var hole = Math.floor(Math.random() * 5) + 1;

      // Add the 6 pipes
      // With one big hole at position 'hole' and 'hole+1'
      for (var i = 0; i < 8; ++i)
        if (i != hole && i != hole+1)
          this.addOnePipe(400, i * 60 + 10);

      this.score += 1;
      this.labelScore.text = this.score;
    },

    hitPipe: function() {
      // If the bird has already hit a pipe, do nothing.
      // It means the bird is already falling off the screen
      if (this.bird.alive == false)
        return;

      // Set the alive property of the bird to false.
      this.bird.alive = false;

      // Prevent new pipes from appearing.
      this.game.time.events.remove(this.timer);

      // Go through all the pipes, and stop their movement
      this.pipes.forEach(function(p){
        p.body.velocity.x = 0;
      }, this);
    },

};
