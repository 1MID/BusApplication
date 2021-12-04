import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class RouteHandlerService {

  constructor(
    private router: Router,
    private location: Location
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

  navigateToInterCityBus() {
    this.router.navigate(['inter-city-bus'], {});
  }

  //客運詳細頁
  interBusDetaildata;
  setInterBusItem(data) {
    this.interBusDetaildata = data;
  }
  getInterBusItem() {
    return this.interBusDetaildata;
  }

  navigateToInterBusDetail() {
    this.router.navigate(['inter-city-bus/detail'], {});
  }

  navigateToInterBusPrice() {
    this.router.navigate(['inter-city-bus/price'], {});
  }

  navigateToCollectPage() {
    this.router.navigate(['collect'], {});
  }

  locationBack() {
    this.location.back();
  }
}
