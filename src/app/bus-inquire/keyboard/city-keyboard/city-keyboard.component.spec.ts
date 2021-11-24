import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityKeyboardComponent } from './city-keyboard.component';

describe('CityKeyboardComponent', () => {
  let component: CityKeyboardComponent;
  let fixture: ComponentFixture<CityKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
