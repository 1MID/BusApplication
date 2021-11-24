import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-city-keyboard',
  templateUrl: './city-keyboard.component.html',
  styleUrls: ['./city-keyboard.component.scss']
})
export class CityKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  cityOnClick(city: string) {
    this.emiter.emit(city);
  }

  backOnClick() {
    this.emiter.emit('back');
  }

}
