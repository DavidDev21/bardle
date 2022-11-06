import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game/game.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-wait-room',
  templateUrl: './wait-room.component.html',
  styleUrls: ['./wait-room.component.scss']
})
export class WaitRoomComponent implements OnInit {

  roomData : any = undefined;

  playerBoards: any[] = [];

  constructor(private game: GameService, private router:Router, private toastService: ToastService, private clipboard: Clipboard) { }

  subs : Subscription[] = [];
  
  mockPlayerList: any[] = [["abc",{playerId : "id1", isLobbyHost : true}], ["def",{playerId : "id2", isLobbyHost : false}], ["gef",{playerId : "id3", isLobbyHost : false}]];

  isHost: boolean = true;

  numberWordsOptions: number[] = [5,10,15,20,25];

  numberTriesOptions: number[] = [4,5,6,7,8];

  lobbyMaxSizeOptions: number[] = [5,10,15];

  wordLengths: number[] = [4,5,6];

  dotOptions: number[] = [1,3,5];

  playerData: any;

  currentPlayerBoard : any;

  lobbyConfig: any = undefined;

  ngOnInit(): void {
    console.log("init - waiting room");
    console.log(this.mockPlayerList);
    let roomDataSub = this.game.getRoomData().subscribe((data) => {
      this.roomData = data;
      console.log(data);
      console.log("data has changed!");
      if(this.roomData == undefined) {
        console.log("moveing")
        this.router.navigate(['/']);
        this.toastService.showWarningToast("Whoops!", "Something went wrong. Returning to home!");
      } else {
        this.lobbyConfig = this.roomData["roomData"]["config"];
        this.playerBoards = this.roomData["roomData"]["boardData"];
        console.log(this.lobbyConfig);
  
        // used to detect whether this player is the host of the lobby or not - toggles host actions view
        const clientData = this.game.getPlayerData();
        this.playerData = clientData; // to be refractored to an object with player data (contianing: id, rank, name, etc)
        this.currentPlayerBoard = this.findPlayerBoard(clientData["playerId"], this.roomData["roomData"]["boardData"]);

        console.log(this.currentPlayerBoard);
        console.log(this.currentPlayerBoard);
  
        if(this.currentPlayerBoard == undefined) {
          this.router.navigate(['/']);
          this.toastService.showErrorToast("Sadge", "You have been kicked!");
        }
  
        this.isHost = this.currentPlayerBoard["isLobbyHost"];
        if(this.roomData !== undefined &&
          this.roomData["roomData"]["gameStatus"] === "IN-PROGRESS") {
            this.router.navigate(['/game/' + this.roomData.roomId]);
          }
      }
    });



    this.subs.push(roomDataSub);
  }
  
  @HostListener("window:popstate")
  leaveLobby() : void {

    if(this.roomData != undefined) {    
      //unsub before leaving the room to avoid a attempt refresh
      for(let i = 0; i < this.subs.length; i++) {
        this.subs[i].unsubscribe();
      }
      this.game.leaveLobby(this.roomData.roomId);
      this.router.navigate(['/']);
    } else {
      console.log("no room to leave from");
      this.router.navigate(['/']);
    }
  }

  startLobby() : void {
    let numReadyPlayers = 0;
    let boards = this.roomData["roomData"]["boardData"];

    if(boards === undefined) {
      this.toastService.showErrorToast("Hmmm?", "Don't have enough info to determine lobby state. Please remake the lobby");
    }

    if(boards !== undefined) {
      console.log(boards);
      for (let i = 0 ; i < boards.length; i++) {
        if(boards[i]["playerStatus"] === "READY") {
          numReadyPlayers++;
        }
      }

      console.log(numReadyPlayers);
      // Don't start the room if not enough players are ready
      // boards.length -1  == dont count the host. host does not need to get ready
      if(this.roomData != undefined && numReadyPlayers === boards.length - 1) {
        this.game.startLobby(this.roomData.roomId);
        this.router.navigate(['/game/' + this.roomData.roomId]);
      } else {
        console.log("Did not start game lobby");
        if(numReadyPlayers !== boards.length - 1) {
          this.toastService.showWarningToast("Reeee!", "Not all players are ready!");
        } else {
          this.toastService.showErrorToast("Oof!", "Failed to start game for unknown reason.");
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

  kickPlayer( playerId: string ) {
    this.game.kickPlayer(this.roomData["roomId"], playerId);
  }

  copyLobbyCode() {
    this.clipboard.copy(this.roomData["roomId"]);
    this.toastService.showSuccessToast("Waiting Room", "Successfully copied lobby code to clipboard");
  }

  changeNumberWords(val: number) {
    this.lobbyConfig["numberWords"] = Number(val);
    this.submitLobbyConfigChange();
  }

  changeWordLength(val: number) {
    this.lobbyConfig["wordLength"] = Number(val);
    this.submitLobbyConfigChange();
  }

  changeNumberAttempts(val: number) {
    this.lobbyConfig["numTries"] = Number(val);
    this.submitLobbyConfigChange();
  }

  changeLobbySize(val: number) {
    if(val < this.roomData["roomData"]["boardData"].length) {
      console.log("invalid lobby size change");
      this.toastService.showErrorToast("Invalid change", "Your lobby size can't be smaller than your lobby count. Kick players if you want smaller lobby");
    } else {
      this.lobbyConfig["maxPlayerCount"] = Number(val);
      this.submitLobbyConfigChange();
    }
  }

  changeDotDamage(val: number) {
    this.lobbyConfig["dotDamage"] = Number(val);
    this.submitLobbyConfigChange();
  }

  togglePrivateRoom(val: boolean) {
    this.lobbyConfig["isPrivateRoom"] = val;
    this.submitLobbyConfigChange();
  }

  submitLobbyConfigChange() {
    this.game.changeLobbyConfig(this.roomData["roomId"], this.lobbyConfig);
  }

  togglePlayerReadyStatus() {
    let newStatus = "NOT_READY";
    if(this.currentPlayerBoard !== undefined) {
      newStatus = this.currentPlayerBoard["playerStatus"] === "READY" ? "NOT_READY" : "READY";
    }
    this.game.changePlayerStatus(this.roomData["roomId"], this.playerData["playerId"], newStatus);
  }
  
  ngOnDestroy() : void {
    console.log("clean up: wait-room component");
    for(let i = 0; i < this.subs.length; i++) {
      this.subs[i].unsubscribe();
    }
  }
}
