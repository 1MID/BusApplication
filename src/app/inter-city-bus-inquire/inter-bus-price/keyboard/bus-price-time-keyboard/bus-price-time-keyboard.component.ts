import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceModeService } from 'src/app/service/device-mode.service';
@Component({
  selector: 'app-bus-price-time-keyboard',
  templateUrl: './bus-price-time-keyboard.component.html',
  styleUrls: ['./bus-price-time-keyboard.component.scss', './bus-price-time-keyboard.component.phone.scss', './bus-price-time-keyboard.component.tablet.scss']
})
export class BusPriceTimeKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();
  focusIndex = 0;

  constructor(
    public deviceModeService: DeviceModeService
  ) { }

  ngOnInit(): void {
    this.deviceModeService.detectCurrentDevice();
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
