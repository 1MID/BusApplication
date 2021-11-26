import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPriceRoadKeyboardComponent } from './bus-price-road-keyboard.component';

describe('BusPriceRoadKeyboardComponent', () => {
  let component: BusPriceRoadKeyboardComponent;
  let fixture: ComponentFixture<BusPriceRoadKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusPriceRoadKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPriceRoadKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
