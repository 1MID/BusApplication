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



  /**
   * 取得該號公車起點站與終點站
   * @param city
   * @param stationName 繁體中文路線名稱，如'307'
   * @returns
   */
  getDestinationStop(city: string, stationName: string) {
    const headers = this.commonService.GetAuthorizationHeader();
    let filterString = encodeURI(`(RouteName/Zh_tw eq '${stationName}')`);
    let stationNameURI = encodeURI(stationName);
    return new Promise((resolve, reject) => {
      this.http.get<any>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}/${stationNameURI}?$filter=${filterString}&$top=1`, { headers }).subscribe(res => {
        if (res) {
          resolve(res);
        }
        reject('fail : getDestinationStop')
      })
    })
  }

  /**
   * 取得該號公車起點站與終點站
   * @param city
   * @param stationName 繁體中文路線名稱，如'307'
   * @param direction 去程 0 返程 1
   * @returns
   */
  getStopRealTimeData(city: string, stationName: string, direction: number) {
    const headers = this.commonService.GetAuthorizationHeader();
    let filterString = encodeURI(`(Direction eq '${direction}') and (RouteName/Zh_tw eq '${stationName}')`);
    let stationNameURI = encodeURI(stationName);

    return new Promise((resolve, reject) => {
      this.http.get<any>(`https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${city}/${stationNameURI}?$filter=${filterString}&$orderby=StopSequence%20asc&$format=JSON`, { headers }).subscribe(res => {
        if (res) {
          resolve(res);
        }
        reject('fail : getStopRealTimeData')
      })
    })
  }

}
