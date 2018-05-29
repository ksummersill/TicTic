import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

// Reset Game onload
btn1R1x = false;
btn1R1o = false;
btn1Taken = false;
btn2R1x = false;
btn2R1o = false;
btn2Taken = false;
btn3R1x = false;
btn3R1o = false;
btn3Taken = false;
btn4R2x = false;
btn4R2o = false;
btn4Taken = false;
btn5R2x = false;
btn5R2o = false;
btn5Taken = false;
btn6R2x = false;
btn6R2o = false;
btn6Taken = false;
btn7R3x = false;
btn7R3o = false;
btn7Taken = false;
btn8R3x = false;
btn8R3o = false;
btn8Taken = false;
btn9R3x = false;
btn9R3o = false;
btn9Taken = false;

singlePlayer: boolean;

whosTurn: string;

gameWon = false; // Identifies weather the game was already won;

player1Name: string;
player2Name: string;

player1Score: number;
player2Score: number;

playerSelection: string;

messageTxt: string;
message: boolean;

playAgainBtn = false;

constructor(public gService: GameService, public router: Router) {
}

ngOnInit() {
  this.message = true;
  this.messageTxt = 'Welcome to TicTic';
  this.checkIfDraw();
  this.singlePlayer = this.gService.singlePlayer;
  // this.playerSelection = 'x'; // Used to test the game and preset to o
  // this.whosTurn = 'x'; // Used to test the game and preset to o

  this.whosTurn = this.gService.gamerType; // Defines whos turn it is, either X or O.
  this.playerSelection = this.gService.gamerType; // Defines the player, either X or O
  this.gService.gamerType = this.gService.primaryType; // Currently not used. Will be used for higher score.

  if (this.playerSelection === undefined) {
    this.playerSelection = 'o';
    this.whosTurn = 'o';
  }

}
// Used the get all squares that are false.
falseKeys() {
  const gameObj = [
    { square: 'btn1R1o', btnTaken: this.btn1Taken, type: 'o', value: this.btn1R1o },
    { square: 'btn1R1x', btnTaken: this.btn1Taken, type: 'x', value: this.btn1R1x },
    { square: 'btn2R1o', btnTaken: this.btn2Taken, type: 'o', value: this.btn2R1o },
    { square: 'btn2R1x', btnTaken: this.btn2Taken, type: 'x', value: this.btn2R1x },
    { square: 'btn3R1o', btnTaken: this.btn3Taken, type: 'o', value: this.btn3R1o },
    { square: 'btn3R1x', btnTaken: this.btn3Taken, type: 'x', value: this.btn3R1x },
    { square: 'btn4R2o', btnTaken: this.btn4Taken, type: 'o', value: this.btn4R2o },
    { square: 'btn4R2x', btnTaken: this.btn4Taken, type: 'x', value: this.btn4R2x } ,
    { square: 'btn5R2o', btnTaken: this.btn5Taken, type: 'o', value: this.btn5R2o },
    { square: 'btn5R2x', btnTaken: this.btn5Taken, type: 'x', value: this.btn5R2x },
    { square: 'btn6R2o', btnTaken: this.btn6Taken, type: 'o', value: this.btn6R2o },
    { square: 'btn6R2x', btnTaken: this.btn6Taken, type: 'x', value: this.btn6R2x },
    { square: 'btn7R3o', btnTaken: this.btn7Taken, type: 'o', value: this.btn7R3o },
    { square: 'btn7R3x', btnTaken: this.btn7Taken, type: 'x', value: this.btn7R3x },
    { square: 'btn8R3o', btnTaken: this.btn8Taken, type: 'o', value: this.btn8R3o },
    { square: 'btn8R3x', btnTaken: this.btn8Taken, type: 'x', value: this.btn8R3x },
    { square: 'btn9R3o', btnTaken: this.btn9Taken, type: 'o', value: this.btn9R3o },
    { square: 'btn9R3x', btnTaken: this.btn9Taken, type: 'x', value: this.btn9R3x }
  ];
const objValues = Object.values(gameObj); // The object and values

// Only obtain X values that are false and the square is not already taken.
const xvalues = objValues.filter((x) => x.value === false && x.type === 'x' && x.btnTaken === false);

// Only obtain O values that are false and the square is not already taken.
const ovalues = objValues.filter((x) => x.value === false && x.type === 'o' && x.btnTaken === false);

  if (this.gameWon === true) {
    console.log('No X Generation Completed, game is already won!');
  } else if (this.playerSelection && this.whosTurn === 'x') {
    this.generateSquare(ovalues);
    this.checkWinner();
  } else if (this.playerSelection && this.whosTurn === 'o') {
    this.generateSquare(xvalues);
    this.checkWinner();
  } else {
    this.checkWinner();
  }
}

