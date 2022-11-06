import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LetterboardComponent } from './components/letterboard/letterboard.component';
import { LetterboxComponent } from './components/letterbox/letterbox.component';
import { GameService } from './services/game/game.service';
import { ToastService } from './services/toast/toast.service';

import { GameManagerComponent } from './components/game-manager/game-manager.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { WaitRoomComponent } from './components/wait-room/wait-room.component';
import { StandardGameComponent } from './components/standard-game/standard-game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ToastComponent } from './components/toast/toast.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrdinalPipe } from './common/ordinal.pipe';
import { AccountComponent } from './components/account/account.component';
import { HttpClientModule } from '@angular/common/http';
import { NonplayerBoardComponent } from './components/nonplayer-board/nonplayer-board.component';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LetterboxComponent,
    LetterboardComponent,
    GameManagerComponent,
    MainMenuComponent,
    WaitRoomComponent,
    StandardGameComponent,
    ToasterComponent,
    ToastComponent,
    OrdinalPipe,
    AccountComponent,
    NonplayerBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [GameService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
