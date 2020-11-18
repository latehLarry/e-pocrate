import { ActivatedRoute, ParamMap } from '@angular/router';
import { PatientService } from '../../services/patient/patient.service';
import { Patient } from '../../models/patient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-patient-details',
  templateUrl: './doctor-patient-details.component.html',
  styleUrls: ['./doctor-patient-details.component.css']
})
export class DoctorPatientDetailsComponent implements OnInit {

  patient = null;
private patId: string;
  constructor(private patientService: PatientService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.patient = {
      id: "test2",
      address: "Touba, Keur gou mack, Senegal",
      city: "Touba",
      email:"fallfallou@gmail.com",
      gender: "M",
      photo: "assets/images/patient.png",
      name: "Fallou",
      surname: "Fall",
      dob: "1970-09-12",
      tel: "+221777899988",
      username: "fallfallou@gmail.com",
      postal_code: "13333",
      creation_date: "2020-11-01"
    }
  }

}
