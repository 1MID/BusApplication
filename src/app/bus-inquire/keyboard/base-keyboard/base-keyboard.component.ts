import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-base-keyboard',
  templateUrl: './base-keyboard.component.html',
  styleUrls: ['./base-keyboard.component.scss']
})
export class BaseKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  cityOnClick() {
    this.emiter.emit('city');
  }

  moreOnClick() {
    this.emiter.emit('more');
  }

}
