import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterBusPriceComponent } from './inter-bus-price.component';

describe('InterBusPriceComponent', () => {
  let component: InterBusPriceComponent;
  let fixture: ComponentFixture<InterBusPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterBusPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterBusPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
