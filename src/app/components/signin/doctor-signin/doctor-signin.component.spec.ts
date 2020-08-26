import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSigninComponent } from './doctor-signin.component';

describe('DoctorSigninComponent', () => {
  let component: DoctorSigninComponent;
  let fixture: ComponentFixture<DoctorSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