// Used to either generate square by computer or calculate next move.
generateSquare(values) {
// If 1 and 2 by Player o is taken then computer will pick button 3. Combo 123
if ( this.btn1R1o && this.btn2R1o === true && this.btn3Taken === false) { console.log('123');
  return this.btn3R1x = true, this.btn3Taken = true;

// If 4 and 5 by player o is taken then computer will pick square 6. Combo 456
  } else if ( this.btn4R2o && this.btn5R2o === true && this.btn6Taken === false) { console.log('456');
  return this.btn6R2x = true, this.btn6Taken = true;

// If 7 and 8 by player o is taken then computer will pick square 9. Combo 789
  } else if ( this.btn7R3o && this.btn8R3o === true && this.btn9Taken === false) { console.log('789');
  return this.btn9R3x = true, this.btn9Taken = true;

// If 1 and 4 by player o is taken then computer will pick square 7. Combo 147
  } else if ( this.btn1R1o && this.btn4R2o === true && this.btn7Taken === false) { console.log('147');
  return this.btn7R3x = true, this.btn7Taken = true;

// If 1 and 5 by player o is taken then computer will pick square 9. Combo 159
  } else if ( this.btn1R1o && this.btn5R2o === true && this.btn9Taken === false) { console.log('159');
  return this.btn9R3x = true, this.btn9Taken = true;

// If 3 and 5 by player o is taken then computer will pick square 7. Combo 357
  } else if ( this.btn3R1o && this.btn5R2o === true && this.btn7Taken === false) { console.log('357');
  return this.btn7R3x = true, this.btn7Taken = true;

// If 2 and 5 by player o is taken then computer will pick square 8. Combo 258
  } else if ( this.btn2R1o && this.btn5R2o === true && this.btn8Taken === false) { console.log('258');
  return this.btn8R3x = true, this.btn2Taken = true;

// If 3 and 6 by player o is taken then computer will pick square 9. Combo 369
  } else if ( this.btn3R1o && this.btn6R2o === true && this.btn9Taken === false) { console.log('369');
  return this.btn9R3x = true, this.btn9Taken = true;

// If 8 and 5 by player o is taken then computer will pick square 2. Combo 852
  } else if ( this.btn8R3o && this.btn5R2o === true && this.btn2Taken === false) { console.log('852');
  return this.btn2R1x = true, this.btn2Taken = true;

// If 7 and 4 by player o is taken then computer will pick square 1. Combo 741
  } else if ( this.btn7R3o && this.btn4R2o === true && this.btn1Taken === false) { console.log('741');
  return this.btn1R1x = true, this.btn1Taken = true;

// If 9 and 6 by player o is taken then computer will pick square 3. Combo 961
  } else if ( this.btn9R3o && this.btn6R2o === true && this.btn3Taken === false) { console.log('961');
  return this.btn3R1x = true, this.btn3Taken = true;

// If 5 and 6 by player o is taken then computer will pick square 4. Combo 564
  } else if ( this.btn5R2o && this.btn6R2o === true && this.btn4Taken === false) { console.log('564');
  return this.btn4R2x = true, this.btn4Taken = true;

// If 9 and 5 by player o is taken then computer will pick square 1. Combo 951
  } else if ( this.btn9R3o && this.btn5R2o === true && this.btn1Taken === false) { console.log('951');
  return this.btn1R1x = true, this.btn1Taken = true;

// If 7 and 5 by player o is taken then computer will pick square 3. Combo 753
  } else if ( this.btn7R3o && this.btn5R2o === true && this.btn3Taken === false) { console.log('753');
  return this.btn3R1x = true, this.btn3Taken = true;

// If 1 and 7 by player o is taken then computer will pick square 4 . Combo 174
  } else if ( this.btn1R1o && this.btn7R3o === true && this.btn4Taken === false) { console.log('174');
  return this.btn4R2x = true, this.btn4Taken = true;

// Else random select a square for X.
  } else {
  console.log('No combo for x was selected');
  const squareGen = values[Math.floor(Math.random() * values.length)];
    console.log(squareGen);
    const compSquare = squareGen.square;
    console.log(compSquare);
    // Squares used during X Generation.
    if (compSquare === 'btn1R1x') { return this.btn1R1x = true, this.btn1Taken = true; }
    if (compSquare === 'btn2R1x') { return this.btn2R1x = true, this.btn2Taken = true; }
    if (compSquare === 'btn3R1x') { return this.btn3R1x = true, this.btn3Taken = true; }
    if (compSquare === 'btn4R2x') { return this.btn4R2x = true, this.btn4Taken = true; }
    if (compSquare === 'btn5R2x') { return this.btn5R2x = true, this.btn5Taken = true; }
    if (compSquare === 'btn6R2x') { return this.btn6R2x = true, this.btn6Taken = true; }
    if (compSquare === 'btn7R3x') { return this.btn7R3x = true, this.btn7Taken = true; }
    if (compSquare === 'btn8R3x') { return this.btn8R3x = true, this.btn8Taken = true; }
    if (compSquare === 'btn9R3x') { return this.btn9R3x = true, this.btn9Taken = true; }

    // Squares used during O Generation.
    if (compSquare === 'btn1R1o') { return this.btn1R1o = true, this.btn1Taken = true; }
    if (compSquare === 'btn2R1o') { return this.btn2R1o = true, this.btn2Taken = true; }
    if (compSquare === 'btn3R1o') { return this.btn3R1o = true, this.btn3Taken = true; }
    if (compSquare === 'btn4R2o') { return this.btn4R2o = true, this.btn4Taken = true; }
    if (compSquare === 'btn5R2o') { return this.btn5R2o = true, this.btn5Taken = true; }
    if (compSquare === 'btn6R2o') { return this.btn6R2o = true, this.btn6Taken = true; }
    if (compSquare === 'btn7R3o') { return this.btn7R3o = true, this.btn7Taken = true; }
    if (compSquare === 'btn8R3o') { return this.btn8R3o = true, this.btn8Taken = true; }
    if (compSquare === 'btn9R3o') { return this.btn9R3o = true, this.btn9Taken = true; }
 }
}

