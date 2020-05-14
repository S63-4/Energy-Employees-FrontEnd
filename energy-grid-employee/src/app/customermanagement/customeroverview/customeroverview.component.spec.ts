import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeroverviewComponent } from './customeroverview.component';

describe('CustomeroverviewComponent', () => {
  let component: CustomeroverviewComponent;
  let fixture: ComponentFixture<CustomeroverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeroverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeroverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
