import { Patient } from './../../models/patient.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

const BACKEND_URL = environment.apiUrl + "/patients/";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient, private router: Router) { }

  addpatient(
    name: string, 
    surname: string, 
    email: string, 
    tel: string, 
    dob: string, 
    profilePic: File, 
    address: string, 
    postal_code: string, 
    country: string, 
    city: string, 
    username: string,
    gender: string,
    password: string,
    certify: string
  ) {
    const postData = new FormData();
    postData.append('name', name);
    postData.append('surname', surname);
    postData.append('email', email);
    postData.append('tel', tel);
    postData.append('dob', dob);
    postData.append('photo', profilePic);
    postData.append('address', address);
    postData.append('postal_code', postal_code);
    postData.append('country', country);
    postData.append('city', city);
    postData.append('username', username);
    postData.append('gender', gender);
    postData.append('password', password);
    postData.append('certify', certify);
    return this.http.post<{message: string; patient: Patient}>(BACKEND_URL, postData);
  }

  getAllPatients() {
    return this.http.get(BACKEND_URL + "/patients-list");
  }

  getPatientById(id: string) {
    return this.http.get<{
    _id: string;
    name: string;
    surname: string;
    email: string;
    tel: string;
    dob: string;
    photo: string;
    address: string;
    postal_code: string;
    country: string;
    city: string;
    username: string;
    gender: string;
    password: string;
    certify: string;
    creation_date: string;
    }>(BACKEND_URL + "/"+ id);
  }

  deletePatient(patientId: string) {
    return this.http.delete(BACKEND_URL + patientId);
  }
}
