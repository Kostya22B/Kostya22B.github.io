export default class Controller {
  /**
  * @param game
  * @param view
  */
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.intervalId = null;
    this.isPlaying = false;

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.soundlist = {"tetris": new Audio('../src/audio/tetris_audio.mp3'), 
                      "gamelost": new Audio('../src/audio/mario-smert.mp3')};
    this.playedgameover = false;
    this.isMuted = false;
    this.view.renderStartScreen();
  }

  /**
  * @brief / / object
  */
  update() {
    this.game.movePieceDown();
    this.updateView();
  }

  /**
  * @brief / / object
  */
  play() {
    this.isPlaying = true;
    this.startTimer();
    this.updateView();
  }

  /**
  * @brief / / object
  */
  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
  }

  /**
  * @brief Resets the game to its initial
  */
  reset() {
    this.game.reset();
    this.play();
  }

  /**
  * @brief a / object
  */
  updateView() {
    const state = this.game.getState();
    // The game is paused pause pause pause pause pause pause pause pause pause main main
    if (state.isGameOver) {
      this.soundlist["tetris"].pause();
      // This method will play the gameover.
      if (!this.playedgameover) {
        this.soundlist["gamelost"].currentTime = 0;
        this.soundlist["gamelost"].play();
        this.playedgameover = true;
      }
      this.view.renderEndScreen(state);
      document.body.style.overflow = '';
    // This method is called when the tetris is playing.
    } else if (!this.isPlaying) {
      this.soundlist["tetris"].pause();
      this.view.renderPauseScreen();
      document.body.style.overflow = '';
    } else {
      this.soundlist["tetris"].play();
      this.playedgameover = false;
      this.view.renderMainScreen(state);
      document.body.style.overflow = 'hidden';
    }
  }

  /**
  * @brief / / object
  */
  startTimer() {
    const speed = 1000 - this.game.getState().level * 100;

    // Update the animation interval. If the interval is not already set the interval will be updated.
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.update();
      }, speed > 0 ? speed : 100);
    }
  }

  /**
  * @brief / / object
  */
  stopTimer() {
    // Clears the interval and removes the interval from the intervalId.
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
  * @brief / / object
  */
  toggleMute() {
    this.isMuted = !this.isMuted;
    // Set volume of all sounds in the soundlist
    if (this.isMuted) {
      for (var key in this.soundlist) {
          this.soundlist[key].volume = 0;
    }
    } else {
      for (var key in this.soundlist) {
        this.soundlist[key].volume = 1;
    }
  }
}
  /**
  * @param event
  */
  handleKeyDown(event) {
    const state = this.game.getState();
    // Methode qui el evento de la keypress
    switch (event.keyCode) {
      case 13: //ENTER
        // mueva la mensaje de la vista de la clase
        if (state.isGameOver) {
          this.reset();
        // Smoothe el h1. scrollIntoView behavior smooth
        } else if (this.isPlaying) {
          this.pause();
        } else {
          //fixiruem anchor epta:D
          document.getElementById('h1').scrollIntoView({behavior: 'smooth'});
          this.play();
        }
        break;
      case 37: // LEFT ARROW
        this.game.movePieceLeft();
        this.updateView();
        break;
      case 38: // UP ARROW
        this.game.rotatePiece();
        this.updateView();
        break;
      case 39: // RIGHT ARROW
        this.game.movePieceRight();
        this.updateView();
        break;
      case 40: // DOWN ARROW
        this.stopTimer();
        this.game.movePieceDown();
        this.updateView();
        break;
      case 77: //M
        this.toggleMute();
        // console.log("sound disabled");
        break;
    }
  }

  /**
  * @param event
  */
  handleKeyUp(event) {
    // The keydown event is the keypress of the timer.
    switch (event.keyCode) {
      case 40:
        this.startTimer();
        break;
    }
  }
}