userClickBtn1() {
  console.log('Square 1 clicked!');
  if (this.playerSelection === 'o' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn1Taken === false) {
            this.btn1R1o = true;
            this.btn1Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'x' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn1Taken === false) {
            this.btn1R1x = true;
            this.btn1Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'o' && this.singlePlayer === false && this.whosTurn === 'o') {
      if (this.gameWon === false && this.btn1Taken === false) {
      this.btn1R1o = true;
      this.btn1Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('x');
      this.playerSelection = 'x';
      this.whosTurn = 'x'; }
  } else if (this.playerSelection === 'x' && this.singlePlayer === false && this.whosTurn === 'x' ) {
    if (this.gameWon === false && this.btn1Taken === false) {
      this.btn1R1x = true;
      this.btn1Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('o');
      this.playerSelection = 'o';
      this.whosTurn = 'o'; }
  } else {
    console.log('No selection made');
  }
}

userClickBtn2() {
  console.log('Square 2 clicked!');
  if (this.playerSelection === 'o' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn2Taken === false) {
            this.btn2R1o = true;
            this.btn2Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'x' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn2Taken === false) {
            this.btn2R1x = true;
            this.btn2Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'o' && this.singlePlayer === false && this.whosTurn === 'o') {
      if (this.gameWon === false && this.btn2Taken === false) {
      this.btn2R1o = true;
      this.btn2Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('x');
      this.playerSelection = 'x';
      this.whosTurn = 'x'; }
  } else if (this.playerSelection === 'x' && this.singlePlayer === false && this.whosTurn === 'x' ) {
    if (this.gameWon === false && this.btn2Taken === false) {
      this.btn2R1x = true;
      this.btn2Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('o');
      this.playerSelection = 'o';
      this.whosTurn = 'o'; }
  } else {
    console.log('No selection made');
  }
}

userClickBtn3() {
  console.log('Square 3 clicked!');
  if (this.playerSelection === 'o' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn3Taken === false) {
            this.btn3R1o = true;
            this.btn3Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'x' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn3Taken === false) {
            this.btn3R1x = true;
            this.btn3Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'o' && this.singlePlayer === false && this.whosTurn === 'o') {
      if (this.gameWon === false && this.btn3Taken === false) {
      this.btn3R1o = true;
      this.btn3Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('x');
      this.playerSelection = 'x';
      this.whosTurn = 'x'; }
  } else if (this.playerSelection === 'x' && this.singlePlayer === false && this.whosTurn === 'x' ) {
    if (this.gameWon === false && this.btn3Taken === false) {
      this.btn3R1x = true;
      this.btn3Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('o');
      this.playerSelection = 'o';
      this.whosTurn = 'o'; }
  } else {
    console.log('No selection made');
  }
}

