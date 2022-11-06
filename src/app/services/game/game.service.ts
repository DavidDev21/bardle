import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // socket = io("http://localhost:3000");
  // roomData: any = undefined;

  // default guest user
  private playerData: any;

  private roomData: BehaviorSubject<any>  = new BehaviorSubject<any>(undefined);

  public roomObservable: Observable<any> = this.roomData.asObservable();

  private backendAPI: string = environment.backendURL;

  constructor(private socket: Socket, private http: HttpClient) {

    console.log("init game service");
    this.initGuestPlayer();
      // // client-side
      // this.socket.on("connect", () => {
      //   console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
      // });

      //this.createSingleGame();

      this.socket.fromEvent("lobbyCreated").subscribe((data: any) => {
        console.log("getRoomData lobbyCreated");
        if(data !== undefined) {
          this.roomData.next(JSON.parse(data));
        } else {
          this.roomData.next(undefined);
        }
      })
  
      this.socket.fromEvent("lobbyJoined").subscribe((data: any) => {
        console.log("getRoomData lobbyJoined");
        if(data !== undefined) {
          this.roomData.next(JSON.parse(data));
        } else {
          this.roomData.next(undefined);
        }
      })

      this.socket.fromEvent("lobbyLeave").subscribe((data: any) => {
        console.log("getRoomData lobbyLeave");
        if(data != undefined) {
          this.roomData.next(JSON.parse(data));
        } else {
          this.roomData.next(undefined);
        }
      })

      this.socket.fromEvent("playerJoinedLobby").subscribe((data: any) => {
        if(data !== undefined) {
          this.roomData.next(JSON.parse(data));
        } else {
          this.roomData.next(undefined);
        }
      });
  
      this.socket.fromEvent("playerLeaveLobby").subscribe((data: any) => {
        if(data !== undefined) {
          this.roomData.next(JSON.parse(data));
        } else {
          this.roomData.next(undefined);
        }
      });

      this.socket.fromEvent("gameDataFeed").subscribe((data: any) => {
        if(data !== undefined) {
          this.roomData.next(JSON.parse(data));
        } else {
          this.roomData.next(undefined);
        }
      });

      this.socket.fromEvent("roomDataFeed").subscribe((data: any) => {
        if(data !== undefined) {
          this.roomData.next(JSON.parse(data));
        } else {
          this.roomData.next(undefined);
        }
      });

      this.socket.fromEvent("changeLobbyConfig").subscribe((data: any) => {
        if(data !== undefined) {
          this.roomData.next(JSON.parse(data));
        } else {
          this.roomData.next(undefined);
        }
      });

      this.socket.fromEvent("playerDataFeed").subscribe((data: any) => {
        this.playerData = JSON.parse(data);
        console.log("player data updated");
        console.log(this.playerData);
      });
   }

   public createSingleGame() {

    this.socket.emit("createSingleGame", {test: "test message"});

    return this.socket.fromEvent("singleGameCreated");
    // return new Promise<any>((resolve, reject) => {
    //   console.log("trying to emit");
    //   this.socket.emit("createSingleGame", {test: "test message"});
  
    //   let res = undefined;
    //   this.socket.on("singleGameCreated", (gameData) => {
    //     console.log(gameData);
  
    //     res = gameData;
    //     resolve(res);
    //   })
    // });

   }

   public submitWordGuess(gameData: any, guess: string) {

    const roomId = gameData["roomData"]["roomId"];
    const playerId = this.playerData["playerId"];
    this.socket.emit("validateGuess", {roomId, playerId, guess});
   }

   public createLobby() {

    let lobbyConfig = {
      numberWords: 10,
      wordLength: 5,
      numTries: 6,
      maxPlayerCount: 5,
      dotDamage: 1,
      isPrivateRoom: true
    };

    let requestBody = {
      lobbyConfig,
      playerData: this.playerData
    };

    this.socket.emit("createLobby", requestBody);

    return this.socket.fromEvent("lobbyCreated");
   }

   public joinLobby(roomId: string) {
    let requestBody = {
      roomId,
      playerData: this.playerData
    }
    this.socket.emit("joinLobby", requestBody);
    return this.socket.fromEvent("lobbyJoined");
   }

   public playerJoinedLobby() {
    return this.socket.fromEvent("playerJoinedLobby");
   }

   public nextRoomData(data: any) {
    this.roomData.next(data);
   }

   public getRoomData() : Observable<any> {
    return this.roomObservable;
   }

   public leaveLobby(roomId: string) {
    let requestBody = {
      roomId,
      playerData: this.playerData
    }
    this.socket.emit("leaveLobby", requestBody);
    this.roomData.next(undefined);
   }

   public startLobby(roomId: string) {
    this.socket.emit("startLobby", roomId);
   }

   public getLobbyStartedEvent() {
    return this.socket.fromEvent("lobbyStarted");
   }

   // gets latest game data
   public gameDataFeed() {
    return this.socket.fromEvent("gameDataFeed");
   }

   public getPlayerData(){
    return this.playerData;
   }

   public setPlayerData(playerData: any){
    this.playerData = playerData;
   }

   public submitLetterStates(roomId: string, targetRow: number, letterStates : string[]) {
    this.socket.emit("submitLetterStates", {roomId, playerData: this.playerData, targetRow, letterStates});
   }

   public requestNewWord(roomId: string, isCorrectGuess:boolean) { // wont actually fetch but will trigger a gamefeed update and server will move on to next word index
    this.socket.emit("fetchNextWord", {roomId, playerData: this.playerData, isCorrectGuess});
   }

   public kickPlayer(roomId: string, playerId: string) {
    this.socket.emit("kickPlayer", {roomId, playerId});
   }

   public changeLobbyConfig(roomId: string, lobbyConfig: any) {
    this.socket.emit("changeLobbyConfig", {roomId, lobbyConfig});
   }

   public changePlayerStatus(roomId: string, playerId: string, status: string) {
    this.socket.emit("changePlayerStatus", {roomId, playerId, status});
   }

   public rematch(roomId: string) {
    this.socket.emit("rematch", {roomId, playerId: this.playerData?.playerId});
   }

   public registerNewPlayer(email: string, password: string, playerName: string) {
    return this.http.post(this.backendAPI + "registerPlayer", {email, password, playerName});
   }

   public login(email: string, password: String) {
    return this.http.post(this.backendAPI + "loginPlayer", {email, password});
   }

   public updatePlayerDisplayName(newDisplayName : string) {
    return this.http.post(this.backendAPI + "updatePlayerData", {playerData: this.playerData, updatedFields: {playerName: newDisplayName}});
   }

   // move this guest player to server
   public initGuestPlayer() {
    this.playerData = {
        "playerId": uuidv4(),
        "playerName": "Guest",
        "email" : "",
        "stats" : {
            "gamesPlayed": 0,
            "wordsGuessedCorrect": 0,
            "wordsGuessedWrong": 0,
            "averagePlacement": 0
        }
    };
   }
}
