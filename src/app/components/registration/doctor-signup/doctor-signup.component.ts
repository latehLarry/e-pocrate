import { DoctorService } from './../../../services/doctor/doctor.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.css']
})
export class DoctorSignupComponent implements OnInit {
  preview: string;
  docReg: FormGroup;
  doctors = [];
  orders: string[] = ['Oui', 'Non'];
  isLoading = false;


  constructor(private doctorService: DoctorService, private router: Router) {
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
      doc_order: new FormControl(null, { validators: [Validators.required]}),
      faculty: new FormControl(null, { validators: [Validators.required]}),
      city_obt: new FormControl(null, { validators: [Validators.required]}),
      ctry_obt: new FormControl(null, { validators: [Validators.required]}),
      username: new FormControl(null, { validators: [Validators.required]}),
      gender: new FormControl(null, { validators: [Validators.required]}),
      password: new FormControl(null, { validators: [Validators.required]}),
      c_password: new FormControl(null, { validators: [Validators.required]}),
      certify: new FormControl(null)
    });
   }

  ngOnInit(): void {
  
  }

  isValid(controlName) {
    return this.docReg.get(controlName).invalid && this.docReg.get(controlName).touched;
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
    if(this.docReg.controls.password.value != this.docReg.controls.c_password.value){
      console.log("Formulaire Invalid"); 
      return;
    }
    this.isLoading = true;
    this.doctorService.addDoctor(
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
        this.docReg.value.certify
    ).subscribe(response => {
      this.router.navigate(["/upload-cv"]);
    });
  }

  onCountrySelected(event, name) {
    console.log('evet', event)
    const value = event.name;
    this.docReg[name] = value;
    this.docReg[name].setValue(value);
    console.log("docReg", this.docReg);
  }


}