userClickBtn4() {
  console.log('Square 4 clicked!');
  if (this.playerSelection === 'o' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn4Taken === false) {
            this.btn4R2o = true;
            this.btn4Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'x' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn4Taken === false) {
            this.btn4R2x = true;
            this.btn4Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'o' && this.singlePlayer === false && this.whosTurn === 'o') {
      if (this.gameWon === false && this.btn4Taken === false) {
      this.btn4R2o = true;
      this.btn4Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('x');
      this.playerSelection = 'x';
      this.whosTurn = 'x'; }
  } else if (this.playerSelection === 'x' && this.singlePlayer === false && this.whosTurn === 'x' ) {
    if (this.gameWon === false && this.btn4Taken === false) {
      this.btn4R2x = true;
      this.btn4Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('o');
      this.playerSelection = 'o';
      this.whosTurn = 'o'; }
  } else {
    console.log('No selection made');
  }
}

userClickBtn5() {
  console.log('Square 5 clicked!');
  if (this.playerSelection === 'o' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn5Taken === false) {
            this.btn5R2o = true;
            this.btn5Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'x' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn5Taken === false) {
            this.btn5R2x = true;
            this.btn5Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'o' && this.singlePlayer === false && this.whosTurn === 'o') {
      if (this.gameWon === false && this.btn5Taken === false) {
      this.btn5R2o = true;
      this.btn5Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('x');
      this.playerSelection = 'x';
      this.whosTurn = 'x'; }
  } else if (this.playerSelection === 'x' && this.singlePlayer === false && this.whosTurn === 'x' ) {
    if (this.gameWon === false && this.btn5Taken === false) {
      this.btn5R2x = true;
      this.btn5Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('o');
      this.playerSelection = 'o';
      this.whosTurn = 'o'; }
  } else {
    console.log('No selection made');
  }
}

userClickBtn6() {
  console.log('Square 6 Clicked!');
  if (this.playerSelection === 'o' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn6Taken === false) {
            this.btn6R2o = true;
            this.btn6Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'x' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn6Taken === false) {
            this.btn6R2x = true;
            this.btn6Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'o' && this.singlePlayer === false && this.whosTurn === 'o') {
      if (this.gameWon === false && this.btn6Taken === false) {
      this.btn6R2o = true;
      this.btn6Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('x');
      this.playerSelection = 'x';
      this.whosTurn = 'x'; }
  } else if (this.playerSelection === 'x' && this.singlePlayer === false && this.whosTurn === 'x' ) {
    if (this.gameWon === false && this.btn6Taken === false) {
      this.btn6R2x = true;
      this.btn6Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('o');
      this.playerSelection = 'o';
      this.whosTurn = 'o'; }
  } else {
    console.log('No selection made');
  }
}

userClickBtn7() {
  console.log('Square 7 clicked!');
  if (this.playerSelection === 'o' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn7Taken === false) {
            this.btn7R3o = true;
            this.btn7Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'x' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn7Taken === false) {
            this.btn7R3x = true;
            this.btn7Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'o' && this.singlePlayer === false && this.whosTurn === 'o') {
      if (this.gameWon === false && this.btn7Taken === false) {
      this.btn7R3o = true;
      this.btn7Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('x');
      this.playerSelection = 'x';
      this.whosTurn = 'x'; }
  } else if (this.playerSelection === 'x' && this.singlePlayer === false && this.whosTurn === 'x' ) {
    if (this.gameWon === false && this.btn7Taken === false) {
      this.btn7R3x = true;
      this.btn7Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('o');
      this.playerSelection = 'o';
      this.whosTurn = 'o'; }
  } else {
    console.log('No selection made');
  }
}

userClickBtn8() {
  console.log('Square 8 clicked!');
  if (this.playerSelection === 'o' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn8Taken === false) {
            this.btn8R3o = true;
            this.btn8Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'x' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn8Taken === false) {
            this.btn8R3x = true;
            this.btn8Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'o' && this.singlePlayer === false && this.whosTurn === 'o') {
      if (this.gameWon === false && this.btn8Taken === false) {
      this.btn8R3o = true;
      this.btn8Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('x');
      this.playerSelection = 'x';
      this.whosTurn = 'x'; }
  } else if (this.playerSelection === 'x' && this.singlePlayer === false && this.whosTurn === 'x' ) {
    if (this.gameWon === false && this.btn8Taken === false) {
      this.btn8R3x = true;
      this.btn8Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('o');
      this.playerSelection = 'o';
      this.whosTurn = 'o'; }
  } else {
    console.log('No selection made');
  }
}

