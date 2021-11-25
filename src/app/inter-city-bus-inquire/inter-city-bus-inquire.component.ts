import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inter-city-bus-inquire',
  templateUrl: './inter-city-bus-inquire.component.html',
  styleUrls: ['./inter-city-bus-inquire.component.scss']
})
export class InterCityBusInquireComponent implements OnInit {
  keyboardIndex = 0; //0 基本鍵盤 1 起訖鍵盤
  cityInputIsFirstNow = true;
  constructor() { }

  ngOnInit(): void {
  }

  getEmitVal(e) {
    console.log(e);
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
      (<HTMLInputElement>document.getElementById('keywordInput')).value += e;
    } else if (this.keyboardIndex === 1) {
      this.cityInputIsFirstNow
        ? (<HTMLInputElement>document.getElementById('startPoint')).value = e
        : (<HTMLInputElement>document.getElementById('endPoint')).value = e
      this.cityInputIsFirstNow = !this.cityInputIsFirstNow;
    }
  }

  /**
   * 負責Clear 全部清除
   * @returns
   */
  handleDelete() {
    let keywordInput = (<HTMLInputElement>document.getElementById('keywordInput')).value;
    if (keywordInput.length === 1) {
      (<HTMLInputElement>document.getElementById('keywordInput')).value = "";
      return;
    }
    (<HTMLInputElement>document.getElementById('keywordInput')).value = keywordInput.substring(0, keywordInput.length - 1)
  }

  /**
  * 負責Clear 清除
  */
  handleClear() {
    (<HTMLInputElement>document.getElementById('keywordInput')).value = "";
  }

  /**
   * 負責開啟手動輸入
   */
  handleCustomInput() {
    (<HTMLInputElement>document.getElementById('keywordInput')).disabled = false;
    (<HTMLInputElement>document.getElementById('keywordInput')).focus();
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

}
