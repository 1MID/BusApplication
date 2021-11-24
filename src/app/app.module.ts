import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NearStationComponent } from './near-station/near-station.component';
import { PositionDetailComponent } from './near-station/position-detail/position-detail.component';
import { PositionBusComponent } from './near-station/position-detail/position-bus/position-bus.component';
import { BusInquireComponent } from './bus-inquire/bus-inquire.component';
import { BaseKeyboardComponent } from './bus-inquire/keyboard/base-keyboard/base-keyboard.component';
import { MoreKeyboardComponent } from './bus-inquire/keyboard/more-keyboard/more-keyboard.component';
import { CityKeyboardComponent } from './bus-inquire/keyboard/city-keyboard/city-keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NearStationComponent,
    PositionDetailComponent,
    PositionBusComponent,
    BusInquireComponent,
    BaseKeyboardComponent,
    MoreKeyboardComponent,
    CityKeyboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
