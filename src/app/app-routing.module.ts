import { PatientSignupComponent } from './components/registration/patient-signup/patient-signup.component';
import { DoctorSignupComponent } from './components/registration/doctor-signup/doctor-signup.component';
import { PatientSigninComponent } from './components/signin/patient-signin/patient-signin.component';
import { DoctorSigninComponent } from './components/signin/doctor-signin/doctor-signin.component';
import { ChooseSignupComponent } from './components/registration/choose-signup/choose-signup.component';
import { ChooseSigninComponent } from './components/signin/choose-signin/choose-signin.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'choose-signup', component: ChooseSignupComponent},
  {path: 'choose-signin', component: ChooseSigninComponent},
  {path: 'doctor-signin', component: DoctorSigninComponent},
  {path: 'patient-signin', component: PatientSigninComponent},
  {path: 'doctor-signup', component: DoctorSignupComponent},
  {path: 'patient-signup', component: PatientSignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