userClickBtn9() {
  console.log('Square 9 c nlicked!');
  if (this.playerSelection === 'o' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn9Taken === false) {
            this.btn9R3o = true;
            this.btn9Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'x' && this.singlePlayer === true) {
    if (this.gameWon === false) {
      if ( this.btn9Taken === false) {
            this.btn9R3x = true;
            this.btn9Taken = true;
            this.checkIfDraw();
            this.checkWinner();
            this.falseKeys();
            } else {
              this.messageTxt = 'Player o already selected';
            }
    } else {
      console.log('Game Already Won');
    }
  } else if (this.playerSelection === 'o' && this.singlePlayer === false && this.whosTurn === 'o') {
      if (this.gameWon === false && this.btn9Taken === false) {
      this.btn9R3o = true;
      this.btn9Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('x');
      this.playerSelection = 'x';
      this.whosTurn = 'x'; }
  } else if (this.playerSelection === 'x' && this.singlePlayer === false && this.whosTurn === 'x' ) {
    if (this.gameWon === false && this.btn9Taken === false) {
      this.btn9R3x = true;
      this.btn9Taken = true;
      this.checkIfDraw();
      this.checkWinner();
      this.playerNotification('o');
      this.playerSelection = 'o';
      this.whosTurn = 'o'; }
  } else {
    console.log('No selection made');
  }
}

checkWinner() {
  // 123 - Winner - X
  if (this.btn1R1x === true && this.btn2R1x === true && this.btn3R1x === true) {
    this.messageTxt = 'Player X wins'; this.playAgainBtn = true; this.gameWon = true;
    let i = 1; this.gService.scoreX = this.gService.scoreX + i++;
    // if ( this.gService.primaryType === 'x') {
    // this.gService.addScore(this.gService.scoreX = this.gService.scoreX + i++);
    // } else { console.log ('Nothing Calculated'); }

  // 123 - Winner - O
  } else if (this.btn1R1o === true && this.btn2R1o === true && this.btn3R1o === true) {
  this.messageTxt = 'Player O wins'; this.playAgainBtn = true; this.gameWon = true;
  let i = 1; this.gService.scoreO = this.gService.scoreO + i++;

  // 159 - Winner - X
  } else if (this.btn1R1x === true && this.btn5R2x === true && this.btn9R3x === true) {
    this.messageTxt = 'Player x wins'; this.playAgainBtn = true; this.gameWon = true;
    let i = 1; this.gService.scoreX = this.gService.scoreX + i++;

  // 159 - Winner - O
  } else if (this.btn1R1o === true && this.btn5R2o === true && this.btn9R3o === true) {
  this.messageTxt = 'Player O wins'; this.playAgainBtn = true; this.gameWon = true;
  let i = 1; this.gService.scoreO = this.gService.scoreO + i++;

  // 147 - Winner - X
  } else if (this.btn1R1x === true && this.btn4R2x === true && this.btn7R3x === true) {
  this.messageTxt = 'Player o Wins'; this.playAgainBtn = true; this.gameWon = true;
  let i = 1; this.gService.scoreX = this.gService.scoreX + i++;

  // 147 - Winner - O
  } else if (this.btn1R1o === true && this.btn4R2o === true && this.btn7R3o === true) {
  this.messageTxt = 'Player O wins'; this.playAgainBtn = true; this.gameWon = true;
  let i = 1; this.gService.scoreO = this.gService.scoreO + i++;

  // 258 - Winner - X
  } else if (this.btn2R1x === true && this.btn5R2x === true && this.btn8R3x === true) {
  this.messageTxt = 'Player x wins'; this.playAgainBtn = true; this.gameWon = true;
  let i = 1; this.gService.scoreX = this.gService.scoreX + i++;

  // 456 - Winner - X
  } else if (this.btn4R2x === true && this.btn5R2x === true && this.btn6R2x === true) {
  this.messageTxt = 'Player x wins'; this.playAgainBtn = true; this.gameWon = true;
  let i = 1; this.gService.scoreX = this.gService.scoreX + i++;

    // 456 - Winner - O
  } else if (this.btn4R2o === true && this.btn5R2o === true && this.btn6R2o === true) {
  this.messageTxt = 'Player o wins'; this.playAgainBtn = true; this.gameWon = true;
  let i = 1; this.gService.scoreO = this.gService.scoreO + i++;

  // 258 - Winner - O
  } else if (this.btn2R1o === true && this.btn5R2o === true && this.btn8R3o === true) {
  this.messageTxt = 'Player O wins'; this.playAgainBtn = true; this.gameWon = true;
  let i = 1; this.gService.scoreO = this.gService.scoreO + i++;

  // 369 - Winner - X
  } else if (this.btn3R1x === true && this.btn6R2x === true && this.btn9R3x === true) {
  this.messageTxt = 'Player x wins'; this.playAgainBtn = true; this.gameWon = true;
  let i = 1; this.gService.scoreX = this.gService.scoreX + i++;

  // 951 - Winner - X
  } else if (this.btn9R3x === true && this.btn5R2x === true && this.btn1R1x === true) {
  this.messageTxt = 'Player x wins'; this.playAgainBtn = true; this.gameWon = true;
  let i = 1; this.gService.scoreX = this.gService.scoreX + i++;

  // 357 - Winner - o
  } else if (this.btn3R1o === true && this.btn5R2o === true && this.btn7R3o === true) {
  this.messageTxt = 'Player o wins'; this.playAgainBtn = true; this.gameWon = true;
  let i = 1; this.gService.scoreO = this.gService.scoreO + i++;

    // 357 - Winner - x
  } else if (this.btn3R1x === true && this.btn5R2x === true && this.btn7R3x === true) {
    this.messageTxt = 'Player x wins'; this.playAgainBtn = true; this.gameWon = true;
    let i = 1; this.gService.scoreX = this.gService.scoreX + i++;

   // 789 - Winner - o
  } else if (this.btn7R3o === true && this.btn8R3o === true && this.btn9R3o === true) {
    this.messageTxt = 'Player o wins'; this.playAgainBtn = true; this.gameWon = true;
    let i = 1; this.gService.scoreO = this.gService.scoreO + i++;

   // 789 - Winner - x
  } else if (this.btn7R3x === true && this.btn8R3x === true && this.btn9R3x === true) {
    this.messageTxt = 'Player x wins'; this.playAgainBtn = true; this.gameWon = true;
    let i = 1; this.gService.scoreX = this.gService.scoreX + i++;

  // 369 - Winner - O
  } else if (this.btn3R1o === true && this.btn6R2o === true && this.btn9R3o === true) {
  this.messageTxt = 'Player o wins'; this.playAgainBtn = true; this.gameWon = true;
  let i = 1; this.gService.scoreO = this.gService.scoreO + i++;
  }

}

