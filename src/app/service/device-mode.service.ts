import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class DeviceModeService {
  mode = "";
  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  detectCurrentDevice() {
    if (this.breakpointObserver.isMatched('(max-width: 767px) and (min-width: 375px)')) {
      this.mode = '手機';
    } else if (this.breakpointObserver.isMatched('(max-width: 1024px) and (min-width: 768px)')) {
      this.mode = '平板';
    } else {
      this.mode = '電腦';
    }
    console.log(this.mode);
  }

  getCurrentDevice() {
    if (this.mode = "") { this.detectCurrentDevice(); }
    return this.mode;
  }

  get device() {
    return this.mode;
  }
}
