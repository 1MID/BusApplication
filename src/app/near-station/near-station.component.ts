import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { QueryNearbyService } from '../service/query-nearby.service';
import { Router } from '@angular/router';
import { RouteHandlerService } from '../service/route-handler.service';
@Component({
  selector: 'app-near-station',
  templateUrl: './near-station.component.html',
  styleUrls: ['./near-station.component.scss']
})
export class NearStationComponent implements OnInit {
  myPosition = { lng: '', lat: '', city: '' }
  busStopData: any;

  constructor(
    private commonService: CommonService,
    private queryNearbyService: QueryNearbyService,
    private router: Router,
    private routeHandlerService: RouteHandlerService
  ) { }

  ngOnInit(): void {
    this.getPosition();
  }

  /**
   * 取得當前位置
   */
  private getPosition() {
    Promise.all([
      this.commonService.getMyPositionV1(), //取得當前經緯度
      this.commonService.getMyPositionV2()  //取得當前所在城市
    ]).then((res: any) => {
      this.myPosition.lng = res[0].lng;
      this.myPosition.lat = res[0].lat;
      this.myPosition.city = res[1].city;
      this.getBusStopNearby();
      console.log(res)
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
}
