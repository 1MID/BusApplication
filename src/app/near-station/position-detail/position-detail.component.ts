import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryNearbyService } from 'src/app/service/query-nearby.service';
import { RouteHandlerService } from 'src/app/service/route-handler.service';
import { Router } from '@angular/router';
import { CityListService } from 'src/app/service/city-list.service';
import { DeviceModeService } from 'src/app/service/device-mode.service';
import { LocalStorageControllerService } from 'src/app/service/local-storage-controller.service';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.scss', './position-detail.component.phone.scss', './position-detail.component.tablet.scss']
})
export class PositionDetailComponent implements OnInit {
  paramsRes;
  queryRes;
  currentCity;
  resNotEmpty = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private queryNearbyService: QueryNearbyService,
    private routeHandlerService: RouteHandlerService,
    private router: Router,
    private cityListService: CityListService,
    public deviceModeService: DeviceModeService,
    private localStorageControllerService: LocalStorageControllerService
  ) { }

  ngOnInit(): void {
    this.deviceModeService.detectCurrentDevice();
    this.getPositionDetailData();
    this.getPassThroughData();
  }

  getPositionDetailData() {
    this.paramsRes = this.routeHandlerService.getPositionDetailData();
    if (!this.paramsRes) { this.routeHandlerService.navigateToNearStation(); }
    this.currentCity = this.cityListService.getCityNameZhByEn(this.paramsRes.city);
  }

  getPassThroughData() {
    if (!this.paramsRes) { return; }
    let ls = this.localStorageControllerService.getCurrentData();
    this.queryNearbyService.getPassThroughData(this.paramsRes.city, this.paramsRes.stationID).then((res: any) => {

      // 標出已經是收藏的項目
      if (ls) {
        res.map(resItem => {
          resItem.favorFlag = false;
          ls.map(lsItem => {
            ((resItem.City === lsItem?.city) && (resItem.RouteName.Zh_tw === lsItem?.stationName)) ? resItem.favorFlag = true : null
          })
        })
      }

      console.log(res)
      this.queryRes = res;
      this.queryRes.length == 0 ? this.resNotEmpty = true : this.resNotEmpty = false; //是否有查到資料
    })
  }

  itemOnClick(item) {
    let positionBusData = {
      stationName: item.RouteName.Zh_tw,
      city: this.paramsRes.city
    }
    this.routeHandlerService.setPositionBusData(positionBusData);
    this.router.navigate(['nearby/position-detail/position-bus'], {});
  }

  backOnClick() {
    this.routeHandlerService.navigateToNearStation();
  }

  getEmitVal(e) {
    console.log(e, '收到')
    if (e == 'back') {
      this.backOnClick();
    } else {
      this.paramsRes.city = this.cityListService.getCityNameEnByZh(e);
      this.getPassThroughData();
    }
  }

  navigateToHome() {
    this.routeHandlerService.navigateToHome();
  }

  /**
   * 收藏
   * @param e
   * @param item
   */
  favorOnClick(e, item) {
    e.stopPropagation();
    item.favorFlag = true;

    const favorObj = {
      stationName: item.RouteName.Zh_tw,
      city: this.paramsRes.city,
      stopFrom: item.DepartureStopNameZh,
      stopTo: item.DestinationStopNameZh,
      type: 0 // 0 公車 1 客運
    }

    this.localStorageControllerService.push(favorObj);
  }

  /**
   * 取消收藏
   * @param e
   * @param item
   */
  disFavorOnClick(e, item) {
    e.stopPropagation();
    item.favorFlag = false;
    this.localStorageControllerService.deleteByCityAndStationName(this.paramsRes.city, item.RouteName.Zh_tw);
  }
}
