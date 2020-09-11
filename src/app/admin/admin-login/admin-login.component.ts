import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminLogin: FormGroup;
  isLoading = false!;

  constructor(private adminService: AdminService, private router: Router) { 
    this.adminLogin = new FormGroup ({
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required]})
    })
  }

  ngOnInit(): void {
  }

  isValid(controlName) {
    return this.adminLogin.get(controlName).invalid && this.adminLogin.get(controlName).touched;
  }

  onSubmit() {
    this.isLoading = true;
    this.adminService.adminSignin(this.adminLogin.value).subscribe(response => {
      this.adminService.setToken(response["token"]);
      this.router.navigate(["/admin-home"]);
    });
  }

}
