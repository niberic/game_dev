// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic
    },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
