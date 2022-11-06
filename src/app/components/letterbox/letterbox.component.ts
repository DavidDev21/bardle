import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-letterbox',
  templateUrl: './letterbox.component.html',
  styleUrls: ['./letterbox.component.scss']
})
export class LetterboxComponent implements OnInit {

  letter:string = '2';
  
  constructor() { }

  ngOnInit(): void {
  }

}
