import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { QueryNearbyService } from '../service/query-nearby.service';
import { Router } from '@angular/router';
import { RouteHandlerService } from '../service/route-handler.service';
import { DeviceModeService } from '../service/device-mode.service';
@Component({
  selector: 'app-near-station',
  templateUrl: './near-station.component.html',
  styleUrls: ['./near-station.component.scss', './near-station.component.phone.scss']
})
export class NearStationComponent implements OnInit {
  myPosition = { lng: '', lat: '', city: '' }
  busStopData: any;
  hintText = "取得位置資訊中..."

  constructor(
    private commonService: CommonService,
    private queryNearbyService: QueryNearbyService,
    private router: Router,
    private routeHandlerService: RouteHandlerService,
    public deviceModeService: DeviceModeService
  ) { }

  ngOnInit(): void {
    this.getPosition();
    this.deviceModeService.detectCurrentDevice();
  }

  /**
   * 取得當前位置
   */
  private getPosition() {
    Promise.all([
      this.commonService.getMyPositionV1(), //取得當前經緯度
      this.commonService.getMyPositionV2()  //取得當前所在城市
    ]).then((res: any) => {
      // 測資 (台北)"25.05666019880863", "121.61793350715327"
      this.myPosition.lng = res[0].lng;
      this.myPosition.lat = res[0].lat;
      this.myPosition.city = res[1].city;
      this.getBusStopNearby();
      console.log(res)
    }).catch(res => {
      console.log('取得位置失敗', res)
      this.hintText = "取得位置失敗，請確認是否允許權限，或重新開啟"
    })
  }

  private getBusStopNearby() {
    this.queryNearbyService.getBusStopNearby(this.myPosition.lat, this.myPosition.lng).then(res => {
      this.busStopData = res;
      console.log(this.busStopData)
    })
  }

  itemOnClick(item) {
    let positionData = {
      stationID: item.StationID,
      city: this.myPosition.city,
      stationName: item.StationName.Zh_tw
    }
    this.routeHandlerService.setPositionDetailData(positionData);
    this.router.navigate(['nearby/position-detail'], {});
  }

  navigateToHome() {
    this.routeHandlerService.navigateToHome();
  }
}
