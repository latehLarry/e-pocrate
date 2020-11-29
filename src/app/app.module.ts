import { AdminAuthGuard } from './auth/admin/admin-auth.guard';
import { UserAuthGuard } from './auth/user/user-auth.guard';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AdminAuthInterceptor } from './auth/admin/admin-auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule,
  MAT_INPUT_VALUE_ACCESSOR,
} from '@angular/material/input';
import {
  MatDatepicker, MatDatepickerModule, MatDatepickerToggle,
} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { KnowusComponent } from './components/knowus/knowus.component';
import { ContactComponent } from './components/contact/contact.component';
import { DoctorSignupComponent } from './components/registration/doctor-signup/doctor-signup.component';
import { PatientSignupComponent } from './components/registration/patient-signup/patient-signup.component';
import { ChooseSignupComponent } from './components/registration/choose-signup/choose-signup.component';
import { ChooseSigninComponent } from './components/signin/choose-signin/choose-signin.component';
import { DoctorSigninComponent } from './components/signin/doctor-signin/doctor-signin.component';
import { PatientSigninComponent } from './components/signin/patient-signin/patient-signin.component';
import { PharmacieComponent } from './components/pharmacie/pharmacie.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DoctorSignupSuccessComponent } from './components/registration/doctor-signup-success/doctor-signup-success.component';
import { PatientSignupSuccessComponent } from './components/registration/patient-signup-success/patient-signup-success.component';
import { AddCvComponent } from './components/registration/add-cv/add-cv.component';
import { AdminSignupComponent } from './components/registration/admin-signup/admin-signup.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNotificationsComponent } from './admin/admin-notifications/admin-notifications.component';
import { DoctorListComponent } from './admin/doctor-list/doctor-list.component';
import { PatientListComponent } from './admin/patient-list/patient-list.component';
import { DoctorDetailsComponent } from './admin/doctor-details/doctor-details.component';
import { EditDoctorComponent } from './admin/edit-doctor/edit-doctor.component';
import { DoctorHomeComponent } from './doctor/doctor-home/doctor-home.component';
import { PatientHomeComponent } from './patient/patient-home/patient-home.component';
import { PatientProfilComponent } from './patient/patient-profil/patient-profil.component';
import { PatientRdvComponent } from './patient/patient-rdv/patient-rdv.component';
import { PatientFilesComponent } from './patient/patient-files/patient-files.component';
import { PatientConsultationComponent } from './patient/patient-consultation/patient-consultation.component';
import { PatientMessageComponent } from './patient/patient-message/patient-message.component';
import { FindDoctorComponent } from './patient/find-doctor/find-doctor.component';
import { PatientHeaderComponent } from './patient/patient-header/patient-header.component';
import { PatientNavbarComponent } from './patient/patient-navbar/patient-navbar.component';
import { ViewDoctorInfoComponent } from './patient/view-doctor-info/view-doctor-info.component';
import { PatientNotificationsComponent } from './patient/patient-notifications/patient-notifications.component';
import { ConsultationBookingComponent } from './patient/consultation-booking/consultation-booking.component';
import { PatientDetailsComponent } from './admin/patient-details/patient-details.component';
import { EditPatientComponent } from './admin/edit-patient/edit-patient.component';
import { AddDoctorComponent } from './admin/add-doctor/add-doctor.component';
import { MentionsComponent } from './components/mentions/mentions.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FaqComponent } from './components/faq/faq.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorSidebarComponent } from './doctor/doctor-sidebar/doctor-sidebar.component';
import { DoctorNavbarComponent } from './doctor/doctor-navbar/doctor-navbar.component';
import { DoctorMessageComponent } from './doctor/doctor-message/doctor-message.component';
import { DoctorPatientsListComponent } from './doctor/doctor-patients-list/doctor-patients-list.component';
import { DoctorPatientDetailsComponent } from './doctor/doctor-patient-details/doctor-patient-details.component';
import { DoctorConsultationComponent } from './doctor/doctor-consultation/doctor-consultation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PricingComponent,
    FaqComponent,
    DoctorSidebarComponent,
    DoctorNavbarComponent,
    DoctorConsultationComponent,
    DoctorPatientsListComponent,
    DoctorPatientDetailsComponent,
    LoginComponent,
    DoctorMessageComponent,
    AboutComponent,
    KnowusComponent,
    MentionsComponent,
    ContactComponent,
    DoctorSignupComponent,
    PatientSignupComponent,
    ChooseSignupComponent,
    ChooseSigninComponent,
    DoctorSigninComponent,
    PatientSigninComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    FooterComponent,
    HeaderComponent,
    DoctorSignupSuccessComponent,
    PatientSignupSuccessComponent,
    AddCvComponent,
    AdminSignupComponent,
    AdminHeaderComponent,
    AdminNavbarComponent,
    AdminDashboardComponent,
    AdminNotificationsComponent,
    DoctorListComponent,
    PatientListComponent,
    DoctorDetailsComponent,
    EditDoctorComponent,
    AddDoctorComponent,
    DoctorHomeComponent,
    PatientHomeComponent,
    FindDoctorComponent,
    PatientHeaderComponent,
    PatientNavbarComponent,
    ViewDoctorInfoComponent,
    PatientNotificationsComponent,
    ConsultationBookingComponent,
    PatientDetailsComponent,
    EditPatientComponent,
    PatientProfilComponent,
    PatientMessageComponent,
    PatientRdvComponent,
    PatientConsultationComponent,
    PatientFilesComponent,
    PharmacieComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSelectCountryModule.forRoot('fr'),
    MatDatepickerModule,
    NgSelectModule,
    NgxIntlTelInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminAuthInterceptor,
      multi: true,
    },
    AdminService,
    AdminAuthGuard,
    UserAuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
