import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteHandlerService {

  constructor() { }

  //附近公車站第二頁
  positionDetaildata;
  setPositionDetailData(data) {
    this.positionDetaildata = data;
  }
  getPositionDetailData() {
    return this.positionDetaildata;
  }

  //附近公車站第三頁
  positionBusData;
  setPositionBusData(data) {
    this.positionBusData = data;
  }

  getPositionBusData() {
    return this.positionBusData;
  }

}
