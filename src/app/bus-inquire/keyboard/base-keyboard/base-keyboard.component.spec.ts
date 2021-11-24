import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseKeyboardComponent } from './base-keyboard.component';

describe('BaseKeyboardComponent', () => {
  let component: BaseKeyboardComponent;
  let fixture: ComponentFixture<BaseKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
