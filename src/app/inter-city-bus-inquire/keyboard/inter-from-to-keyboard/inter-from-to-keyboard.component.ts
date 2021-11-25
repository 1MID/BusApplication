import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-inter-from-to-keyboard',
  templateUrl: './inter-from-to-keyboard.component.html',
  styleUrls: ['./inter-from-to-keyboard.component.scss']
})
export class InterFromToKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  btnOnClick(data: string) {
    this.emiter.emit(data);
  }
}
