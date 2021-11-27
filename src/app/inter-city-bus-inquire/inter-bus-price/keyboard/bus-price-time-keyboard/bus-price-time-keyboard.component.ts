import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-bus-price-time-keyboard',
  templateUrl: './bus-price-time-keyboard.component.html',
  styleUrls: ['./bus-price-time-keyboard.component.scss']
})
export class BusPriceTimeKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();
  focusIndex = 0;
  constructor() { }

  ngOnInit(): void {
  }

  focusIndexChange(i: number) {
    this.focusIndex = i;
  }

  emitOnClick(type: string) {
    let obj = {
      type: type,
      time: this.focusIndex
    }
    this.emiter.emit(obj);
  }


}
