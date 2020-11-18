import { Admin } from './../../models/admin.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + "/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  noAuthHeader = { headers: new HttpHeaders({ "NoAuth": "True" }) };

  constructor(private http: HttpClient) { }

 

  login(authCredetials) {
    return this.http.post(BACKEND_URL + "/login", authCredetials, this.noAuthHeader);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }

    return user;
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
