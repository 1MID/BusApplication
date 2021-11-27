import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPriceTimeKeyboardComponent } from './bus-price-time-keyboard.component';

describe('BusPriceTimeKeyboardComponent', () => {
  let component: BusPriceTimeKeyboardComponent;
  let fixture: ComponentFixture<BusPriceTimeKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusPriceTimeKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPriceTimeKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
