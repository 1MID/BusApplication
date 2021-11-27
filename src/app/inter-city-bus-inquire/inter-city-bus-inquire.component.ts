import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryInterBusService } from '../service/query-inter-bus.service';
import { CityListService } from '../service/city-list.service';
import { RouteHandlerService } from '../service/route-handler.service';
import Swal, { SweetAlertOptions } from "sweetalert2";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
@Component({
  selector: 'app-inter-city-bus-inquire',
  animations: [
    trigger("fadeInOut", [
      state("closed", style({ opacity: "0" })),
      state("open", style({ opacity: "1" })),
      transition("open => closed", animate("0.5s ease-in")),
      transition("closed => open", animate("0.5s ease-in"))
    ])
  ],
  templateUrl: './inter-city-bus-inquire.component.html',
  styleUrls: ['./inter-city-bus-inquire.component.scss']
})
export class InterCityBusInquireComponent implements OnInit {
  @ViewChild('keyw') inputEle;
  @ViewChild('startPoint') inputEleStart;
  @ViewChild('endPoint') inputEleEnd;
  isFadeInOutNG = false;

  keyboardIndex = 0; //0 基本鍵盤 1 起訖鍵盤 2 更多
  cityInputIsFirstNow = true;
  currentCity = '';
  busDataOrigin;
  busDataFilter;

