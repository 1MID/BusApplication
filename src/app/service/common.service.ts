import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jsSHA from 'jssha';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  public GetAuthorizationHeader() {

    var AppID = environment.AppID;
    var AppKey = environment.AppKey;

    var GMTString = new Date().toUTCString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/ };
  }

  /**
   * 透過Web API取得當前位置
   */
  getMyPositionV1(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject('fail : getMyPositionV1')
        });
    });
  }

  /**
   * 透過網路API取得當前位置，主要是要取得當前城市
   */
  getMyPositionV2(ip: string) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`http://ip-api.com/json#${ip}`).subscribe(res => {
        if (res) {
          resolve(res);
        }
        reject('fail : getMyPositionV2')
      })
    })
  }

  /**
   * 取得當前IP位置
   * @returns IP Address
   */
  getIPAddress() {
    return new Promise((resolve, reject) => {
      this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
        if (res) {
          resolve(res.ip);
        }
        reject('fail : getIPAddress')
      });
    })
  }

}
