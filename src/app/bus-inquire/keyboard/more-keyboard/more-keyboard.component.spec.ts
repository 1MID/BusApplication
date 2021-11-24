import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreKeyboardComponent } from './more-keyboard.component';

describe('MoreKeyboardComponent', () => {
  let component: MoreKeyboardComponent;
  let fixture: ComponentFixture<MoreKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