checkIfDraw() {
  if (this.btn1Taken === true &&
      this.btn2Taken === true &&
      this.btn3Taken === true &&
      this.btn4Taken === true &&
      this.btn5Taken === true &&
      this.btn6Taken === true &&
      this.btn7Taken === true &&
      this.btn8Taken === true &&
      this.btn9Taken === true) {
        return this.messageTxt = 'Game is a draw!', this.playAgainBtn = true;
      }
}

  playAgain() {
    this.singlePlayer = this.gService.singlePlayer;
    this.btn1R1x = false;
    this.btn1R1o = false;
    this.btn1Taken = false;
    this.btn2R1x = false;
    this.btn2R1o = false;
    this.btn2Taken = false;
    this.btn3R1x = false;
    this.btn3R1o = false;
    this.btn3Taken = false;
    this.btn4R2x = false;
    this.btn4R2o = false;
    this.btn4Taken = false;
    this.btn5R2x = false;
    this.btn5R2o = false;
    this.btn5Taken = false;
    this.btn6R2x = false;
    this.btn6R2o = false;
    this.btn6Taken = false;
    this.btn7R3x = false;
    this.btn7R3o = false;
    this.btn7Taken = false;
    this.btn8R3x = false;
    this.btn8R3o = false;
    this.btn8Taken = false;
    this.btn9R3x = false;
    this.btn9R3o = false;
    this.btn9Taken = false;
    this.gameWon = false;
    this.playAgainBtn = false;
  }

  exitGame() {
    this.gService.scoreX = 0;
    this.gService.scoreO = 0;
    this.router.navigateByUrl('/gselection');
  }

  playerNotification(player) {
    if (player === 'x') {
      this.messageTxt = 'Player x Turn';
    } else if (player === 'o') {
      this.messageTxt = 'Player o Turn';
    } else {
      console.log('No Notification Message');
    }
  }
}
