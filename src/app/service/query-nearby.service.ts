import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class QueryNearbyService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }


  /**
   * 取得鄰近公車站點資訊
   * @param Lat
   * @param Lon
   * @returns
   */
  getBusStopNearby(Lat: any, Lon: any) {
    const headers = this.commonService.GetAuthorizationHeader();
    return new Promise((resolve, reject) => {
      this.http.get<any>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/NearBy?$spatialFilter=nearby(${Lat},${Lon},1000)`, { headers }).subscribe(res => {
        if (res) {
          resolve(res);
        }
        reject('fail : getBusStopNearby')
      })
    })
  }

}
