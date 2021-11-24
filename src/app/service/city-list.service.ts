import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityListService {

  constructor() { }

  public city = [
    { id: 0, name: '臺北市', enName: 'Taipei' },
    { id: 1, name: '新北市', enName: 'NewTaipei' },
    { id: 2, name: '桃園市', enName: 'Taoyuan' },
    { id: 3, name: '臺中市', enName: 'Taichung' },
    { id: 4, name: '臺南市', enName: 'Tainan' },
    { id: 5, name: '高雄市', enName: 'Kaohsiung' },
    { id: 6, name: '基隆市', enName: 'Keelung' },
    { id: 7, name: '新竹市', enName: 'Hsinchu' },
    { id: 8, name: '新竹縣', enName: 'HsinchuCounty' },
    { id: 9, name: '苗栗縣', enName: 'MiaoliCounty' },
    { id: 10, name: '彰化縣', enName: 'ChanghuaCounty' },
    { id: 11, name: '南投縣', enName: 'NantouCounty' },
    { id: 12, name: '雲林縣', enName: 'YunlinCounty' },
    { id: 13, name: '嘉義縣', enName: 'ChiayiCounty' },
    { id: 14, name: '嘉義市', enName: 'Chiayi' },
    { id: 15, name: '屏東縣', enName: 'PingtungCounty' },
    { id: 16, name: '宜蘭縣', enName: 'YilanCounty' },
    { id: 17, name: '花蓮縣', enName: 'HualienCounty' },
    { id: 18, name: '臺東縣', enName: 'TaitungCounty' },
    { id: 19, name: '金門縣', enName: 'KinmenCounty' },
    { id: 20, name: '澎湖縣', enName: 'PenghuCounty' },
    { id: 21, name: '連江縣', enName: 'LienchiangCounty' },
  ]

  getCityNameEnByZh(city: string) {
    let enName = "";
    this.city.forEach((item, index) => {
      item.name === city ? enName = item.enName : null;
    })
    return enName;
  }


}
