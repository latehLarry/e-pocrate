import { Router } from '@angular/router';
import { Cv } from './../../models/cv.model';
import { Doctor } from './../../models/doctor.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/doctors';
const BACKEND_ADMIN_URL = environment.adminApiUrl + '';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  docs: Doctor[] = [];
  private docsUpdated = new Subject<{ docs: Doctor[]; docCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

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
    spec: string,
    ref_no: string,
    doc_order: string,
    faculty: string,
    city_obt: string,
    ctry_obt: string,
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
    postData.append('spec', spec);
    postData.append('ref_no', ref_no);
    postData.append('doc_order', doc_order);
    postData.append('faculty', faculty);
    postData.append('city_obt', city_obt);
    postData.append('ctry_obt', ctry_obt);
    postData.append('username', username);
    postData.append('gender', gender);
    postData.append('password', password);
    postData.append('certify', certify);
    return this.http.post<{ message: string; doctor: Doctor }>(
      BACKEND_URL + '/add-doctor',
      postData
    );
  }
  addDoctorByAdmin(doctor: Doctor) {
    console.log("darrrr", doctor);
    const postData = Doctor.toFormData(doctor);
    return this.http.post<{ message: string; doctor: Doctor }>(
      BACKEND_ADMIN_URL + '/add-doctor',
      postData
    );
  }

  // add cv
  addCv(fullname: string, profileCv: File): Observable<any> {
    var formData: any = new FormData();
    formData.append('fullname', fullname);
    formData.append('cv', profileCv);
    return this.http.post<{ message: string; cv: Cv }>(
      BACKEND_URL + '/add-cv',
      formData
    );
  }



  //for pagination
  /*
  getDoctors(doctorsPerPage: number, currentPage:number) {
    const queryParams = `?pagesize=${doctorsPerPage}&page=${currentPage}`;
    return this.http.get<{message: string; docs: any; maxDoctors: number}>(BACKEND_URL + "doctors-list" + queryParams).pipe(
      map(docData => {
        return {
          docs: docData.docs.map(doc => {
            return {
              id: doc.id,
              name: doc.name,
              surname: doc.surname,
              email: doc.email,
              tel: doc.tel,
              dob: doc.dob,
              photo: doc.profilePic,
              address: doc.address,
              postal_code: doc.postal_code,
              country: doc.country,
              city: doc.city,
              spec: doc.spec,
              ref_no: doc.ref_no,
              doc_order: doc.doc_order,
              faculty: doc.faculty,
              city_obt: doc.city_obt,
              ctry_obt: doc.ctry_obt,
              username: doc.username,
              gender: doc.gender,
              password: doc.password,
              certify: doc.certify,
              creation_date: doc.creation_date,
              active: doc.active,
            };
          }),
          maxDoctors: docData.maxDoctors
        };
      })
    ).subscribe(res => {
      this.docs = res.docs;
      this.docsUpdated.next({
        docs: [...this.docs], 
        docCount: res.maxDoctors
      });
    });
  } 

  getDocUpdateListiner() {
    return this.docsUpdated.asObservable();
  } */

  getAllDoctors() {
    return this.http.get(BACKEND_URL + '/doctors-list');
  }

  loadDoctorConversations() {
    
    return this.http.get(BACKEND_URL + '/doctors/conversations');
  }

  getDoctorById(id: string) {
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
      spec: string;
      ref_no: string;
      doc_order: string;
      faculty: string;
      city_obt: string;
      ctry_obt: string;
      username: string;
      gender: string;
      password: string;
      certify: string;
      creation_date: string;
      active: string;
    }>(BACKEND_URL + '/' + id);
  }

  updateDoctorInfo(
    id: string,
    name: string,
    surname: string,
    email: string,
    tel: string,
    dob: string,
    profilePic: File | string,
    address: string,
    postal_code: string,
    country: string,
    city: string,
    spec: string,
    ref_no: string,
    doc_order: string,
    faculty: string,
    city_obt: string,
    ctry_obt: string,
    username: string,
    gender: string,
    password: string,
    certify: string,
    creation_date: string,
    active: string
  ) {
    let postData: Doctor | FormData;
    if (typeof profilePic === 'object') {
      postData = new FormData();
      postData.append('id', id);
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
      postData.append('spec', spec);
      postData.append('ref_no', ref_no);
      postData.append('doc_order', doc_order);
      postData.append('faculty', faculty);
      postData.append('city_obt', city_obt);
      postData.append('ctry_obt', ctry_obt);
      postData.append('username', username);
      postData.append('gender', gender);
      postData.append('password', password);
      postData.append('certify', certify);
      postData.append('creation_date', creation_date);
      postData.append('active', active);
    } else {
      postData = {
        id: id,
        name: name,
        surname: surname,
        email: email,
        tel: tel,
        dob: dob,
        photo: profilePic,
        address: address,
        postal_code: postal_code,
        country: country,
        city: city,
        spec: spec,
        ref_no: ref_no,
        doc_order: doc_order,
        faculty: faculty,
        city_obt: city_obt,
        ctry_obt: ctry_obt,
        username: username,
        gender: gender,
        password: password,
        certify: certify,
        creation_date: creation_date,
        active: active,
      };
    }
    this.http
      .put(BACKEND_URL + '/edit-doctor/' + id, postData)
      .subscribe((res) => {
        this.router.navigate(['/doctors-list']);
      });
  }

  deleteDoctor(doctorId: string) {
    return this.http.delete(BACKEND_URL + '/' + doctorId);
  }
}
