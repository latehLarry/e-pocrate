import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSignupSuccessComponent } from './doctor-signup-success.component';

describe('DoctorSignupSuccessComponent', () => {
  let component: DoctorSignupSuccessComponent;
  let fixture: ComponentFixture<DoctorSignupSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSignupSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSignupSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
