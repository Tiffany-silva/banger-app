import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clerk } from '../entity.Models/clerk';
import { Hirer } from '../entity.Models/hirer';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': '*'})
};
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
    constructor(private http: HttpClient) { }
  
    login(credentials: { email: any; password: any;}): Observable<any> {
      return this.http.post(AUTH_API + 'login', {
        email: credentials.email,
        password: credentials.password,
      }, httpOptions);
    }
  
    registerClerk(user: Clerk): Observable<any> {
      console.log("1111111")
      console.log(user);

      return this.http.post(AUTH_API + 'signup', {
        name: user.name,
        email: user.email,
        password: user.password,
        role:user.role
      }, httpOptions);
    }

    registerHirer(user: Hirer): Observable<any> {
      console.log('-------');
      console.log(user);
      return this.http.post(AUTH_API + 'signup', {
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        photoURL: user.photoURL,
        confirmIdentity: user.confirmIdentity,
        drivingLicenseUrl: user.drivingLicenseURL,
        address: user.address,
        email:user.email,
        password: user.password,
        blackListed: user.blackListed,
        role:user.role
      }, httpOptions);
    }

    logout(role:any, id:any):Observable<any>{
      console.log("im hereeee")
      console.log(role)
      return this.http.post(AUTH_API+"logout/"+id,role);
    }

}
