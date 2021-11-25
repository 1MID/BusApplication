import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterBaseKeyboardComponent } from './inter-base-keyboard.component';

describe('InterBaseKeyboardComponent', () => {
  let component: InterBaseKeyboardComponent;
  let fixture: ComponentFixture<InterBaseKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterBaseKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterBaseKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
