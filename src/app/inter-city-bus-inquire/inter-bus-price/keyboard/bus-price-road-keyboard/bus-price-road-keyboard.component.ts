import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceModeService } from 'src/app/service/device-mode.service';
@Component({
  selector: 'app-bus-price-road-keyboard',
  templateUrl: './bus-price-road-keyboard.component.html',
  styleUrls: ['./bus-price-road-keyboard.component.scss', './bus-price-road-keyboard.component.phone.scss', './bus-price-road-keyboard.component.tablet.scss']
})
export class BusPriceRoadKeyboardComponent implements OnInit {
  @Input() data: any;
  @Input() direction: number;
  @Output() emiter = new EventEmitter<any>();

  directionName = '';
  constructor(
    public deviceModeService: DeviceModeService
  ) { }

  ngOnInit(): void {
    this.deviceModeService.detectCurrentDevice();
    this.getParamsData();
  }

  getParamsData() {
    console.log(this.data);
    console.log(this.direction)
    this.direction === 0 ? this.directionName = "選擇出發站" : this.directionName = "選擇終點站"
  }

  emitOnClick(e: string) {
    this.emiter.emit(e);
  }

}
