import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NearStationComponent } from './near-station/near-station.component';
import { PositionDetailComponent } from './near-station/position-detail/position-detail.component';
import { PositionBusComponent } from './near-station/position-detail/position-bus/position-bus.component';
import { BusInquireComponent } from './bus-inquire/bus-inquire.component';
import { InterCityBusInquireComponent } from './inter-city-bus-inquire/inter-city-bus-inquire.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'nearby',
    component: NearStationComponent,
  },
  {
    path: 'nearby/position-detail',
    component: PositionDetailComponent,
  },
  {
    path: 'nearby/position-detail/position-bus',
    component: PositionBusComponent,
  },
  {
    path: 'bus-inquire',
    component: BusInquireComponent,
  },
  {
    path: 'inter-city-bus',
    component: InterCityBusInquireComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
