import { ActivatedRoute, ParamMap } from '@angular/router';
import { PatientService } from './../../services/patient/patient.service';
import { Patient } from './../../models/patient.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  pats: Patient;
  patReg: FormGroup;
  preview: string;
  isLoading = false;
  private patId: string;

  constructor(private patService: PatientService, private activeRoute: ActivatedRoute) { 
    this.patReg = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required]}),
      surname: new FormControl(null, { validators: [Validators.required]}),
      email: new FormControl(null, { validators: [Validators.required]}),
      tel: new FormControl(null, { validators: [Validators.required]}),
      dob: new FormControl(null, { validators: [Validators.required]}),
      photo: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null, { validators: [Validators.required]}),
      postal_code: new FormControl(null, { validators: [Validators.required]}),
      country: new FormControl(null, { validators: [Validators.required]}),
      city: new FormControl(null, { validators: [Validators.required]}),
      spec: new FormControl(null, { validators: [Validators.required]}),
      ref_no: new FormControl(null, { validators: [Validators.required]}),
      faculty: new FormControl(null, { validators: [Validators.required]}),
      city_obt: new FormControl(null, { validators: [Validators.required]}),
      ctry_obt: new FormControl(null, { validators: [Validators.required]}),
      username: new FormControl(null, { validators: [Validators.required]}),
      gender: new FormControl(null, { validators: [Validators.required]}),
      password: new FormControl(null, { validators: [Validators.required]}),
      c_password: new FormControl(null, { validators: [Validators.required]}),
    });
   }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("doctorId")) {
        this.patId= paramMap.get("patId");
        this.patService.getPatientById(this.patId).subscribe(postData => {
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

  imageUpload(event) {
    const photo = (event.target as HTMLInputElement).files[0];
    this.patReg.patchValue({
      photo: photo,
    });
    this.patReg.get('photo').updateValueAndValidity();
    console.log(photo);
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(photo);
  }



  onSubmit() {
    this.isLoading = true;
    this.patService.updatePatientInfo(
      this.patId,
      this.patReg.value.name,
      this.patReg.value.surname,
      this.patReg.value.email,
      this.patReg.value.tel,
      this.patReg.value.dob,
      this.patReg.value.photo,
      this.patReg.value.address,
      this.patReg.value.postal_code,
      this.patReg.value.country,
      this.patReg.value.city,
      this.patReg.value.username,
      this.patReg.value.gender,
      this.patReg.value.password,
      this.patReg.value.certify,
      this.patReg.value.creation_date,
    )
  }

}
