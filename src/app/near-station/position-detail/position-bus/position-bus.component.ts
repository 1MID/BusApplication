import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouteHandlerService } from 'src/app/service/route-handler.service';
import { QueryNearbyService } from 'src/app/service/query-nearby.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-position-bus',
  templateUrl: './position-bus.component.html',
  styleUrls: ['./position-bus.component.scss']
})
export class PositionBusComponent implements OnInit, OnDestroy {
  paramsRes;
  queryData = { DepartureStopNameZh: '', DestinationStopNameZh: '', Direction0: null, Direction1: null }

  tabsIndex = 0; //tab的索引
  outputData //根據tab的索引值決定要輸出的資料(去程或返程)
  refreshInterval; // 刷新資料用 計時器
  lastRefreshTime = 0;

  constructor(
    private routeHandlerService: RouteHandlerService,
    private queryNearbyService: QueryNearbyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPositionBusData();
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
    })
  }

  /**
   * 取得本路線實時動態
   */
  getRealTimeData() {
    Promise.all([
      this.queryNearbyService.getStopRealTimeData(this.paramsRes.city, this.paramsRes.stationName, 0),
      this.queryNearbyService.getStopRealTimeData(this.paramsRes.city, this.paramsRes.stationName, 1)
    ]).then((res: any) => {
      this.queryData.Direction0 = res[0];//去程資料
      this.queryData.Direction1 = res[1];//回程資料
      this.tabsIndex == 0 ? this.outputData = this.queryData.Direction0 : this.outputData = this.queryData.Direction1;
    })
  }

  /**
   * Tabs切換
   */
  tabsChange() {
    this.tabsIndex === 0 ? this.outputData = this.queryData.Direction0 : this.outputData = this.queryData.Direction1;
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
    this.routeHandlerService.backToPositionDetail();
  }
}
