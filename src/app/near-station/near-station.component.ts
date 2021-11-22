import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { QueryNearbyService } from '../service/query-nearby.service';
@Component({
  selector: 'app-near-station',
  templateUrl: './near-station.component.html',
  styleUrls: ['./near-station.component.scss']
})
export class NearStationComponent implements OnInit {
  myPosition = { lng: '', lat: '' }
  busStopData: any;

  constructor(
    private commonService: CommonService,
    private queryNearbyService: QueryNearbyService
  ) { }

  ngOnInit(): void {
    this.getPosition();

  }

  private getPosition() {
    this.commonService.getPosition().then(res => {
      this.myPosition.lng = res.lng;
      this.myPosition.lat = res.lat;
      this.getBusStopNearby();
    }).catch(err => {
      console.log('沒有打開地圖權限')
    })
  }

  private getBusStopNearby() {
    this.queryNearbyService.getBusStopNearby(this.myPosition.lat, this.myPosition.lng).then(res => {
      this.busStopData = res;
      console.log(this.busStopData)
    })
  }

}
