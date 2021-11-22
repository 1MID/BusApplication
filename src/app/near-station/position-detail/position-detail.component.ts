import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.scss']
})
export class PositionDetailComponent implements OnInit {
  @Input() stationId: string;

  constructor() { }

  ngOnInit(): void {
  }

  //帶StationId打這支 /v2/Bus/Route/City/{City}/PassThrough/Station/{StationID}

}
