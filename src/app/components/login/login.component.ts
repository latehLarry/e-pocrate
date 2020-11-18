import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  adminLogin: FormGroup;
  isLoading = false;
  error = '';

  constructor(private userService: UserService, private router: Router) {
    this.adminLogin = new FormGroup ({
      username: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required]})
    });
  }

  ngOnInit(): void {
  }

  isValid(controlName) {
    return this.adminLogin.get(controlName).invalid && this.adminLogin.get(controlName).touched;
  }

  onSubmit() {
    this.error = '';
    this.isLoading = true;
    this.userService.login(this.adminLogin.value).subscribe(response => {
      this.userService.setToken(response["token"]);
      this.userService.setUser(response["user"]);
      if (response["user"].role === 'patient') {
        this.router.navigate(["/patient/home"]);
      } else {
        this.router.navigate(["/doctor/consultations"]);
      }
    }, (error) => {
      this.error = 'Impossible de trouver un compte avec cette adresse.';
      this.isLoading = false;
    });
  }

}
