import { Admin } from './../../models/admin.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + "/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  noAuthHeader = { headers: new HttpHeaders({ "NoAuth": "True" }) };

  constructor(private http: HttpClient) { }

  addAdmin(
    fullname: string,
    email: string,
    password: string,
    tel: string,
    dob: string,
    profilePic: File,
    address: string,
    city: string,
    ctry: string
  ) {
    const postAdmin = new FormData();
    postAdmin.append("fullname", fullname);
    postAdmin.append("email", email);
    postAdmin.append("password", password);
    postAdmin.append("tel", tel);
    postAdmin.append("dob", dob);
    postAdmin.append("photo", profilePic);
    postAdmin.append("address", address);
    postAdmin.append("city", city);
    postAdmin.append("ctry", ctry);

    return this.http.post<{message: string; admin: Admin}>(BACKEND_URL, postAdmin);
  }

  adminSignin(authCredetials) {
    return this.http.post(BACKEND_URL + "/admin-login", authCredetials, this.noAuthHeader);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserToken() {
    const token = this.getToken();
    if(token) {
      const userToken = atob(token.split('.')[1]);
      return JSON.parse(userToken);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userToken = this.getUserToken();
    if(userToken){
      return userToken.exp > Date.now() / 1000;
    } else {
      return false;   
    }
  }

}
