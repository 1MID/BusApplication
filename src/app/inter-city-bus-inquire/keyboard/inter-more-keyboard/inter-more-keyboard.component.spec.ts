import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterMoreKeyboardComponent } from './inter-more-keyboard.component';

describe('InterMoreKeyboardComponent', () => {
  let component: InterMoreKeyboardComponent;
  let fixture: ComponentFixture<InterMoreKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterMoreKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterMoreKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
