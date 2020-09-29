import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationBookingComponent } from './consultation-booking.component';

describe('ConsultationBookingComponent', () => {
  let component: ConsultationBookingComponent;
  let fixture: ComponentFixture<ConsultationBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
