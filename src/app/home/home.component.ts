import { Component, OnInit } from '@angular/core';
import { RouteHandlerService } from '../service/route-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private routeHandlerService: RouteHandlerService
  ) { }

  ngOnInit(): void {
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
