import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionBusComponent } from './position-bus.component';

describe('PositionBusComponent', () => {
  let component: PositionBusComponent;
  let fixture: ComponentFixture<PositionBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionBusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
