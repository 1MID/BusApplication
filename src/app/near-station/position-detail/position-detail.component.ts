import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryNearbyService } from 'src/app/service/query-nearby.service';
import { RouteHandlerService } from 'src/app/service/route-handler.service';
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
    private routeHandlerService: RouteHandlerService
  ) { }

  ngOnInit(): void {
    this.getPositionDetailData();
    this.getPassThroughData();
  }

  getPositionDetailData() {
    this.paramsRes = this.routeHandlerService.getPositionDetailData();
    console.log(this.paramsRes);
  }

  getPassThroughData() {
    this.queryNearbyService.getPassThroughData(this.paramsRes.city, this.paramsRes.stationID).then(res => {
      this.queryRes = res;
      console.log(this.queryRes)
    })
  }

}
