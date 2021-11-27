import { Component, OnInit } from '@angular/core';
import { RouteHandlerService } from 'src/app/service/route-handler.service';
import { Location, DatePipe } from '@angular/common';
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

  dateSelectData = {
    dateString: "輸入出發日期",
    timeString: "選擇出發時間",
    date: {
      y: '',
      m: '',
      d: '',
    },
    time: {
      hour: '',
    }
  }

  priceResult = [];

  showInputKeyboard = {
    road: false,
    date: false,
    time: false
  }

  noResData = false;


  constructor(
    private routeHandlerService: RouteHandlerService,
    private location: Location,
    private queryInterBusService: QueryInterBusService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getParamsRes();
    this.getCurrentDate();
    this.getInterBusRoad();
    this.getPriceData();
  }

  getParamsRes() {
    this.paramsRes = this.routeHandlerService.getInterBusItem()
    console.log(this.paramsRes)
  }


  /**
   * 透過RouteName取得他的路線，才能讓User選
   */
  getInterBusRoad() {
    if (!this.paramsRes) {
      this.routeHandlerService.navigateToInterCityBus();
      return;
    }
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

      let priceData;
      res.map(resItem => {
        resItem.StageFares.map(item => {
          if (
            item.OriginStage.StopName == this.positionData.currentDeparture && //起點相符
            item.DestinationStage.StopName == this.positionData.currentDestination //終點相符
          ) {
            priceData = item; //取得票價
          }
        })
      })


      priceData?.Fares?.map(item => {   //整理成要輸出的資料
        let priceDataSplit = item.FareName.split('_');

        let obj = {
          ticketType: priceDataSplit[0] + '(' + priceDataSplit[1] + ')',
          ticketPrice: item.Price,
          ticketSit: priceDataSplit[2],
        }
        this.priceResult.push(obj);
      })

      this.priceResult.length == 0 ? this.noResData = true : this.noResData = false;

      console.log('未整理之票價資訊', res)
      console.log('票價資訊', this.priceResult)
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
    if (this.showInputKeyboard.date != false || this.showInputKeyboard.time != false) {
      return;
    }
    this.showInputKeyboard.road = true;
    index == 0 ? this.roadSelectData = this.positionData.departure : this.roadSelectData = this.positionData.destination
    this.roadDirection = index;
  }

  /**
   * 選擇日期
   * @param index
   */
  dateSelectOnClick() {
    if (this.showInputKeyboard.road != false || this.showInputKeyboard.time != false) {
      return;
    }
    this.showInputKeyboard.date = true;
  }

  /**
   * 選擇時間
   */
  timeSelectOnClick() {
    if (this.showInputKeyboard.date != false || this.showInputKeyboard.road != false) {
      return;
    }
    this.showInputKeyboard.time = true;
  }

  getEmitVal(e) {
    console.log('收到', e)
    if (this.showInputKeyboard.road) {
      this.showInputKeyboard.road = false;
      if (e === 'cancel') {
        return;
      } else {
        this.roadDirection == 0 ? this.positionData.currentDeparture = e : this.positionData.currentDestination = e
      }
    } else if (this.showInputKeyboard.date) {
      if (e.type === 'cancel') {
        this.showInputKeyboard.date = false;
        return;
      } else if (e.type === 'setting') {
        this.dateSelectData.date.y = e.y;
        this.dateSelectData.date.m = e.m;
        this.dateSelectData.date.d = e.d;
        this.dateSelectData.dateString = e.y.padStart(4, '#') + ' / ' + e.m.padStart(2, '#') + ' / ' + e.d.padStart(2, '#');
        this.showInputKeyboard.date = false;
      }
    } else if (this.showInputKeyboard.time) {
      if (e.type === 'cancel') {
        this.showInputKeyboard.time = false;
        return;
      } else if (e.type === 'setting') {
        this.dateSelectData.time.hour = e.time.toString();
        this.dateSelectData.timeString = e.time.toString().padStart(2, '0') + ' : 00';
        this.showInputKeyboard.time = false;
      }
    }
  }

  /**
   * 取得要搜尋票價用的資料
   */
  getPriceNeedData() {
    console.log('起站', this.positionData.currentDeparture)
    console.log('迄站', this.positionData.currentDestination)
    console.log('日期', this.dateSelectData.date.y + this.dateSelectData.date.m + this.dateSelectData.date.d)
    console.log('時間', this.dateSelectData.time.hour)
  }

  getCurrentDate() {
    this.dateSelectData.dateString = this.datePipe.transform(new Date(), 'yyyy / MM / dd');
    this.dateSelectData.timeString = "00:00";
  }

  clockOnClick() {
    this.routeHandlerService.navigateToInterBusDetail();
  }

  navigateToHome() {
    this.routeHandlerService.navigateToHome();
  }
}
