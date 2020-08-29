import { Doctor } from './../../models/doctor.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const BACKEND_URL = environment.apiUrl + "/doctors/";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  addDoctor(
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
    ref_no: string, 
    doc_order: string, 
    faculty: string,
    city_obt: string,
    ctry_obt: string,
    username: string,
    gender: string,
    password: string,
    certify: string) {
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
   postData.append('ref_no', ref_no);
   postData.append('doc_order', doc_order);
   postData.append('faculty', faculty);
   postData.append('city_obt', city_obt);
   postData.append('ctry_obt', ctry_obt);
   postData.append('username', username);
   postData.append('gender', gender);
   postData.append('password', password);
   postData.append('certify', certify);
   return this.http.post(BACKEND_URL, Doctor);
  }

}
