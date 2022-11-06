import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { GameManagerComponent } from './components/game-manager/game-manager.component';
import { LetterboardComponent } from './components/letterboard/letterboard.component';
import { StandardGameComponent } from './components/standard-game/standard-game.component';
import { WaitRoomComponent } from './components/wait-room/wait-room.component';

const routes: Routes = [
  { path: 'game/:roomId', component: StandardGameComponent },
  { path: 'lobby/:roomId', component: WaitRoomComponent},
  { path: 'account', component: AccountComponent},
  { path: '', component: GameManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
