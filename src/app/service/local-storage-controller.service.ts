import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageControllerService {

  constructor() { }

  push(item) {
    let ls = [];
    ls = JSON.parse(localStorage.getItem('favor')) || [];
    ls.push(item);
    localStorage.setItem('favor', JSON.stringify(ls));
  }

  clear() {
    localStorage.clear();
  }

  getCurrentData() {
    const ls = JSON.parse(localStorage.getItem('favor'));
    return ls
  }

  deleteByCityAndStationName(city: string, stationName: string) {
    let ls = [];
    ls = JSON.parse(localStorage.getItem('favor')) || [];
    ls.map((item, index) => {
      if (item) {
        if ((item.city === city) && (item.stationName === stationName)) {
          delete ls[index];
        }
      }
    })

    let newLS = [];
    ls.map(item => {
      item != null ? newLS.push(item) : null;
    })

    this.clear();
    localStorage.setItem('favor', JSON.stringify(newLS));

  }
}
