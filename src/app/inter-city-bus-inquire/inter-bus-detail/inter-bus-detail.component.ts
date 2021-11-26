import { Component, OnInit } from '@angular/core';
import { RouteHandlerService } from 'src/app/service/route-handler.service';
import { QueryInterBusService } from 'src/app/service/query-inter-bus.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-inter-bus-detail',
  templateUrl: './inter-bus-detail.component.html',
  styleUrls: ['./inter-bus-detail.component.scss']
})
export class InterBusDetailComponent implements OnInit {
  paramsRes;
  originData;
  outputData;
  tabsIndex = 0; //tab的索引

  titleSplit = {
    departure: "",
    destination: "",
  };
  constructor(
    private routeHandlerService: RouteHandlerService,
    private queryInterBusService: QueryInterBusService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getParamsRes();
    this.getInterBusStartTime();
  }

  getParamsRes() {
    this.paramsRes = this.routeHandlerService.getInterBusDetailData();
    let paramSplit = this.paramsRes.Headsign.split('→');
    if (paramSplit.length === 1) { paramSplit = this.paramsRes.Headsign.split('－'); }
    this.titleSplit.departure = paramSplit[0];
    this.titleSplit.destination = paramSplit[paramSplit.length - 1];
    console.log(this.paramsRes)
  }

  getInterBusStartTime() {
    // 61880 要輸入6188
    let subRouteQueryName = this.paramsRes.SubRouteName.Zh_tw.substring(0, this.paramsRes.SubRouteName.Zh_tw.length - 1)
    //res[0]返程  res[1]去程
    Promise.all([
      this.queryInterBusService.getInterBusStartTime(subRouteQueryName, 1),
      this.queryInterBusService.getInterBusStartTime(subRouteQueryName, 0)
    ]).then(res => {
      console.log(res);
      this.originData = res;
      this.handleSetOutputData();
    })
  }

  /**
   * 把資料轉成最後要的，方便HTML輸出
   */
  handleSetOutputData() {
    let tmp;

    if (this.tabsIndex == 0) {
      tmp = JSON.parse(JSON.stringify(this.originData[0][0]));
    } else if (this.tabsIndex == 1) {
      tmp = JSON.parse(JSON.stringify(this.originData[1][0]));
    }

    let tmp2 = [];
    tmp.Timetables.map(item => {
      item.StopTimes.map(data => {
        tmp2.push(data.ArrivalTime);
      })
    })

    let tmp3 = [];
    tmp2.map(item => {
      tmp3.push(+(item.replace(':', '')));
    })
    tmp3 = tmp3.sort(function (a, b) {
      return a - b;
    });

    this.outputData = [];
    tmp3.map(item => {
      let n = item.toString();
      if (n.length < 4) {
        n[0] != '1' ? n = '0' + n : null
        n.padEnd('0', 4);
      }
      let x = n[0] + n[1] + ":" + n[2] + n[3]
      this.outputData.push(x)
    })
  }

  /**
 * 返回按鈕
 */
  backOnClick() {
    this.location.back();
  }

  /**
* Tabs切換
*/
  tabsChange() {
    console.log('hi')
    this.handleSetOutputData()
  }

}
