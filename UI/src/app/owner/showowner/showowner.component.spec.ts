import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowownerComponent } from './showowner.component';

describe('ShowownerComponent', () => {
  let component: ShowownerComponent;
  let fixture: ComponentFixture<ShowownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowownerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
