import { Router } from '@angular/router';
import { PatientService } from './../../../services/patient/patient.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.component.html',
  styleUrls: ['./patient-signup.component.css']
})
export class PatientSignupComponent implements OnInit {

  patReg: FormGroup;
  isLoading = false;
  preview: string;

  constructor(private patientService: PatientService, private router: Router) {
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
    return this.patReg.get(controlName).invalid && this.patReg.get(controlName).touched;
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
    if(this.patReg.controls.password.value != this.patReg.controls.c_password.value){
      console.log("Formulaire Invalid"); 
      return;
    }
    this.isLoading = true;
    this.patientService.addpatient(
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
        this.patReg.value.certify
    ).subscribe(response => {
      this.router.navigate(["/login"]);
    });

  }


}
