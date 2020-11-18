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
import { AboutComponent } from './components/about/about.component';
import { KnowusComponent } from './components/knowus/knowus.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { LoginComponent } from './components/login/login.component';
import { MentionsComponent } from './components/mentions/mentions.component';
import { FaqComponent } from './components/faq/faq.component';
import { DoctorMessageComponent } from './doctor/doctor-message/doctor-message.component';
import { DoctorPatientsListComponent } from './doctor/doctor-patients-list/doctor-patients-list.component';
import { DoctorPatientDetailsComponent } from './doctor/doctor-patient-details/doctor-patient-details.component';
import { DoctorConsultationComponent } from './doctor/doctor-consultation/doctor-consultation.component';
import { PatientProfilComponent } from './patient/patient-profil/patient-profil.component';
import { PatientMessageComponent } from './patient/patient-message/patient-message.component';
import { PatientRdvComponent } from './patient/patient-rdv/patient-rdv.component';
import { PatientConsultationComponent } from './patient/patient-consultation/patient-consultation.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'choose-signup', component: ChooseSignupComponent },
  { path: 'choose-signin', component: ChooseSigninComponent },
  { path: 'doctor-signin', component: DoctorSigninComponent },
  { path: 'patient-signin', component: PatientSigninComponent },
  { path: 'login', component: LoginComponent },
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
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'doctor-message',
    component: DoctorMessageComponent,
  },
  {
    path: 'doctor/consultations',
    component: DoctorConsultationComponent,
  },
  {
    path: 'doctor/patients',
    component: DoctorPatientsListComponent,
  },
  {
    path: 'doctor/patients/:patientId',
    component: DoctorPatientDetailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
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
  { path: 'patient/home', component: PatientProfilComponent },
  { path: 'patient/messages', component: PatientMessageComponent },
  { path: 'patient/rdv', component: PatientRdvComponent },
  { path: 'patient/consultations', component: PatientConsultationComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'mentions-legales', component: MentionsComponent },
  { path: 'nos-tarifs', component: PricingComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'know-us', component: KnowusComponent },
  { path: 'patient/find-doctor', component: FindDoctorComponent },
  { path: 'patient/doctor-info/:doctorId', component: ViewDoctorInfoComponent },
  { path: 'patient/doctor-booking/:doctorId', component: ConsultationBookingComponent },
  { path: 'patient/:patId', component: PatientDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
