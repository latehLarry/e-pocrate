import { Router } from '@angular/router';
import { AdminService } from './../../../services/admin/admin.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {
  adminAdd: FormGroup;
  isLoading = false;

  constructor(private adminService: AdminService, private router: Router) {
    this.adminAdd = new FormGroup ({
      fullname: new FormControl(null, { validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required]}),
      tel: new FormControl(null, {validators: [Validators.required]}),
      dob: new FormControl(null, {validators: [Validators.required]}),
      photo: new FormControl(null, {validators: [Validators.required]}),
      address: new FormControl(null, {validators: [Validators.required]}),
      city: new FormControl(null, {validators: [Validators.required]}),
      ctry: new FormControl(null, {validators: [Validators.required]}),

    })
   }

  ngOnInit(): void {
  }

  isValid(controlName) {
    return this.adminAdd.get(controlName).invalid && this.adminAdd.get(controlName).touched;
  }

  profileUpload(event) {
    const photo = (event.target as HTMLInputElement).files[0];
    this.adminAdd.patchValue({
      photo: photo,
    });
    this.adminAdd.get('photo').updateValueAndValidity();
  }

  onSubmit() {
    this.isLoading = true;
    this.adminService.addAdmin(
      this.adminAdd.value.fullname,
      this.adminAdd.value.email,
      this.adminAdd.value.password,
      this.adminAdd.value.tel,
      this.adminAdd.value.dob,
      this.adminAdd.value.photo,
      this.adminAdd.value.address,
      this.adminAdd.value.city,
      this.adminAdd.value.ctry
    ).subscribe(response => {
      this.router.navigate(["/admin-signin"]);
    })
  }

}
