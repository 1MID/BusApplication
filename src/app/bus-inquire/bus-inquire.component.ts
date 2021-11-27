import { Component, OnInit, ViewChild } from '@angular/core';
import { CityListService } from '../service/city-list.service';
import { QueryBusInquireService } from '../service/query-bus-inquire.service';
import { RouteHandlerService } from 'src/app/service/route-handler.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from "sweetalert2";
import { DeviceModeService } from 'src/app/service/device-mode.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
@Component({
  selector: 'app-bus-inquire',
  animations: [
    trigger("fadeInOut", [
      state("closed", style({ opacity: "0" })),
      state("open", style({ opacity: "1" })),
      transition("open => closed", animate("0.3s ease-in")),
      transition("closed => open", animate("0.3s ease-in"))
    ])
  ],
  templateUrl: './bus-inquire.component.html',
  styleUrls: ['./bus-inquire.component.scss', './bus-inquire.component.phone.scss']
})
export class BusInquireComponent implements OnInit {
  @ViewChild('keywordInput') inputEle;
  isFadeInOutNG = false;
  keyboardIndex = 0; //0 基本鍵盤 1 城市 2 更多
  currentCity = "選擇縣市";
  busData;
  busDataFilter;

  constructor(
    private cityListService: CityListService,
    private queryBusInquireService: QueryBusInquireService,
    private routeHandlerService: RouteHandlerService,
    private router: Router,
    public deviceModeService: DeviceModeService
  ) { }

  ngOnInit(): void {
    this.deviceModeService.detectCurrentDevice();
  }

  getEmitVal(e) {
    console.log(e)
    switch (e) {
      case 'city':
        this.handleChangeAnimation(1);
        break;
      case 'more':
        this.handleChangeAnimation(2);
        break;
      case 'back':
        this.handleChangeAnimation(0);
        break;
      case 'C':
        this.handleClear();
        this.handleFilter();
        break;
      case 'delete':
        this.handleDelete();
        this.handleFilter();
        break;
      case 'custom':
        if (this.showHintAlert()) {
          this.inputEle.nativeElement.disabled = false;
          this.inputEle.nativeElement.focus();
        }
        break;
      default:
        if (this.keyboardIndex === 1) {
          this.handleCitySelect(e);
          this.handleFilter();
          this.handleChangeAnimation(0);
        } else if (this.keyboardIndex === 0) {
          if (this.showHintAlert()) {
            this.inputEle.nativeElement.value += e;
            this.handleFilter();
          }
        } else if (this.keyboardIndex === 2) {
          if (this.showHintAlert()) {
            this.inputEle.nativeElement.value = e;
            this.handleFilter();
          }
        };
        break;
    }
  }

  getBusDataByCity() {
    let cityEnName = this.cityListService.getCityNameEnByZh(this.currentCity);
    this.queryBusInquireService.getCityBusRouteData(cityEnName).then(res => {
      this.busData = res;
      this.busDataFilter = JSON.parse(JSON.stringify(this.busData));
      console.log(res);
    })
  }

  itemOnClick(item) {
    let cityEnName = this.cityListService.getCityNameEnByZh(this.currentCity);
    let positionBusData = {
      stationName: item.RouteName.Zh_tw,
      city: cityEnName
    }
    this.routeHandlerService.setPositionBusData(positionBusData);
    this.router.navigate(['nearby/position-detail/position-bus'], {});
  }

  /**
   * 負責處理搜尋過濾
   */
  handleFilter() {
    let filterStr = this.inputEle.nativeElement.value;
    if (this.busData) {
      let box = JSON.parse(JSON.stringify(this.busData));
      this.busDataFilter = box.filter(item => item.RouteName.Zh_tw.indexOf(filterStr) > -1)
    }
  }

  /**
   * 負責刪除(前一個字元)
   * @returns
   */
  handleDelete() {
    let keywordInput = this.inputEle.nativeElement.value;
    if (keywordInput.length === 1) {
      this.inputEle.nativeElement.value = "";
      return;
    }
    this.inputEle.nativeElement.value = keywordInput.substring(0, keywordInput.length - 1)
  }

  /**
   * 負責選完程式後的邏輯
   */
  handleCitySelect(e) {
    this.currentCity = e;
    this.getBusDataByCity();
  }

  /**
   * 負責Clear 清除
   */
  handleClear() {
    this.inputEle.nativeElement.value = "";
  }

  navigateToHome() {
    this.routeHandlerService.navigateToHome();
  }

  /**
   * 先選城市才能使用過濾條件
   */
  showHintAlert() {
    if (!this.busData) {
      Swal.fire({
        icon: 'info',
        title: '請先選擇縣市',
        confirmButtonText: '關閉',
      })
      return false;
    }
    return true;
  }

  handleChangeAnimation(i: number) {
    this.isFadeInOutNG = !this.isFadeInOutNG;
    setTimeout(() => {
      this.isFadeInOutNG = !this.isFadeInOutNG;
      this.keyboardIndex = i;
    }, 300);
  }
}
