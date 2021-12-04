import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceModeService } from 'src/app/service/device-mode.service';
import { LocalStorageControllerService } from 'src/app/service/local-storage-controller.service';
import { RouteHandlerService } from 'src/app/service/route-handler.service';

@Component({
  selector: 'app-collect-page',
  templateUrl: './collect-page.component.html',
  styleUrls: ['./collect-page.component.scss']
})
export class CollectPageComponent implements OnInit {
  ls
  constructor(
    public deviceModeService: DeviceModeService,
    private localStorageControllerService: LocalStorageControllerService,
    private routeHandlerService: RouteHandlerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.deviceModeService.detectCurrentDevice();
    this.getLSData();
  }

  getLSData() {
    this.ls = this.localStorageControllerService.getCurrentData();
  }

  /**
   * 項目被點擊
   * @param item
   */
  itemOnClick(item) {
    console.log(item)
    if (item.type === 0) { // 導到公車詳細
      let positionBusData = {
        stationName: item.stationName,
        city: item.city
      }
      this.routeHandlerService.setPositionBusData(positionBusData);
      this.router.navigate(['nearby/position-detail/position-bus'], {});
    }
  }

  navigateToHome() {
    this.routeHandlerService.locationBack();
  }
}
