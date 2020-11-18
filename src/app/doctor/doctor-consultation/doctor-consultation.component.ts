import { ActivatedRoute, ParamMap } from '@angular/router';
import { PatientService } from '../../services/patient/patient.service';
import { Patient } from '../../models/patient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-patient-details',
  templateUrl: './doctor-consultation.component.html',
  styleUrls: ['./doctor-consultation.component.css']
})
export class DoctorConsultationComponent implements OnInit {

  patient = null;
  consultations = [];
  pastConsultations = [];
  selectedConsultations = null;
  private patId: string;
  constructor(private patientService: PatientService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.consultations = [{
      patient: {
        name: 'Fallou',
        surname: 'Fall',
        id: 'test2'
      },
      date: '2020-11-20T12:30:00',


    }, {
      patient: {
        name: 'Christian',
        surname: 'Lam',
        id: 'test3'
      },
      date: '2020-11-14T12:30:00'

    }];
    this.pastConsultations = [
      {
        patient: {
          name: 'Josephine',
          surname: 'Diouf',
          id: 'test4'
        },
        date: '2020-11-01T12:30:00',
      }, {
        patient: {
          name: 'Christian',
          surname: 'Lam',
          id: 'test5'
        },
        date: '2020-11-04T12:30:00'
      }
    ]
  }

}
