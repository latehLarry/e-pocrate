import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DoctorSignupComponent } from './components/registration/doctor-signup/doctor-signup.component';
import { PatientSignupComponent } from './components/registration/patient-signup/patient-signup.component';
import { ChooseSignupComponent } from './components/registration/choose-signup/choose-signup.component';
import { ChooseSigninComponent } from './components/signin/choose-signin/choose-signin.component';
import { DoctorSigninComponent } from './components/signin/doctor-signin/doctor-signin.component';
import { PatientSigninComponent } from './components/signin/patient-signin/patient-signin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
