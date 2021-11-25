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

}
