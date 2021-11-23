import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryNearbyService } from 'src/app/service/query-nearby.service';
import { RouteHandlerService } from 'src/app/service/route-handler.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.scss']
})
export class PositionDetailComponent implements OnInit {
  paramsRes;
  queryRes;


  constructor(
    private activeRoute: ActivatedRoute,
    private queryNearbyService: QueryNearbyService,
    private routeHandlerService: RouteHandlerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPositionDetailData();
    this.getPassThroughData();
  }

  getPositionDetailData() {
    this.paramsRes = this.routeHandlerService.getPositionDetailData();
    if (!this.paramsRes) { this.routeHandlerService.backToNearStation(); }
  }

  getPassThroughData() {
    if (!this.paramsRes) { return; }
    this.queryNearbyService.getPassThroughData(this.paramsRes.city, this.paramsRes.stationID).then(res => {
      this.queryRes = res;
    })
  }

  itemOnClick(item) {
    let positionBusData = {
      stationName: item.RouteName.Zh_tw,
      city: this.paramsRes.city
    }
    this.routeHandlerService.setPositionBusData(positionBusData);
    this.router.navigate(['nearby/position-detail/position-bus'], {});
  }

  backOnClick() {
    this.routeHandlerService.backToNearStation();
  }
}
