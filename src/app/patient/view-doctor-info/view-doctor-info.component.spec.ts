import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorInfoComponent } from './view-doctor-info.component';

describe('ViewDoctorInfoComponent', () => {
  let component: ViewDoctorInfoComponent;
  let fixture: ComponentFixture<ViewDoctorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDoctorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDoctorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
