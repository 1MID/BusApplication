import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearStationComponent } from './near-station.component';

describe('NearStationComponent', () => {
  let component: NearStationComponent;
  let fixture: ComponentFixture<NearStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
