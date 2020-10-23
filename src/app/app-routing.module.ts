import { ConsultationBookingComponent } from './patient/consultation-booking/consultation-booking.component';
import { ViewDoctorInfoComponent } from './patient/view-doctor-info/view-doctor-info.component';
import { FindDoctorComponent } from './patient/find-doctor/find-doctor.component';
import { PatientHomeComponent } from './patient/patient-home/patient-home.component';
import { EditDoctorComponent } from './admin/edit-doctor/edit-doctor.component';
import { AddDoctorComponent } from './admin/add-doctor/add-doctor.component';
import { DoctorDetailsComponent } from './admin/doctor-details/doctor-details.component';
import { PatientListComponent } from './admin/patient-list/patient-list.component';
import { DoctorListComponent } from './admin/doctor-list/doctor-list.component';
import { AdminAuthGuard } from './auth/admin/admin-auth.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminSignupComponent } from './components/registration/admin-signup/admin-signup.component';
import { AddCvComponent } from './components/registration/add-cv/add-cv.component';
import { PatientSignupSuccessComponent } from './components/registration/patient-signup-success/patient-signup-success.component';
import { DoctorSignupSuccessComponent } from './components/registration/doctor-signup-success/doctor-signup-success.component';
import { PatientSignupComponent } from './components/registration/patient-signup/patient-signup.component';
import { DoctorSignupComponent } from './components/registration/doctor-signup/doctor-signup.component';
import { PatientSigninComponent } from './components/signin/patient-signin/patient-signin.component';
import { DoctorSigninComponent } from './components/signin/doctor-signin/doctor-signin.component';
import { ChooseSignupComponent } from './components/registration/choose-signup/choose-signup.component';
import { ChooseSigninComponent } from './components/signin/choose-signin/choose-signin.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsComponent } from './admin/patient-details/patient-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'choose-signup', component: ChooseSignupComponent },
  { path: 'choose-signin', component: ChooseSigninComponent },
  { path: 'doctor-signin', component: DoctorSigninComponent },
  { path: 'patient-signin', component: PatientSigninComponent },
  { path: 'doctor-signup', component: DoctorSignupComponent },
  { path: 'upload-cv', component: AddCvComponent },
  { path: 'patient-signup', component: PatientSignupComponent },
  { path: 'doctor-signup-success', component: DoctorSignupSuccessComponent },
  { path: 'patient-signup-success', component: PatientSignupSuccessComponent },
  { path: 'admin-signup', component: AdminSignupComponent },
  { path: 'admin-signin', component: AdminLoginComponent },
  {
    path: 'admin-home',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'doctors-list',
    component: DoctorListComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'patients-list',
    component: PatientListComponent,
    canActivate: [AdminAuthGuard],
  },
  { path: 'doctor-details/:doctorId', component: DoctorDetailsComponent },
  {
    path: 'edit-doctor/:doctorId',
    component: EditDoctorComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'add-doctor',
    component: AddDoctorComponent,
    canActivate: [AdminAuthGuard],
  },
  { path: 'patient-home', component: PatientHomeComponent },
  { path: 'find-doctor', component: FindDoctorComponent },
  { path: 'doctor-info/:doctorId', component: ViewDoctorInfoComponent },
  { path: 'doctor-booking/:doctorId', component: ConsultationBookingComponent },
  { path: 'patient-details/:patId', component: PatientDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
