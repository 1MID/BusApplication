import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouteHandlerService } from 'src/app/service/route-handler.service';
import { QueryNearbyService } from 'src/app/service/query-nearby.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from "sweetalert2";
import { DeviceModeService } from 'src/app/service/device-mode.service';
@Component({
  selector: 'app-position-bus',
  templateUrl: './position-bus.component.html',
  styleUrls: ['./position-bus.component.scss', './position-bus.component.phone.scss', './position-bus.component.tablet.scss']
})
export class PositionBusComponent implements OnInit, OnDestroy {
  paramsRes;
  queryData = { DepartureStopNameZh: '', DestinationStopNameZh: '', Direction0: null, Direction1: null, mapImgSrc: '' }

  tabsIndex = 0; //tab的索引
  outputData = []; //根據tab的索引值決定要輸出的資料(去程或返程)
  refreshInterval; // 刷新資料用 計時器
  lastRefreshTime = 0;
  haveEstimateTime = false; //高雄台中桃園才有預估到站時間
  hint = "查詢中...";

  constructor(
    private routeHandlerService: RouteHandlerService,
    private queryNearbyService: QueryNearbyService,
    private router: Router,
    private location: Location,
    public deviceModeService: DeviceModeService
  ) { }

  ngOnInit(): void {
    this.deviceModeService.detectCurrentDevice();
    this.getPositionBusData();
    this.ifHaveEstimateTime();
    this.getDestinationStop();
    this.enabledAutoRefresh();
  }

  ngOnDestroy() {
    clearInterval(this.refreshInterval);
  }

  /**
   * 從Service取得本頁資料
   */
  getPositionBusData() {
    this.paramsRes = this.routeHandlerService.getPositionBusData();
    if (!this.paramsRes) { this.routeHandlerService.navigateToNearStation(); }
  }

  /**
   * 取得出發地與目的地
   */
  getDestinationStop() {
    if (!this.paramsRes) { return; }
    this.queryNearbyService.getDestinationStop(this.paramsRes.city, this.paramsRes.stationName).then(res => {
      this.queryData.DepartureStopNameZh = res[0].DepartureStopNameZh;
      this.queryData.DestinationStopNameZh = res[0].DestinationStopNameZh;
      this.queryData.mapImgSrc = res[0].RouteMapImageUrl;
      console.log(res)
    })
  }

  /**
   * 取得本路線實時動態
   */
  getRealTimeData() {

    Promise.all([
      this.queryNearbyService.getStopRealTimeData(this.paramsRes.city, this.paramsRes.stationName, 0),
      this.queryNearbyService.getStopRealTimeData(this.paramsRes.city, this.paramsRes.stationName, 1),
    ]).then((res: any) => {
      console.log(res)
      this.queryData.Direction0 = res[0];//去程資料
      this.queryData.Direction1 = res[1];//回程資料
      this.tabsIndex == 0 ? this.outputData = this.queryData.Direction0 : this.outputData = this.queryData.Direction1;
      if (this.outputData.length == 0) { this.hint = "查無資料" }
    })

  }

  /**
   * Tabs切換
   */
  tabsChange() {
    this.tabsIndex === 0 ? this.outputData = this.queryData.Direction0 : this.outputData = this.queryData.Direction1;
    if (this.outputData.length == 0) { this.hint = "查無資料" }
  }

  /**
   * 啟動自動刷新
   */
  enabledAutoRefresh() {
    if (!this.paramsRes) { return; }
    this.getRealTimeData();

    this.lastRefreshTime = 0;
    let lastRefreshInterval = setInterval(() => {
      this.lastRefreshTime += 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(lastRefreshInterval)
      this.enabledAutoRefresh();
    }, 30000);
  }

  /**
   * 返回按鈕
   */
  backOnClick() {
    this.location.back();
  }

  ifHaveEstimateTime() {
    if (this.paramsRes.city === 'Taichung' || this.paramsRes.city === 'Taoyuan' || this.paramsRes.city === 'Kaohsiung') {
      this.haveEstimateTime = true;
    }
  }

  navigateToHome() {
    this.routeHandlerService.navigateToHome();
  }

  mapOnClick() {
    console.log(this.queryData.mapImgSrc)
    if (this.queryData.mapImgSrc != "") {
      window.open(this.queryData.mapImgSrc, "_blank");
    } else {
      Swal.fire({
        icon: 'info',
        title: '本路線無地圖資訊',
        confirmButtonText: '關閉',
      })
    }

  }
}
