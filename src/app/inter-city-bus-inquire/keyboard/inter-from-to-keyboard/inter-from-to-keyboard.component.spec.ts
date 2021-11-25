import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterFromToKeyboardComponent } from './inter-from-to-keyboard.component';

describe('InterFromToKeyboardComponent', () => {
  let component: InterFromToKeyboardComponent;
  let fixture: ComponentFixture<InterFromToKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterFromToKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterFromToKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
