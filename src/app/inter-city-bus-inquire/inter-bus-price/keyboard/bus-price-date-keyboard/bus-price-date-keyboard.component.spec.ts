import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPriceDateKeyboardComponent } from './bus-price-date-keyboard.component';

describe('BusPriceDateKeyboardComponent', () => {
  let component: BusPriceDateKeyboardComponent;
  let fixture: ComponentFixture<BusPriceDateKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusPriceDateKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPriceDateKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
