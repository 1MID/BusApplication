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
      this.http.get<any>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Station/NearBy?$spatialFilter=nearby(${Lat},${Lon},1000)`, { headers }).subscribe(res => {
        if (res) {
          resolve(res);
        }
        reject('fail : getBusStopNearby')
      })
    })
  }


  /**
   * 取得該站點的所有經過之公車資訊
   * @param city
   * @param stationID
   * @returns
   */
  getPassThroughData(city: string, stationID: string) {
    const headers = this.commonService.GetAuthorizationHeader();
    return new Promise((resolve, reject) => {
      this.http.get<any>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}/PassThrough/Station/${stationID}`, { headers }).subscribe(res => {
        if (res) {
          resolve(res);
        }
        reject('fail : getPassThroughData')
      })
    })
  }

}
