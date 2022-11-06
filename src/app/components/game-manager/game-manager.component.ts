import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game/game.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-manager',
  templateUrl: './game-manager.component.html',
  styleUrls: ['./game-manager.component.scss']
})
export class GameManagerComponent implements OnInit {
  @ViewChild("template")
  modal!: TemplateRef<any>;
  modalRef?: BsModalRef;

  roomId: string =  '';

  testData: any[] = [{playerId: "Jake", placement: 0}, {playerId : "farm", placement: 1}, {playerId: "Trash", placement: 0}, {playerId : "farm", placement: 1}, {playerId: "Trash", placement: 0}, {playerId : "farm", placement: 1}, {playerId: "Trash", placement: 0}, {playerId : "farm", placement: 1}]

  currentPlayerId: string = "Jake";

  health: number = 230;

  playerData: any; 

  constructor(private game: GameService, private router: Router, private toastService: ToastService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.playerData = this.game.getPlayerData();
  }

  createLobby() {
    console.log("create")
    this.game.createLobby().subscribe((roomDataString:any) => {
      console.log('created lobby: ' + roomDataString);
      let roomData = JSON.parse(roomDataString);
      // route to waiting room
      this.router.navigate(['/lobby/' + roomData['roomId']]);
    });
  }

  joinGame(roomId: string) {
    console.log("join: " + roomId);
    this.game.joinLobby(roomId).subscribe((roomDataString: any) => {
      console.log(roomDataString);
      if(roomDataString === undefined || roomDataString === null) {
        console.log("failed to join room: " + roomId);
        this.toastService.showWarningToast("LET ME IN!!!!!!", "Failed to join lobby. Check with your lobby host/toaster.");
      } else {
        console.log(JSON.parse(roomDataString));
              // route to waiting room
        let roomData = JSON.parse(roomDataString);
        this.router.navigate(['/lobby/' + roomData['roomId']]);
        // console.log(response['boardData']);
      }
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }
}