  noResData = false;
  hintText = "";
  filterString = ""; //要用來過濾的字串
  constructor(
    private queryInterBusService: QueryInterBusService,
    private cityListService: CityListService,
    private routeHandlerService: RouteHandlerService
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
      case 'more':
        this.handleKeyboardChange(2);
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
        this.hintText = "查詢中..."
        this.queryInterBusService.getInterBusData(cityEn).then((res: any) => {
          console.log(res)
          res.length == 0 ? this.noResData = true : this.noResData = false;
          res.length == 0 ? this.hintText = "查無資料" : this.hintText = "";

          res.map(item => {
            item.SubRoutes.map(subRoute => {
              subRoute.from2flag = true;
              subRoute.filterType = true;
            })
          })
          this.busDataOrigin = res;
          this.busDataFilter = JSON.parse(JSON.stringify(this.busDataOrigin));
          this.handleFilter();
        });
      } else {
        if (this.busDataOrigin) {
          this.inputEle.nativeElement.value += e;
          this.handleFilter();
        } else {
          this.showHintAlert();
        }
      }
    } else if (this.keyboardIndex === 1) {

      this.cityInputIsFirstNow
        ? this.inputEleStart.nativeElement.value = e
        : this.inputEleEnd.nativeElement.value = e

      //第一次點擊更改起始站，第二次點擊更改結束站
      this.cityInputIsFirstNow = !this.cityInputIsFirstNow;

      this.currentCity = this.inputEleStart.nativeElement.value + " > " + this.inputEleEnd.nativeElement.value
      this.handleCity2CitySearch();

    } else if (this.keyboardIndex === 2) {
      if (this.busDataOrigin) {
        this.inputEle.nativeElement.value = e;
        this.handleFilter();
      } else {
        this.showHintAlert();
      }
    }
  }


  handleDelete() {
    let keywordInput = this.inputEle.nativeElement.value;
    if (keywordInput.length === 1) {
      this.inputEle.nativeElement.value = "";
      this.filterString = ""
      this.handleFilter();
      return;
    }
    this.inputEle.nativeElement.value = keywordInput.substring(0, keywordInput.length - 1)

    this.inputEle.nativeElement.value != "" ? this.filterString = "(" + this.inputEle.nativeElement.value + ")" : null

    console.log(this.filterString)
    this.handleFilter();
  }

  /**
  * 負責Clear 清除
  */
  handleClear() {
    this.inputEle.nativeElement.value = "";
    this.filterString = "";
    this.handleFilter();
  }

  /**
   * 負責開啟手動輸入
   */
  handleCustomInput() {
    this.inputEle.nativeElement.disabled = false;
    this.inputEle.nativeElement.focus();
  }

  /**
   * 負責切換鍵盤
   * @param i
   */
  handleKeyboardChange(i: number) {
    this.isFadeInOutNG = !this.isFadeInOutNG;
    setTimeout(() => {
      this.isFadeInOutNG = !this.isFadeInOutNG;
      this.keyboardIndex = i;
    }, 500);
  }

  switchOnClick() {
    let tmp = this.inputEleStart.nativeElement.value;
    this.inputEleStart.nativeElement.value = this.inputEleEnd.nativeElement.value;
    this.inputEleEnd.nativeElement.value = tmp;
    this.currentCity = this.inputEleStart.nativeElement.value + " > " + this.inputEleEnd.nativeElement.value;
    this.handleCity2CitySearch();
  }

  /**
   * 項目被點擊
   * @param item
   */
  itemOnClick(item) {
    this.routeHandlerService.setInterBusItem(item);
    this.routeHandlerService.navigateToInterBusPrice();
  }

  /**
 * 負責處理搜尋過濾
 */
  handleFilter() {
    let filterStr = this.inputEle.nativeElement?.value;
    if (filterStr != "") { this.filterString = "(" + filterStr + ")" }

    console.log(filterStr)
    if (this.busDataOrigin && filterStr) {
      let box = JSON.parse(JSON.stringify(this.busDataOrigin));

      this.busDataFilter = box.filter(item =>
        //filterType = True的意思是他是過濾條件符合的
        //因為我原本的filter有點失敗
        item.SubRoutes.filter(subRoute =>
          subRoute.SubRouteName.Zh_tw.indexOf(filterStr) > -1 ? subRoute.filterType = true : subRoute.filterType = false
        )
      )

      this.noResData = true;
      this.busDataFilter.map(item => {
        item.SubRoutes.map(subRoute => {
          subRoute.filterType == true ? this.noResData = false : null;
        })
      })

      this.noResData == true ? this.hintText = "查無資料" : this.hintText = "";

      console.log(this.noResData)
      console.log(this.busDataFilter, this.busDataOrigin)
    } else if (this.busDataOrigin) {
      this.busDataFilter = JSON.parse(JSON.stringify(this.busDataOrigin));
      this.busDataFilter.length == 0 ? this.hintText = "查無資料" : this.hintText = "";
    }

  }

  /**
   * 負責起訖站搜尋
   */
  handleCity2CitySearch() {
    let fromCity = this.inputEleStart.nativeElement.value;
    let toCity = this.inputEleEnd.nativeElement.value;

    if ((fromCity != '') && (toCity != '')) {
      let fromCityEn = this.cityListService.getCityNameEnByZh(fromCity);
      let toCityEn = this.cityListService.getCityNameEnByZh(toCity);

      this.queryInterBusService.getInterBusDataStart2End(fromCityEn, toCityEn).then((res: any) => {
        console.log(res);

        // 假如是台北到台中，則上面這個query會把台中到台北的也抓出來
        // 因此如果是台北到台中(順序正確)，就把from2flag設True，讓HTML可以篩
        res.map(item => {
          item.SubRoutes.map(subRoute => {
            let subRouteSplit = subRoute.HeadsignEn.split('→');
            subRouteSplit[0].indexOf(fromCityEn) != -1 ? subRoute.from2flag = true : subRoute.from2flag = false;
            subRoute.filterType = true;
          })
        })

        this.busDataOrigin = res;
        this.busDataFilter = JSON.parse(JSON.stringify(this.busDataOrigin));

        this.busDataFilter.length == 0 ? this.hintText = "查無資料" : this.hintText = "";
        console.log(this.busDataFilter)
      })
    }

  }

  navigateToHome() {
    this.routeHandlerService.navigateToHome();
  }

  /**
 * 先選城市才能使用過濾條件
 */
  showHintAlert() {
    Swal.fire({
      title: '請先選擇縣市',
      confirmButtonText: '關閉',
    })
  }
}
