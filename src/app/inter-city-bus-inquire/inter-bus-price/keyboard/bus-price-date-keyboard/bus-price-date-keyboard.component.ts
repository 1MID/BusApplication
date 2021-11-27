import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DeviceModeService } from 'src/app/service/device-mode.service';
@Component({
  selector: 'app-bus-price-date-keyboard',
  templateUrl: './bus-price-date-keyboard.component.html',
  styleUrls: ['./bus-price-date-keyboard.component.scss', './bus-price-date-keyboard.component.phone.scss', './bus-price-date-keyboard.component.tablet.scss']
})
export class BusPriceDateKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();
  @ViewChild('date_m') EleDateM;
  @ViewChild('date_d') EleDateD;

  constructor(
    public deviceModeService: DeviceModeService
  ) { }

  ngOnInit(): void {
    this.deviceModeService.detectCurrentDevice();
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
