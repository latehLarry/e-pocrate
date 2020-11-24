import { Doctor } from './../../models/doctor.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DoctorService } from './../../services/doctor/doctor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {
  docs: Doctor;
  docReg: FormGroup;
  preview: string;
  isLoading = false;
  specialist = [];
  private doctorId: string;

  constructor(private doctorService: DoctorService, private activeRoute: ActivatedRoute, private router: Router) { 
    this.docReg = new FormGroup({
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
    this.specialist = this.doctorService.getSpecialityList();
    this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("doctorId")) {
        this.doctorId = paramMap.get("doctorId");
        this.doctorService.getDoctorById(this.doctorId).subscribe(postData => {
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

  imageUpload(event) {
    const photo = (event.target as HTMLInputElement).files[0];
    this.docReg.patchValue({
      photo: photo,
    });
    this.docReg.get('photo').updateValueAndValidity();
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
    this.doctorService.updateDoctorInfo(
      this.doctorId,
      this.docReg.value.name,
      this.docReg.value.surname,
      this.docReg.value.email,
      this.docReg.value.tel,
      this.docReg.value.dob,
      this.docReg.value.photo,
      this.docReg.value.address,
      this.docReg.value.postal_code,
      this.docReg.value.country,
      this.docReg.value.city,
      this.docReg.value.spec,
      this.docReg.value.ref_no,
      this.docReg.value.doc_order,
      this.docReg.value.faculty,
      this.docReg.value.city_obt,
      this.docReg.value.ctry_obt,
      this.docReg.value.username,
      this.docReg.value.gender,
      this.docReg.value.password,
      this.docReg.value.certify,
      this.docReg.value.creation_date,
      this.docReg.value.active
    )
  }

}
