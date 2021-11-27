import { Component, OnInit } from '@angular/core';
import { RouteHandlerService } from '../service/route-handler.service';
import { DeviceModeService } from '../service/device-mode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private routeHandlerService: RouteHandlerService,
    private deviceModeService: DeviceModeService
  ) { }

  ngOnInit(): void {
    this.deviceModeService.detectCurrentDevice();
  }

  nearOnClick() {
    this.routeHandlerService.navigateToNearStation();
  }

  busInquireOnClick() {
    this.routeHandlerService.navigateToBusInquire();
  }

  interCityBusOnClick() {
    this.routeHandlerService.navigateToInterCityBus();
  }
}
