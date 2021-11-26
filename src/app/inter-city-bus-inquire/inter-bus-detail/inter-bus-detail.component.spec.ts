import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterBusDetailComponent } from './inter-bus-detail.component';

describe('InterBusDetailComponent', () => {
  let component: InterBusDetailComponent;
  let fixture: ComponentFixture<InterBusDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterBusDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterBusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
