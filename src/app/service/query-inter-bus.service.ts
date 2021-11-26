import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class QueryInterBusService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }


  /**
   * 透過城市取得客運資料
   * @param city
   * @returns
   */
  getInterBusData(city: string) {
    const headers = this.commonService.GetAuthorizationHeader();
    let filterString = encodeURI(`SubRoutes/all(c: contains(c/HeadsignEn, '${city}'))`);

    return new Promise((resolve, reject) => {
      this.http.get<any>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Route/InterCity?$filter=${filterString}&$format=JSON`, { headers }).subscribe(res => {
        if (res) {
          resolve(res);
        }
        reject('fail : getInterBusData')
      })
    })
  }


  /**
   * 透過客運起始站與結束站取得資料
   * @param fromCity 起始站
   * @param toCity 結束站
   * @returns
   */
  getInterBusDataStart2End(fromCity: string, toCity: string) {
    const headers = this.commonService.GetAuthorizationHeader();
    let filterString = encodeURI(`(SubRoutes/all(c: contains(c/HeadsignEn, '${fromCity}'))) and (SubRoutes/all(c: contains(c/HeadsignEn, '${toCity}')))  `);

    return new Promise((resolve, reject) => {
      this.http.get<any>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Route/InterCity?$filter=${filterString}&$format=JSON`, { headers }).subscribe(res => {
        if (res) {
          resolve(res);
        }
        reject('fail : getInterBusDataStart2End')
      })
    })
  }


  /**
   * 輸入客運名稱取得出發時刻
   * @param routeName
   * @param direction 0 去程 1 返程
   * @returns
   */
  getInterBusStartTime(routeName: string, direction: number) {
    const headers = this.commonService.GetAuthorizationHeader();
    let routeNameURI = encodeURI(routeName);
    let filterString = encodeURI(`Direction eq ${direction}`);

    return new Promise((resolve, reject) => {
      this.http.get<any>(`https://ptx.transportdata.tw/MOTC/v2/Bus/Schedule/InterCity/${routeNameURI}?$filter=${filterString}&$format=JSON`, { headers }).subscribe(res => {
        if (res) {
          resolve(res);
        }
        reject('fail : getInterBusStartTime')
      })
    })
  }

  getInterBusRoad(routeName: string) {
    const headers = this.commonService.GetAuthorizationHeader();
    let routeNameURI = encodeURI(routeName);

    return new Promise((resolve, reject) => {
      this.http.get<any>(`https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/InterCity/${routeNameURI}`, { headers }).subscribe(res => {
        if (res) {
          resolve(res);
        }
        reject('fail : getInterBusRoad')
      })
    })
  }


  /**
   * 取得該客運票價
   * @param routeName
   * @returns
   */
  getInterBusPrice(routeName: string) {
    const headers = this.commonService.GetAuthorizationHeader();
    let routeNameURI = encodeURI(routeName);

    return new Promise((resolve, reject) => {
      this.http.get<any>(`https://ptx.transportdata.tw/MOTC/v2/Bus/RouteFare/InterCity/${routeNameURI}`, { headers }).subscribe(res => {
        if (res) {
          resolve(res);
        }
        reject('fail : getInterBusPrice')
      })
    })
  }

}
