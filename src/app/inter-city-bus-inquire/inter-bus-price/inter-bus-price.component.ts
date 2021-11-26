import { Component, OnInit } from '@angular/core';
import { RouteHandlerService } from 'src/app/service/route-handler.service';
import { Location } from '@angular/common';
import { QueryInterBusService } from 'src/app/service/query-inter-bus.service';

@Component({
  selector: 'app-inter-bus-price',
  templateUrl: './inter-bus-price.component.html',
  styleUrls: ['./inter-bus-price.component.scss']
})
export class InterBusPriceComponent implements OnInit {
  paramsRes;
  originData;

  //傳給選路線的資料
  roadSelectData;
  roadDirection;

  positionData = {
    departure: [], // 全部起站
    destination: [], // 全部迄站
    currentDeparture: '', // 當前選擇的起站
    currentDestination: ''// 當前選擇的迄站
  }

  showInputKeyboard = {
    road: false,

  }

  constructor(
    private routeHandlerService: RouteHandlerService,
    private location: Location,
    private queryInterBusService: QueryInterBusService,
  ) { }

  ngOnInit(): void {
    this.getParamsRes();
    this.getInterBusRoad();
  }

  getParamsRes() {
    this.paramsRes = this.routeHandlerService.getInterBusItem()
    console.log(this.paramsRes)
  }


  /**
   * 透過RouteName取得他的路線，才能讓User選
   */
  getInterBusRoad() {
    // 61880 要輸入6188
    let subRouteQueryName = this.paramsRes.SubRouteName.Zh_tw.substring(0, this.paramsRes.SubRouteName.Zh_tw.length - 1)
    this.queryInterBusService.getInterBusRoad(subRouteQueryName).then((res: any) => {

      //把61880還回來
      res = res.filter(item =>
        item.SubRouteName.Zh_tw == this.paramsRes.SubRouteName.Zh_tw
      )

      res[0].Stops.map(item => { this.positionData.departure.push(item.StopName.Zh_tw); })
      res[1].Stops.map(item => { this.positionData.destination.push(item.StopName.Zh_tw); })

      this.positionData.currentDeparture = this.positionData.departure[0];
      this.positionData.currentDestination = this.positionData.destination[0];
    })
  }

  /**
   * User選完起訖站 跟 出發時間 -> 查出票價
   */
  getPriceData() {
    // 61880 要輸入6188
    let subRouteQueryName = this.paramsRes.SubRouteName.Zh_tw.substring(0, this.paramsRes.SubRouteName.Zh_tw.length - 1)
    this.queryInterBusService.getInterBusPrice(subRouteQueryName).then((res: any) => {

      //把61880還回來
      res = res.filter(item =>
        item.SubRouteName == this.paramsRes.SubRouteName.Zh_tw
      )
      console.log('未整理之票價資訊', res)
    })
  }

  switchOnClick() {
    let tmp = this.positionData.currentDeparture;
    this.positionData.currentDeparture = this.positionData.currentDestination;
    this.positionData.currentDestination = tmp;
  }

  backOnClick() {
    this.location.back();
  }

  /**
   * 選擇起訖站
   * @param index 0代表選擇起站 1代表選擇迄站
   */
  roadSelectOnClick(index: number) {
    this.showInputKeyboard.road = true;
    index == 0 ? this.roadSelectData = this.positionData.departure : this.roadSelectData = this.positionData.destination
    this.roadDirection = index;
  }


  getEmitVal(e) {
    console.log('收到', e)
    this.showInputKeyboard.road = false;
    if (e === 'cancel') {
      return;
    } else {
      this.roadDirection == 0 ? this.positionData.currentDeparture = e : this.positionData.currentDestination = e
    }
  }
}
