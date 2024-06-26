export default class View {
  static colors = {
    '1': 'cyan',
    '2': 'blue',
    '3': 'orange',
    '4': 'yellow',
    '5': 'green',
    '6': 'purple',
    '7': 'red'
  };

  /**
  * @param element
  * @param width
  * @param height
  * @param rows
  * @param columns
  */
  constructor(element, width, height, rows, columns) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");

    this.playfieldBorderWidth = 4;
    this.playfieldX = this.playfieldBorderWidth;
    this.playfieldY = this.playfieldBorderWidth;
    this.playfieldWidth = this.width * 2 / 3;
    this.playfieldHeight = this.height;
    this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
    this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

    this.blockWidth = this.playfieldInnerWidth / columns;
    this.blockHeight = this.playfieldInnerHeight / rows;

    this.panelX = this.playfieldWidth + 10;
    this.panelY = 0;
    this.panelWidth = this.width / 3;
    this.panelHeight = this.height;
    
    this.element.appendChild(this.canvas);
  }

  /**
  * @param state
  */
  renderMainScreen(state) {
    this.clearScreen();
    this.renderPlayfield(state);
    this.renderPanel(state);
}

  /**
  * @brief / / object
  */
  renderStartScreen() {
    //render of record
    const recordDisplay = document.getElementById('recordDisplay');
    const savedRecord = localStorage.getItem('tetrisRecord');
    // Set the record display text.
    if (savedRecord) {
        recordDisplay.innerText = `Your record: ${savedRecord}`;
    } else {
        recordDisplay.innerText = `Your record: 0`;
    }
    this.context.fillStyle = "white";
    this.context.font = "18px 'Press Start 2P'";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText("Press ENTER to Start", this.width / 2, this.height / 2);
  }

  /**
  * @brief / / object
  */
  renderPauseScreen() {
    this.context.fillStyle = "rgba(0,0,0,0.75)";
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.fillStyle = "white";
    this.context.font = "18px 'Press Start 2P'";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText("Press ENTER to Resume", this.width / 2, this.height / 2);
  }

  /**
  * @brief / / object
  */
  renderEndScreen({ score }) {
    this.clearScreen();
    this.context.fillStyle = "white";
    this.context.font = "18px 'Press Start 2P'";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText("GAME OVER", this.width / 2, this.height / 2 - 48);
    this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
    this.context.fillText("Press ENTER to Restart:", this.width / 2, this.height / 2 + 48);
}

  /**
  * @brief / / object
  */
  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  /**
  * @brief a / object
  */
  renderPlayfield({ playfield }) {
    // Render all the blocks in the playfield.
    for (let y = 0; y < playfield.length; y++) {
      // Render all blocks in the playfield.
      for (let x = 0; x < playfield[y].length; x++) {
        const block = playfield[y][x];

        // Render the block on the screen.
        if (block) {
          this.renderBlock(
            this.playfieldX + (x * this.blockWidth), 
            this.playfieldY + (y * this.blockHeight), 
            this.blockWidth, 
            this.blockHeight, 
            View.colors[block]
          );
        }
      }
    }

    this.context.strokeStyle = "white";
    this.context.lineWidth = this.playfieldBorderWidth;
    this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
  }

  /**
  * @brief a / object
  */
  renderPanel({ level,  score, lines, nextPiece }) {
    this.context.textAlign = "start";
    this.context.textBaseline = "top";
    this.context.fillStyle = 'white';
    this.context.font = "14px 'Press Start 2P'";

    this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 24); 
    this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 48); 
    this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 72); 
    this.context.fillText("Next:", this.panelX, this.panelY + 96);

    // Render all blocks in the nextPiece.
    for (let y = 0; y < nextPiece.blocks.length; y++) {
      // Render all blocks in the nextPiece. blocks array.
      for (let x = 0; x < nextPiece.blocks[y].length; x++) {
        const block = nextPiece.blocks[y][x];

        // Render the block on the panel.
        if (block) {
          this.renderBlock(
            this.panelX + (x * this.blockWidth * 0.5),
            this.panelY + 100 + (y * this.blockHeight * 0.5),
            this.blockWidth * 0.5,
            this.blockHeight * 0.5,
            View.colors[block]
          );
        }
      }
    }
  }

  /**
  * @param x
  * @param y
  * @param width
  * @param height
  * @param color
  */
  renderBlock(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = "black";
    this.context.lineWidth = 2;

    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }
}