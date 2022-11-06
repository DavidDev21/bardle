import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from 'src/app/services/game/game.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  accountUpdateForm: FormGroup;

  displayRegisterForm: boolean = false;
  loadingLogin = false;
  loadingRegister = false;
  submittedLogin = false;
  submittedRegister = false;
  submittedAccountUpdate = false;

  playerData: any;


  constructor( private formBuilder: FormBuilder, private game: GameService,  private toastService: ToastService) {
    this.playerData = this.game.getPlayerData();

    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        playerName: ['', Validators.required]
    });

    this.accountUpdateForm = this.formBuilder.group({
        playerName: [this.playerData['playerName'], Validators.required]
    });
  }

  ngOnInit(): void {
    this.playerData = this.game.getPlayerData();
  }

  // convenience getter for easy access to form fields
  get loginFG() { return this.loginForm.controls; }

  get registerFG() { return this.registerForm.controls; }

  get accountUpdateFG() { return this.accountUpdateForm.controls; }

  login() {
    if(this.displayRegisterForm === true) {
      this.displayRegisterForm = false;
      console.log("displayRegisterForm = false");
      return;
    }

    this.submittedLogin = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.toastService.showWarningToast("Give me more!", "All fields are required for login");
        return;
    }
    this.loadingLogin = true;

    this.game.login(this.loginFG['email'].value, this.loginFG['password'].value)
      .subscribe((data) => {
        console.log(data);
        this.game.setPlayerData(data);
        this.playerData = data;
        this.accountUpdateForm.setValue({"playerName" : this.playerData?.playerName});
      }, (err) => {
        console.log(err);
        this.toastService.showErrorToast("Ouch!", "Invalid email/password combination");
      });

    this.loadingLogin = false;
  }

  register() {
    if(this.displayRegisterForm === false) {
      this.displayRegisterForm = true;
      console.log("displayRegisterForm = true");
      return;
    }

    this.submittedRegister = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.toastService.showWarningToast("Give me more!", "All fields are required for registering");
      return;
    }

    this.loadingRegister = true;

    this.game.registerNewPlayer(this.registerFG['email'].value, this.registerFG['password'].value, this.registerFG['playerName'].value)
    .subscribe((data) => {
      console.log(data);
      this.game.setPlayerData(data);
      this.playerData = data;

    }, (err) => {
      console.log(err);
    });

    this.loadingRegister = false;

  }

  updateDisplayName() {
    this.submittedAccountUpdate = true;
    // stop here if form is invalid
    if (this.accountUpdateForm.invalid) {
      this.toastService.showWarningToast("Give me more!", "Your name can't be blank");
      return;
    }

    this.game.updatePlayerDisplayName(this.accountUpdateFG['playerName'].value)
      .subscribe((data) => {
        console.log(data);
        this.game.setPlayerData(data);
        this.playerData = data;

      }, (err) => {
        console.log(err);
      });
  }

  logout() {
    this.game.initGuestPlayer();
    this.playerData = this.game.getPlayerData();
  }

}
