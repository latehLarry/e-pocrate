import { Doctor } from './../../models/doctor.model';
import { DoctorService } from './../../services/doctor/doctor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
docs: Doctor;
private doctorId: string;
  constructor(private doctorService: DoctorService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("doctorId")) {
        this.doctorId = paramMap.get("doctorId");
        this.doctorService.getDoctorById(this.doctorId)
        .subscribe(postData => {
          this.docs = {
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
            spec: postData.spec,
            ref_no: postData.ref_no,
            doc_order: postData.doc_order,
            faculty: postData.faculty,
            city_obt: postData.city_obt,
            ctry_obt: postData.ctry_obt,
            username: postData.username,
            gender: postData.gender,
            password: postData.password,
            certify: postData.certify,
            creation_date: postData.creation_date,
            active: postData.active
          }
        })
      }
    })
  }

}
