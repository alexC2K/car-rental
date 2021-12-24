import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewownerComponent } from './viewowner.component';

describe('ViewownerComponent', () => {
  let component: ViewownerComponent;
  let fixture: ComponentFixture<ViewownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewownerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
