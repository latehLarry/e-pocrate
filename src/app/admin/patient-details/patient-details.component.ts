import { ActivatedRoute, ParamMap } from '@angular/router';
import { PatientService } from './../../services/patient/patient.service';
import { Patient } from './../../models/patient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  pats: Patient;
private patId: string;
  constructor(private patientService: PatientService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("patId")) {
        this.patId = paramMap.get("patId");
        this.patientService.getPatientById(this.patId).subscribe(postData => {
          this.pats = {
    id: postData._id,
    name: postData.name,
    surname: postData.surname,
    email: postData.email,
    tel: postData.tel,
    dob: postData.dob,
    photo: postData.photo,
    address: postData.address,
    postal_code: postData.postal_code,
    country: postData.country,
    city: postData.city,
    username: postData.username,
    gender: postData.gender,
    password: postData.password,
    certify: postData.certify,
    creation_date: postData.creation_date,
          }
        })
      }
    })
  }

}
