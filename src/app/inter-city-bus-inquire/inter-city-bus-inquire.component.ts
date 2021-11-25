import { Component, OnInit } from '@angular/core';
import { QueryInterBusService } from '../service/query-inter-bus.service';
import { CityListService } from '../service/city-list.service';
@Component({
  selector: 'app-inter-city-bus-inquire',
  templateUrl: './inter-city-bus-inquire.component.html',
  styleUrls: ['./inter-city-bus-inquire.component.scss']
})
export class InterCityBusInquireComponent implements OnInit {
  keyboardIndex = 0; //0 基本鍵盤 1 起訖鍵盤
  cityInputIsFirstNow = true;
  currentCity = '';
  busDataOrigin;
  busDataFilter;

  constructor(
    private queryInterBusService: QueryInterBusService,
    private cityListService: CityListService
  ) { }

  ngOnInit(): void {
  }

  getEmitVal(e) {
    console.log(e);
    this.emitSwitchController(e);
  }

  /**
   * 負責處理接收到的值應該做什麼事
   */
  emitSwitchController(e: string) {
    switch (e) {
      case 'change':
        this.handleKeyboardChange(1);
        break;
      case 'back':
        this.handleKeyboardChange(0);
        break;
      case 'delete':
        this.handleDelete();
        break;
      case 'C':
        this.handleClear();
        break;
      case 'custom':
        this.handleCustomInput();
        break;
      default:
        this.handleInput(e);
        break;
    }
  }

  /**
   * 負責正常Input
   * @param e
   */
  handleInput(e: string) {
    if (this.keyboardIndex === 0) {
      if (e.indexOf('市') != -1) {
        this.currentCity = e;
        let cityEn = this.cityListService.getCityNameEnByZh(this.currentCity);
        this.queryInterBusService.getInterBusData(cityEn).then(res => {
          console.log(res)
          this.busDataOrigin = res;
          this.handleFilter();
        });
      } else {
        (<HTMLInputElement>document.getElementById('keyw')).value += e;
        this.handleFilter();
      }
    } else if (this.keyboardIndex === 1) {
      this.cityInputIsFirstNow
        ? (<HTMLInputElement>document.getElementById('startPoint')).value = e
        : (<HTMLInputElement>document.getElementById('endPoint')).value = e

      //第一次點擊更改起始站，第二次點擊更改結束站
      this.cityInputIsFirstNow = !this.cityInputIsFirstNow;
      this.handleCity2CitySearch();
    }
  }

  /**
   * 負責Clear 全部清除
   * @returns
   */
  handleDelete() {
    let keywordInput = (<HTMLInputElement>document.getElementById('keyw')).value;
    if (keywordInput.length === 1) {
      (<HTMLInputElement>document.getElementById('keyw')).value = "";
      this.handleFilter();
      return;
    }
    (<HTMLInputElement>document.getElementById('keyw')).value = keywordInput.substring(0, keywordInput.length - 1)
    this.handleFilter();
  }

  /**
  * 負責Clear 清除
  */
  handleClear() {
    (<HTMLInputElement>document.getElementById('keyw')).value = "";
  }

  /**
   * 負責開啟手動輸入
   */
  handleCustomInput() {
    (<HTMLInputElement>document.getElementById('keyw')).disabled = false;
    (<HTMLInputElement>document.getElementById('keyw')).focus();
  }

  /**
   * 負責切換鍵盤
   * @param i
   */
  handleKeyboardChange(i: number) {
    this.keyboardIndex = i;
  }

  switchOnClick() {
    let tmp = (<HTMLInputElement>document.getElementById('startPoint')).value;
    (<HTMLInputElement>document.getElementById('startPoint')).value = (<HTMLInputElement>document.getElementById('endPoint')).value;
    (<HTMLInputElement>document.getElementById('endPoint')).value = tmp;
  }

  /**
   * 項目被點擊
   * @param item
   */
  itemOnClick(item) {
    console.log(item);
  }

  /**
 * 負責處理搜尋過濾
 */
  handleFilter() {
    let filterStr = (<HTMLInputElement>document.getElementById('keyw')).value;
    if (this.busDataOrigin) {
      let box = JSON.parse(JSON.stringify(this.busDataOrigin));
      this.busDataFilter = box.filter(item => item.RouteName.Zh_tw.indexOf(filterStr) > -1)
    }
  }

  /**
   * 負責起訖站搜尋
   */
  handleCity2CitySearch() {
    let fromCity = (<HTMLInputElement>document.getElementById('startPoint')).value;
    let toCity = (<HTMLInputElement>document.getElementById('endPoint')).value;

    if ((fromCity != '') && (toCity != '')) {
      let fromCityEn = this.cityListService.getCityNameEnByZh(fromCity);
      let toCityEn = this.cityListService.getCityNameEnByZh(toCity);

      this.queryInterBusService.getInterBusDataStart2End(fromCityEn, toCityEn).then(res => {
        console.log(res);
        this.busDataOrigin = res;
        this.busDataFilter = res;
      })
    }
  }
}
