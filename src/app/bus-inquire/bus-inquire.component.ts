import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bus-inquire',
  templateUrl: './bus-inquire.component.html',
  styleUrls: ['./bus-inquire.component.scss']
})
export class BusInquireComponent implements OnInit {

  keyboardIndex = 0; //0 基本鍵盤 1 城市 2 更多
  currentCity = "選擇縣市";
  constructor() { }

  ngOnInit(): void {
  }

  getEmitVal(e) {
    console.log(e)
    switch (e) {
      case 'city':
        this.keyboardIndex = 1;
        break;
      case 'more':
        this.keyboardIndex = 2;
        break;
      case 'back':
        this.keyboardIndex = 0;
        break;
      default:
        if (this.keyboardIndex === 1) { this.currentCity = e };
        break;
    }
  }

  //應該打這支 v2/Bus/Route/City/{City} 取得指定[縣市]的市區公車路線資料
  //拿到該城市的所有公車名稱 BusRouteType == 11 [BusRouteType (Int32): 公車路線類別 : [11:'市區公車',12:'公路客運',13:'國道客運',14:'接駁車'] ]
  //再拿他的起點跟終點名稱

  //全拿到之後就剩過慮了
}
