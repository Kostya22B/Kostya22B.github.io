export default class Game {
  static points = {
    '1': 40,
    '2': 100,
    '3': 300,
    '4': 1200
  };
  
  /**
  * @brief / / object
  */
  constructor() {
    this.reset();
  }

  /**
  * @brief Get the level of the board.
  * @return { Number } The level
  */
  get level() {
    return Math.floor(this.lines * 0.1);
  }

  /**
  * @return { Object } An object containing the playfield
  */
  getState() {
    const playfield = this.createPlayfield();
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    // Creates a new array of all the players in the game.
    for (let y = 0; y < this.playfield.length; y++) {
      playfield[y] = [];

      // Set the current playfield to the next playfield
      for (let x = 0; x < this.playfield[y].length; x++) {
        playfield[y][x] = this.playfield[y][x];
      }
    }

    // Set the player s blocks.
    for (let y = 0; y < blocks.length; y++) {
      // Set the player s position to the next block
      for (let x = 0; x < blocks[y].length; x++) {
        // Set the piece position of the player
        if (blocks[y][x]) {
          playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }      
    }

    return {
      score: this.score,
      level: this.level,
      lines: this.lines,
      nextPiece: this.nextPiece,
      playfield,
      isGameOver: this.topOut
    };
  }

  /**
  * @brief a / object
  */
  reset() {
    this.score = 0;
    this.lines = 0;
    this.topOut = false;
    this.playfield = this.createPlayfield();
    this.activePiece = this.createPiece();
    this.nextPiece = this.createPiece();
  }

  /**
  * @return { Array } An array of 20x
  */
  createPlayfield() {
    const playfield = [];

    // Resets the playfield to 0.
    for (let y = 0; y < 20; y++) {
      playfield[y] = [];

      // Resets the playfield to 0.
      for (let x = 0; x < 10; x++) {
        playfield[y][x] = 0;
      }
    }
    return playfield;
  }

  /**
  * @return { Object } A piece
  */
  createPiece() {
    const index = Math.floor(Math.random() * 7);
    const type = 'IJLOSTZ'[index];
    const piece = { x: 0, y: 0};

    // Set the block blocks for the figure.
    switch (type) {
      case 'I':
        piece.blocks = [
          [0,0,0,0],
          [1,1,1,1],
          [0,0,0,0],
          [0,0,0,0]
        ];
        break;
      case 'J':
        piece.blocks = [
          [0,0,0],
          [2,2,2],
          [0,0,2]
        ];
        break;
      case 'L':
        piece.blocks = [
          [0,0,0],
          [3,3,3],
          [3,0,0]
        ];
        break;
      case 'O':
        piece.blocks = [
          [0,0,0,0],
          [0,4,4,0],
          [0,4,4,0],
          [0,0,0,0]
        ];
        break;
      case 'S':
        piece.blocks = [
          [0,0,0],
          [0,5,5],
          [5,5,0]
        ];
        break;
      case 'T':
        piece.blocks = [
          [0,0,0],
          [6,6,6],
          [0,6,0]
        ];
        break;
      case 'Z':
        piece.blocks = [
          [0,0,0],
          [7,7,0],
          [0,7,7]
        ];
        break;
      default:
        throw new Error("Unknown figure type");
    }
    piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
    piece.y = -1;

    return piece;
  }

  /**
  * @brief / / object
  */
  movePieceLeft() {
    this.activePiece.x -= 1;

    // This method is called when the piece is colliding with a collision.
    if (this.hasCollision()) {
        this.activePiece.x += 1;
    }
  }

  /**
  * @brief / / object
  */
  movePieceRight() {
    this.activePiece.x += 1;

    // Decrease the activePiece s x position.
    if (this.hasCollision()) {
        this.activePiece.x -= 1;
    }
  }

  /**
  * @return { boolean } True if the piece is
  */
  movePieceDown() {
    // Returns true if the top out of the graph is in the top out state.
    if (this.topOut) return;
    this.activePiece.y += 1;

    // Update the score and pieces.
    if (this.hasCollision()) {
        this.activePiece.y -= 1;
        this.lockPiece();
        const clearedLines = this.clearLines();
        this.updateScore(clearedLines);
        this.updatePieces();
    }
    // Sets the top out of the collision.
    if (this.hasCollision()) {
      this.topOut = true;
    }
  }

  /**
  * @brief / / object
  */
  rotatePiece() {
    this.rotateBlocks();

    // Rotate the block if collision is enabled.
    if (this.hasCollision()) {
      this.rotateBlocks(false);
    }
  }

  /**
  * @param clockwise
  */
  rotateBlocks(clockwise = true) {
    const blocks = this.activePiece.blocks;
    const length = blocks.length;
    const x = Math.floor(length /2);
    const y = length -1;

    // Sets the blocks in the same order as the blocks array.
    for (let i = 0; i < x; i++) {
      // Sets the blocks in the same order as blocks.
      for (let j = i; j < y - i; j++) {
        const temp = blocks[i][j];

        // Sets the current block to the temp value.
        if (clockwise) {
          blocks[i][j] = blocks[y - j][i];
          blocks[y - j][i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[j][y - i];
          blocks[j][y - i] = temp;
        } else {
          blocks[i][j] = blocks[j][y - i];
          blocks[j][y - i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[y - j][i];
          blocks[y - j][i] = temp;
        }
      }
    }
  }

  /**
  * @return { boolean } True if there is a collision
  */
  hasCollision() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    // Check if the player is in the current block
    for (let y = 0; y < blocks.length; y++) {
      // Check if the player is in the current block
      for (let x = 0; x < blocks[y].length; x++) {
        // Check if the block is in the current block
        if (
          blocks[y][x] && 
          ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) ||
          this.playfield[pieceY + y][pieceX + x])
          ) {
          return true;
        }
      }
    }
    return false;
  }  

  /**
  * @brief a / object
  */
  lockPiece() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    // Set the blocks in the playfield
    for (let y = 0; y < blocks.length; y++) {
      // Set the current blocks on the player
      for (let x = 0; x < blocks[y].length; x++) {
        // Set the piece s position in the playlist
        if (blocks[y][x]) {
          this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    } 
  }

  /**
  * @return { Number } Number of
  */
  clearLines() {
    const rows = 20;
    const columns = 10;
    let lines = [];

    // Add lines to lines.
    for (let y = rows - 1; y >= 0; y--) {
      let numberOfBlocks = 0;

      // Calculates the number of blocks in the playfield
      for (let x = 0; x < columns; x++) {
        // Add a block to the playfield
        if (this.playfield[y][x]) {
          numberOfBlocks +=1;
        }
      }
      // If the number of blocks is zero or less than the number of blocks then the lines will be appended to the end of the lines array.
      if (numberOfBlocks === 0) {
        break;
      // If the number of blocks is less than the number of blocks then the lines will be appended to the end of the lines.
      } else if (numberOfBlocks < columns) {
        continue;
      // Add y to the end of the lines.
      } else if (numberOfBlocks === columns) {
        lines.unshift(y);
      }
    }
    for (let index of lines) {
      this.playfield.splice(index, 1);
      this.playfield.unshift(new Array(columns).fill(0));
    }
    return lines.length;
  }

  /**
  * @param clearedLines
  */
  updateScore(clearedLines) {
    // This method is called when the player has cleared the number of points.
    if (clearedLines > 0) {
        const newScore = Game.points[clearedLines] * (this.level + 1);
        this.score += newScore;
        this.lines += clearedLines;
        const savedRecord = parseInt(localStorage.getItem('tetrisRecord'), 10) || 0;
        // Set the score of the tetris record to the current score.
        if (this.score > savedRecord) {
            localStorage.setItem('tetrisRecord', this.score);
        }
    }
}

  /**
  * @brief a / object
  */
  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }
}