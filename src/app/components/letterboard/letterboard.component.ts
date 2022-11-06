import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { map } from 'rxjs';
import { LetterState } from 'src/app/common/constants';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-letterboard',
  templateUrl: './letterboard.component.html',
  styleUrls: ['./letterboard.component.scss']
})
export class LetterboardComponent implements OnInit, OnChanges {
  @ViewChildren('tryContainer') tryContainers!: QueryList<ElementRef>; // reference to the current row container for current guess

  numTries: number = 0; // effectively the row on teh board

  rowLen: number = 6; // represents max number of tries
  colLen: number = 5; // represents targetWord length

  letterIndex: number = 0; // effectively the col on the board

  board: any[][] = [];

  @Input("gameData")
  gameData: any;

    // Keyboard rows.
    readonly keyboardRows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
    ];

  // Stores the state for the keyboard key indexed by keys.
  curLetterStates: {[key: string]: LetterState} = {};

  targetWord: string = "";

  playerBoard: any;

  constructor(private gameService: GameService) {

   }

   playerData: any;

  ngOnInit(): void {
    // console.log(this.gameService.createSingleGame().then((result) => {
    //   console.log(result)
    // }));

    // this.gameService.createSingleGame().subscribe((res: any) => {
    //   console.log(res);
    //   console.log("board init")
    //   this.initBoard(res['wordList'][0]);
    // })

    // this.gameService.getLobbyStartedEvent().subscribe((data) => {
    //   console.log("data: " + data);
    // })

  }

  ngOnChanges(changes: SimpleChanges): void { // need to avoid resetting the entire board if the current guess isn't finished
    console.log(changes);

    // TODO: rewrite this to be more compressed
    if(this.gameData !== undefined) {
      let prevPlayerBoard = undefined;
      let currentPlayerBoard = undefined;
      const wordList = this.gameData["roomData"]["wordList"];
      this.playerData = this.gameService.getPlayerData();
      this.playerBoard = this.findPlayerBoard(this.playerData["playerId"], this.gameData["roomData"]["boardData"]);

      if(changes["gameData"]["currentValue"] !== undefined) {        
        console.log(changes["gameData"]["currentValue"]["roomData"]["boardData"]);
        currentPlayerBoard = this.findPlayerBoard(this.playerData["playerId"], changes["gameData"]["currentValue"]["roomData"]["boardData"]);
      }

      if(changes["gameData"]["previousValue"] !== undefined) {
        console.log(changes["gameData"]["previousValue"]["roomData"]["boardData"]);
        prevPlayerBoard = this.findPlayerBoard(this.playerData["playerId"], changes["gameData"]["previousValue"]["roomData"]["boardData"]);
      }

      if(prevPlayerBoard === undefined || 
        (prevPlayerBoard !== undefined && currentPlayerBoard !== undefined && 
          prevPlayerBoard["currentWordIndex"] !== currentPlayerBoard["currentWordIndex"] && currentPlayerBoard["currentWordIndex"] < wordList.length)) {
        console.log('new word- initting board');
        console.log(prevPlayerBoard !== undefined && currentPlayerBoard !== undefined && prevPlayerBoard["currentWordIndex"] !== currentPlayerBoard["currentWordIndex"]);
        this.initBoard(this.gameData, this.playerBoard );
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 

    if(this.gameData !== undefined && this.gameData["roomData"]["gameStatus"] !== "GAME_OVER") {
      this.handleKeyPress(event.key);
    }
  }

  async handleKeyPress(key : string) {

    console.log("keypressed:" + key);
    if(this.numTries < this.rowLen) {
      const tryContainer =
      this.tryContainers.get(this.numTries)?.nativeElement as
            HTMLElement;

      const letterEles = this.tryContainers.get(this.numTries)?.nativeElement.children;

      // check if the key is a alpha char (for typing, we could submit letter states as well for each type and just overwrite the current num try / row)
      if(this.isAlpha(key)) {
        console.log("in letter");

        if(this.letterIndex < this.colLen) {
          this.board[this.numTries][this.letterIndex].letter = key;
          this.letterIndex++;
          this.gameService.submitLetterStates(this.gameData["roomId"], this.numTries, this.board[this.numTries]);
        }
      }
      else if(key === "Backspace"){
        console.log("in backspace");
        if(this.letterIndex > 0) {
          this.letterIndex--;
          this.board[this.numTries][this.letterIndex].letter = "";
          this.gameService.submitLetterStates(this.gameData["roomId"], this.numTries, this.board[this.numTries]);
        }
      }
      else if(key === "Enter") { // transfer valdiation to api side
        console.log("in Enter");
        let guessWord : string = '';

        this.board[this.numTries].forEach((letterBox) => {guessWord += letterBox.letter.toUpperCase()});

        console.log(guessWord)
        if(guessWord.length !== this.targetWord.length) {
          tryContainer.classList.add('shake');
          setTimeout(() => {
            tryContainer.classList.remove('shake');
          }, 500);
          return;
        }

        let targetLetterCounts = this.getLetterFrequencies(this.targetWord);

        console.log("target word: " + this.targetWord);
        console.log(targetLetterCounts);
        console.log(targetLetterCounts.get("b"))

        console.log(this.tryContainers.get(this.numTries)?.nativeElement.children);
        // set the state of the letters 
        for(let i = 0; i < this.targetWord.length; i++) {

          if(targetLetterCounts.has(guessWord[i]) && targetLetterCounts.get(guessWord[i])! > 0) {              
            if(this.targetWord[i] === guessWord[i] ) {
              console.log("right letter, right position: " + i);
              this.board[this.numTries][i].state = LetterState.CORRECT;
              this.curLetterStates[guessWord[i]] = LetterState.CORRECT;
            } else {
              console.log("right letter, wrong position: " + i);
              this.board[this.numTries][i].state = LetterState.PARTIAL;
              if(this.curLetterStates[guessWord[i]] !== LetterState.CORRECT) {
                this.curLetterStates[guessWord[i]] = LetterState.PARTIAL;
              }
            }

            // subtract letter count
            let newCount = targetLetterCounts.get(guessWord[i])! - 1;
            targetLetterCounts.set(guessWord[i], newCount);
          } else {
            console.log("wrong letter: " + i);
            this.board[this.numTries][i].state = LetterState.WRONG;
            if(this.curLetterStates[guessWord[i]] !== LetterState.CORRECT) {
              this.curLetterStates[guessWord[i]] = LetterState.WRONG;
            }
          }

        }

        this.gameService.submitLetterStates(this.gameData["roomId"], this.numTries, this.board[this.numTries]);

        console.log(this.board[this.numTries]);
        console.log("numTries: " + this.numTries);

        if(guessWord !== this.targetWord) {
          console.log("guess submitted - wrong word")
          
            // // a guess is used up. move to next row (move this to server)
            this.numTries++;
            this.letterIndex = 0;
        } 
        
        if(this.numTries >= this.rowLen) {
          console.log("guess submitted - used up attempts. fetching next word")
          
          this.gameService.requestNewWord(this.gameData["roomId"], false);

        } else if(guessWord === this.targetWord) {
            console.log("you got it!!!");

            // animate getting the word (do a wave animation)

            for(let i = 0; i < this.rowLen; i++) {
              const rowContainer =
                this.tryContainers.get(i)?.nativeElement as
                      HTMLElement;
              
              rowContainer.classList.add('popbounce');
              setTimeout(() => {
                rowContainer.classList.remove('popbounce');
              }, 500);
              
              // delay to allow for other animations go through
              await this.wait(100);
            }

            await this.wait(120);


            this.gameService.requestNewWord(this.gameData["roomId"], true);
        }

        // bounce the container to show successful submission
        tryContainer.classList.add('popbounce');
        setTimeout(() => {
          tryContainer.classList.remove('popbounce');
        }, 500);
      }
    }
  }

  private isAlpha(char: string):boolean {
    return char.length === 1 && /^[A-Za-z]$/i.test(char);
  }


  private getLetterFrequencies(word: string) : Map<string,number> {

    let result = new Map<string, number>();

    if(word) {
      for(let i = 0 ; i < word.length; i++) {
        let key = word[i];
        let letterCount = result.get(key);
        
        console.log('letter: ' + letterCount);
        if(letterCount !== undefined) {
          result.set(key, letterCount + 1);
        } else {
          result.set(key, 1);
        }
      }
    }
    return result;
  }

  async initBoard(gameData: any, playerBoard: any) {
    if(gameData) {
      const gameConfig = gameData["roomData"]["config"];
      const wordList = gameData["roomData"]["wordList"];

      if(playerBoard !== undefined) {

        // init variables
        this.curLetterStates = {};
        this.board = [];
        this.numTries = 0; // effectively the current row on the board (attempt/guess)
        this.rowLen = gameConfig["numTries"]; // represents max number of tries
        this.letterIndex = 0; // effectively the col on the board
        this.targetWord = wordList[playerBoard["currentWordIndex"]];
        this.colLen = this.targetWord.length;
        ;

        // init board
        for(let row = 0; row < this.rowLen; row++) { 
          let rowBoxes = [];
          for(let col = 0; col < this.colLen; col++) {
            rowBoxes.push({letter: "", state : LetterState.PENDING})
          }

          this.board.push(rowBoxes);
        }
      }
    }
  }

  findPlayerBoard( playerId: string, boardList: any) {
    for(let i = 0; i < boardList.length; i++) {
      const board = boardList[i];

      if(board["playerId"] === playerId) {
        return board;
      }
    }
    return undefined;
  }

  /*
    Need a better way to do active rows / cols. and also think of better way to add css classes here. 
  */
  getLetterStateClass(row:number, col: number, letterState:LetterState) : string{
    let cssClass: string = ""; 

    // css class for coloring the letter states
    if(letterState === LetterState.PENDING) {
      cssClass = "pending-state";
    } else if(letterState === LetterState.CORRECT) {
      cssClass = "correct-state";
    } else if(letterState === LetterState.PARTIAL) {
      cssClass = "partial-state";
    } else if(letterState === LetterState.WRONG) {
      cssClass = "wrong-state";
    }

    // css class to determine whether this letter is where the cursor should be at (next letter to be typed)
    if(row === this.numTries && col === this.letterIndex) {
      cssClass += " active";
    }

    return cssClass;
  }

  // Returns the classes for the given keyboard key based on its state.
  getKeyClass(key: string): string {
    const state = this.curLetterStates[key.toLowerCase()];
    switch (state) {
      case LetterState.CORRECT:
        return 'correct key';
      case LetterState.PARTIAL:
        return 'partial key';
      case LetterState.WRONG:
        return 'wrong key';
      default:
        return 'key';
    }
  }
  
  private async wait(ms: number) {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    })
  }
}
