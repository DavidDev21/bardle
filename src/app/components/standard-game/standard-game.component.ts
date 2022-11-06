import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game/game.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-standard-game',
  templateUrl: './standard-game.component.html',
  styleUrls: ['./standard-game.component.scss']
})
export class StandardGameComponent implements OnInit {
  @ViewChild("summaryModal")
  summaryModal!: TemplateRef<any>;
  modalRef?: BsModalRef;

  gameData: any;
  subs : Subscription[] = [];


  currentPlayerId: string = "";
  currentPlayerBoard : any;
  playerBoardsData: any[] = [];

  mockData: any = {
    "roomId": "BYEMWM",
    "roomData": {
      "roomId": "BYEMWM",
      "gameStatus": "IN-PROGRESS",
      "config": {
        "numberWords": 10,
        "wordLength": 5,
        "numTries": 6,
        "maxPlayerCount": 5,
        "dotDamage": 1,
        "isPrivateRoom": true
      },
      "boardData": [
        {
          "playerId": "d115d545-6d70-4bcc-988b-c9f592dce27c",
          "currentWordIndex": 0,
          "currentNumTries": 0,
          "health": 47,
          "isLobbyHost": true,
          "letterStates": [
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ]
          ],
          "playerStatus": "ALIVE",
          "placement": 0,
          "numCorrectGuess": 0,
          "playerData": {
            "playerId": "d115d545-6d70-4bcc-988b-c9f592dce27c",
            "playerName": "Guest",
            "email": "",
            "password": "",
            "stats": {
              "gamesPlayed": 0,
              "wordsGuessedCorrect": 0,
              "wordsGuessedWrong": 0,
              "averagePlacement": 0
            }
          }
        },
        {
          "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
          "currentWordIndex": 0,
          "currentNumTries": 0,
          "health": 47,
          "isLobbyHost": false,
          "letterStates": [
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ]
          ],
          "playerStatus": "ALIVE",
          "placement": 0,
          "numCorrectGuess": 0,
          "playerData": {
            "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
            "playerName": "Guest",
            "email": "",
            "password": "",
            "stats": {
              "gamesPlayed": 0,
              "wordsGuessedCorrect": 0,
              "wordsGuessedWrong": 0,
              "averagePlacement": 0
            }
          }
        },
        {
          "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
          "currentWordIndex": 0,
          "currentNumTries": 0,
          "health": 47,
          "isLobbyHost": false,
          "letterStates": [
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ]
          ],
          "playerStatus": "ALIVE",
          "placement": 0,
          "numCorrectGuess": 0,
          "playerData": {
            "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
            "playerName": "Guest",
            "email": "",
            "password": "",
            "stats": {
              "gamesPlayed": 0,
              "wordsGuessedCorrect": 0,
              "wordsGuessedWrong": 0,
              "averagePlacement": 0
            }
          }
        },
        {
          "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
          "currentWordIndex": 0,
          "currentNumTries": 0,
          "health": 47,
          "isLobbyHost": false,
          "letterStates": [
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ]
          ],
          "playerStatus": "ALIVE",
          "placement": 0,
          "numCorrectGuess": 0,
          "playerData": {
            "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
            "playerName": "Guest",
            "email": "",
            "password": "",
            "stats": {
              "gamesPlayed": 0,
              "wordsGuessedCorrect": 0,
              "wordsGuessedWrong": 0,
              "averagePlacement": 0
            }
          }
        },
        {
          "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
          "currentWordIndex": 0,
          "currentNumTries": 0,
          "health": 47,
          "isLobbyHost": false,
          "letterStates": [
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ]
          ],
          "playerStatus": "ALIVE",
          "placement": 0,
          "numCorrectGuess": 0,
          "playerData": {
            "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
            "playerName": "Guest",
            "email": "",
            "password": "",
            "stats": {
              "gamesPlayed": 0,
              "wordsGuessedCorrect": 0,
              "wordsGuessedWrong": 0,
              "averagePlacement": 0
            }
          }
        },
        {
          "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
          "currentWordIndex": 0,
          "currentNumTries": 0,
          "health": 47,
          "isLobbyHost": false,
          "letterStates": [
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ]
          ],
          "playerStatus": "ALIVE",
          "placement": 0,
          "numCorrectGuess": 0,
          "playerData": {
            "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
            "playerName": "Guest",
            "email": "",
            "password": "",
            "stats": {
              "gamesPlayed": 0,
              "wordsGuessedCorrect": 0,
              "wordsGuessedWrong": 0,
              "averagePlacement": 0
            }
          }
        },
        {
          "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
          "currentWordIndex": 0,
          "currentNumTries": 0,
          "health": 47,
          "isLobbyHost": false,
          "letterStates": [
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ]
          ],
          "playerStatus": "ALIVE",
          "placement": 0,
          "numCorrectGuess": 0,
          "playerData": {
            "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
            "playerName": "Guest",
            "email": "",
            "password": "",
            "stats": {
              "gamesPlayed": 0,
              "wordsGuessedCorrect": 0,
              "wordsGuessedWrong": 0,
              "averagePlacement": 0
            }
          }
        },
        {
          "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
          "currentWordIndex": 0,
          "currentNumTries": 0,
          "health": 47,
          "isLobbyHost": false,
          "letterStates": [
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ]
          ],
          "playerStatus": "ALIVE",
          "placement": 0,
          "numCorrectGuess": 0,
          "playerData": {
            "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
            "playerName": "Guest",
            "email": "",
            "password": "",
            "stats": {
              "gamesPlayed": 0,
              "wordsGuessedCorrect": 0,
              "wordsGuessedWrong": 0,
              "averagePlacement": 0
            }
          }
        },
        {
          "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
          "currentWordIndex": 0,
          "currentNumTries": 0,
          "health": 47,
          "isLobbyHost": false,
          "letterStates": [
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ],
            [
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 },
              { "letter": "", "state": 0 }
            ]
          ],
          "playerStatus": "ALIVE",
          "placement": 0,
          "numCorrectGuess": 0,
          "playerData": {
            "playerId": "49f30623-38fa-4443-994c-1c7a31468eb9",
            "playerName": "Guest",
            "email": "",
            "password": "",
            "stats": {
              "gamesPlayed": 0,
              "wordsGuessedCorrect": 0,
              "wordsGuessedWrong": 0,
              "averagePlacement": 0
            }
          }
        }
      ],
      "wordList": [
        "HERTZ",
        "PIGGY",
        "WAKEN",
        "CLOZE",
        "KABOB",
        "PROVE",
        "LURVE",
        "RIDGY",
        "DAMPY",
        "FOXIE"
      ],
      "numPlayers": 3
    }
  }
  
  leftSideBoards: any[] = [];
  rightSideBoards: any[] = [];
  
  constructor(private game: GameService, private toastService: ToastService, private router:Router, private modalService: BsModalService) { 
  }

  ngOnInit(): void {
    console.log("I am getting init - StandardGameComponent");
    // used to detect whether this player is the host of the lobby or not - toggles host actions view
    const clientData = this.game.getPlayerData();
    this.currentPlayerId = clientData["playerId"];
    // this.gameData = this.mockData;
    let feedSub = this.game.gameDataFeed().subscribe((gameData: any) => {
      console.log("getting gamefeed");
      console.log(gameData);

      if(gameData === undefined) {
        this.router.navigate(['/']);
        this.toastService.showWarningToast("Whoops", "Something went wrong. Sending you back to home.");
      }
      this.gameData = JSON.parse(gameData);

      let playerBoards: any[] = this.gameData["roomData"]["boardData"];

      if(playerBoards && playerBoards.length > 0) {
        const opponentBoards: any[] = playerBoards.filter((board: any) => board["playerId"] !== this.currentPlayerId);

        if(opponentBoards.length == 1) {
          this.rightSideBoards = opponentBoards;
        } else {
          this.leftSideBoards = opponentBoards.slice(0, Math.max(playerBoards.length / 2, 1));
          this.rightSideBoards = opponentBoards.slice(Math.max(playerBoards.length / 2, 1));
        }
      }
      if(this.gameData["roomData"]["gameStatus"] === "GAME_OVER") {
        console.log("game is over");
        console.log(this.gameData);
        this.clearSubs(); // remove subscription since game is over
        this.playerBoardsData = this.gameData["roomData"]["boardData"];
        this.playerBoardsData.sort((a,b) => a.placement - b.placement);

        this.currentPlayerBoard = this.findPlayerBoard(this.currentPlayerId, this.gameData["roomData"]["boardData"]);

        this.modalRef = this.modalService.show(this.summaryModal, {backdrop: 'static'});
        this.toastService.showInfoToast("Game Status", "Game is over!!!!!!!!!!!!");
      }
    });

    this.subs.push(feedSub);
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
  @HostListener('window:popstate', ['$event'])
  leaveRoom() {
    this.modalService.hide();
    if(this.gameData != undefined) {
      this.clearSubs(); //unsub before leaving the room to avoid a attempt refresh
      this.game.leaveLobby(this.gameData.roomId);
      this.router.navigate(['/']);
    } else {
      console.log("no room to leave from");
      this.router.navigate(['/']);
    }
    this.toastService.showSuccessToast("Yeeeeet!", "You have left the game");

  }

  // simplying moves player to unready status and go back to waiting room
  rematch() {
    this.modalService.hide();
    if(this.gameData !== undefined) {
      this.game.rematch(this.gameData.roomId);
      this.router.navigate(['/lobby/' + this.gameData.roomId]);
    } else {
      this.toastService.showWarningToast("Aww", "Failed to rejoin lobby for a rematch");
      this.router.navigate(['/']);
    }
  }

  clearSubs() {
    for(let i = 0; i < this.subs.length; i++) {
      this.subs[i].unsubscribe();
    }
  }

  ngOnDestroy(): void {
    console.log("clean up: StandardGameComponent component");
    this.clearSubs();
  }

}
