import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusInquireComponent } from './bus-inquire.component';

describe('BusInquireComponent', () => {
  let component: BusInquireComponent;
  let fixture: ComponentFixture<BusInquireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusInquireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusInquireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
