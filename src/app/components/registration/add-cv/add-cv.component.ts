import { Router } from '@angular/router';
import { DoctorService } from './../../../services/doctor/doctor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css']
})
export class AddCvComponent implements OnInit {
  doctorCv: FormGroup;
  isLoading = false;

  constructor(private doctorService: DoctorService, private router: Router) { 
    this.doctorCv = new FormGroup ({
      fullname: new FormControl(null, {validators: [Validators.required]}),
      cv: new FormControl(null, { validators: [Validators.required]})
    })
   }

  ngOnInit(): void {
  }

  isValid(controlName) {
    return this.doctorCv.get(controlName).invalid && this.doctorCv.get(controlName).touched;
  }

  cvUpload(event) {
    const cv = (event.target as HTMLInputElement).files[0];
    this.doctorCv.patchValue({
      cv: cv,
    });
    this.doctorCv.get('cv').updateValueAndValidity();
  }

  onCvSubmit() {
    this.isLoading = true;
    this.doctorService.addCv(
      this.doctorCv.value.fullname,
      this.doctorCv.value.cv
    ).subscribe(response => {
      this.router.navigate(["/doctor-signup-success"]);
    })

  }


}
