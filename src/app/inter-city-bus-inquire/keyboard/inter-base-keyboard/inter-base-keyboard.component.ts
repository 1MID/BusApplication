import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inter-base-keyboard',
  templateUrl: './inter-base-keyboard.component.html',
  styleUrls: ['./inter-base-keyboard.component.scss']
})
export class InterBaseKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  keyOnClick(data: string) {
    this.emiter.emit(data);
  }

}
