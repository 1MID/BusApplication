import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectPageComponent } from './collect-page.component';

describe('CollectPageComponent', () => {
  let component: CollectPageComponent;
  let fixture: ComponentFixture<CollectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
