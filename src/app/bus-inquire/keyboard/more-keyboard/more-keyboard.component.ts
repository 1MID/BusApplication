import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-more-keyboard',
  templateUrl: './more-keyboard.component.html',
  styleUrls: ['./more-keyboard.component.scss']
})
export class MoreKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  backOnClick() {
    this.emiter.emit('back');
  }

  keyOnClick(data: string) {
    this.emiter.emit(data);
  }

}
