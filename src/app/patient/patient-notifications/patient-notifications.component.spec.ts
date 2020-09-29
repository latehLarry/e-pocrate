import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNotificationsComponent } from './patient-notifications.component';

describe('PatientNotificationsComponent', () => {
  let component: PatientNotificationsComponent;
  let fixture: ComponentFixture<PatientNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
