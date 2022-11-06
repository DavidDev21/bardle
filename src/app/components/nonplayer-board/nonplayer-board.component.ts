import { Component, Input, OnInit } from '@angular/core';
import { LetterState } from 'src/app/common/constants';

@Component({
  selector: 'app-nonplayer-board',
  templateUrl: './nonplayer-board.component.html',
  styleUrls: ['./nonplayer-board.component.scss']
})
export class NonplayerBoardComponent implements OnInit {

  @Input("playerBoard")
  playerBoard: any;

  constructor() { }

  ngOnInit(): void {
  }
  
  /*
    Need a better way to do active rows / cols. and also think of better way to add css classes here. 
  */
    getLetterStateClass(row:number, col: number, letter: string, letterState:LetterState) : string{
      let cssClass: string = ""; 

      // css class for coloring the letter states
      if(letterState === LetterState.PENDING) {
        if(letter) {
          cssClass += "typed-state";
        } else {
          cssClass += "pending-state";
        }
      } else if(letterState === LetterState.CORRECT) {
        cssClass += "correct-state";
      } else if(letterState === LetterState.PARTIAL) {
        cssClass += "partial-state";
      } else if(letterState === LetterState.WRONG) {
        cssClass += "wrong-state";
      } 
  
      return cssClass;
    }
}
