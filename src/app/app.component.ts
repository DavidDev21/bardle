import { Component } from '@angular/core';
import { ToastService } from './services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bardle';

  constructor(private toastService: ToastService) 
  {
  }
}
