import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bus-price-road-keyboard',
  templateUrl: './bus-price-road-keyboard.component.html',
  styleUrls: ['./bus-price-road-keyboard.component.scss']
})
export class BusPriceRoadKeyboardComponent implements OnInit {
  @Input() data: any;
  @Input() direction: number;
  @Output() emiter = new EventEmitter<any>();

  directionName = '';
  constructor() { }

  ngOnInit(): void {
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
