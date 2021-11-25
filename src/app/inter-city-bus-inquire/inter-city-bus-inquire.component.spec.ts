import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterCityBusInquireComponent } from './inter-city-bus-inquire.component';

describe('InterCityBusInquireComponent', () => {
  let component: InterCityBusInquireComponent;
  let fixture: ComponentFixture<InterCityBusInquireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterCityBusInquireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterCityBusInquireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
