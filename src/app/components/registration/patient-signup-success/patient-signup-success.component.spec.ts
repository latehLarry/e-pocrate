import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSignupSuccessComponent } from './patient-signup-success.component';

describe('PatientSignupSuccessComponent', () => {
  let component: PatientSignupSuccessComponent;
  let fixture: ComponentFixture<PatientSignupSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSignupSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSignupSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
