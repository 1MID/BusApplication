import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bus-price-date-keyboard',
  templateUrl: './bus-price-date-keyboard.component.html',
  styleUrls: ['./bus-price-date-keyboard.component.scss']
})
export class BusPriceDateKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  limitInputWord(e, maxlength: number) {
    if (e.value.length == maxlength) {
      return false;
    } else {
      return true;
    }
  }

  inputAutoChange(currentEleId, maxlength) {
    if (currentEleId.value.length == maxlength) {
      if (currentEleId.id === 'date_y') {
        (<HTMLInputElement>document.getElementById('date_m')).focus();
      } else if (currentEleId.id === 'date_m') {
        (<HTMLInputElement>document.getElementById('date_d')).focus();
      }
    }
  }

  dataOnEmit(type, y?, m?, d?) {
    let obj = {
      type: type,
      y: y,
      m: m,
      d: d
    }
    this.emiter.emit(obj);
  }
}
