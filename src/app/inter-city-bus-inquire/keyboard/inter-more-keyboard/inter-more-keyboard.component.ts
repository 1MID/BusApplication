import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inter-more-keyboard',
  templateUrl: './inter-more-keyboard.component.html',
  styleUrls: ['./inter-more-keyboard.component.scss']
})
export class InterMoreKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  btnOnClick(data: string) {
    this.emiter.emit(data);
  }
}
