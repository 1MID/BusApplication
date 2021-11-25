import { Component, OnInit } from '@angular/core';
import { CityListService } from '../service/city-list.service';
import { QueryBusInquireService } from '../service/query-bus-inquire.service';
import { RouteHandlerService } from 'src/app/service/route-handler.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bus-inquire',
  templateUrl: './bus-inquire.component.html',
  styleUrls: ['./bus-inquire.component.scss']
})
export class BusInquireComponent implements OnInit {

  keyboardIndex = 0; //0 基本鍵盤 1 城市 2 更多
  currentCity = "選擇縣市";
  busData;

  constructor(
    private cityListService: CityListService,
    private queryBusInquireService: QueryBusInquireService,
    private routeHandlerService: RouteHandlerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  getEmitVal(e) {
    console.log(e)
    switch (e) {
      case 'city':
        this.keyboardIndex = 1;
        break;
      case 'more':
        this.keyboardIndex = 2;
        break;
      case 'back':
        this.keyboardIndex = 0;
        break;
      case 'delete':
        let keywordInput = (<HTMLInputElement>document.getElementById('keywordInput')).value;
        (<HTMLInputElement>document.getElementById('keywordInput')).value = keywordInput.substring(0, keywordInput.length - 1)
        break;
      case 'custom':
        (<HTMLInputElement>document.getElementById('keywordInput')).disabled = false;
        (<HTMLInputElement>document.getElementById('keywordInput')).focus();
        break;
      default:
        if (this.keyboardIndex === 1) {
          this.currentCity = e;
          this.getBusDataByCity();
        } else {
          (<HTMLInputElement>document.getElementById('keywordInput')).value += e;
          this.handleFilter();
        };
        break;
    }
  }

  getBusDataByCity() {
    let cityEnName = this.cityListService.getCityNameEnByZh(this.currentCity);
    this.queryBusInquireService.getCityBusRouteData(cityEnName).then(res => {
      this.busData = res;
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

  handleFilter() {
    let filterStr = (<HTMLInputElement>document.getElementById('keywordInput')).value;
    this.busData = this.busData.filter(item => item.RouteName.Zh_tw.indexOf(filterStr) > -1)
  }
}
