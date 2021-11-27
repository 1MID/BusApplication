import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bus-price-date-keyboard',
  templateUrl: './bus-price-date-keyboard.component.html',
  styleUrls: ['./bus-price-date-keyboard.component.scss']
})
export class BusPriceDateKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();
  @ViewChild('date_m') EleDateM;
  @ViewChild('date_d') EleDateD;

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
        this.EleDateM.nativeElement.focus();
      } else if (currentEleId.id === 'date_m') {
        this.EleDateD.nativeElement.focus();
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
