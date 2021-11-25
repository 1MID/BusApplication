import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RouteHandlerService {

  constructor(
    private router: Router,
  ) { }

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

  navigateToNearStation() {
    this.router.navigate(['nearby'], {});
  }

  backToPositionDetail() {
    this.router.navigate(['nearby/position-detail'], {});
  }

  navigateToBusInquire() {
    this.router.navigate(['bus-inquire'], {});
  }
  navigateToHome() {
    this.router.navigate(['home'], {});
  }

}
