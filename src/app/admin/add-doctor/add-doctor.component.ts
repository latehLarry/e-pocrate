import { Doctor } from '../../models/doctor.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DoctorService } from '../../services/doctor/doctor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
})
export class AddDoctorComponent {
  docs: Doctor;
  docReg: FormGroup;
  preview: string;
  isLoading = false;
  private doctorId: string;

  constructor(
    private doctorService: DoctorService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.docs = new Doctor();
    this.docReg = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      surname: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      tel: new FormControl(null, { validators: [Validators.required] }),
      dob: new FormControl(null, { validators: [Validators.required] }),
      photo: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null, { validators: [Validators.required] }),
      postal_code: new FormControl(null, { validators: [Validators.required] }),
      country: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      spec: new FormControl(null, { validators: [Validators.required] }),
      ref_no: new FormControl(null, { validators: [Validators.required] }),
      faculty: new FormControl(null, { validators: [Validators.required] }),
      city_obt: new FormControl(null, { validators: [Validators.required] }),
      ctry_obt: new FormControl(null, { validators: [Validators.required] }),
      username: new FormControl(null, { validators: [Validators.required] }),
      gender: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
      c_password: new FormControl(null, { validators: [Validators.required] }),
    });
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
    };
    reader.readAsDataURL(photo);
  }

  onCountrySelected(event, name) {
    console.log('evet', event)
    const value = event.name;
    this.docs[name] = value;
    this.docReg[name].setValue(value);
    console.log("docReg", this.docReg);
  }

  onSubmit() {
    this.isLoading = true;
    this.doctorService
      .addDoctorByAdmin(this.docReg.getRawValue())
      .subscribe(
        (data) => {
          this.router.navigate(['/doctors-list']);
        },
        (error) => {}
      );
  }
}
