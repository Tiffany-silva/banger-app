import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clerk } from '../entity.Models/clerk';
import { Hirer } from '../entity.Models/hirer';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': '*'})
};
@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private readonly apiKey:string='659ad79210abf40244561adc10b63988';
    constructor(private http: HttpClient) {

    }

    login(credentials: { email: any; password: any }): Observable<any> {
      return this.http.post(AUTH_API + 'login', {
        email: credentials.email,
        password: credentials.password,
      }, httpOptions);
    }

    registerClerk(user: Clerk): Observable<any> {
      console.log(user);

      return this.http.post(AUTH_API + 'signup', {
        name: user.name,
        email: user.email,
        password: user.password,
        role:user.role
      }, httpOptions);
    }

    registerHirer(user: Hirer, url:string) {
        return this.http.post(AUTH_API + 'signup', {
          firstName: user.firstName,
          lastName: user.lastName,
          nic: user.nic,
          dob: user.dob,
          photoURL: url,
          confirmIdentity: user.confirmIdentity,
          drivingLicenseUrl: user.drivingLicenseURL,
          address: user.address,
          email:user.email,
          password: user.password,
          blackListed: user.blackListed,
          role:user.role
        }, httpOptions);
      };

      // const userBlob = new Blob([myObjStr], { type: 'application/json'});
      // console.log(userBlob);
      // formdata.append('user', userBlob);
      // console.log(formdata);
      // return this.http.post(AUTH_API + 'signup', formdata, httpOptions);



    logout(role:any, id:any):Observable<any>{
      console.log("im hereeee")
      console.log(role)
      return this.http.post(AUTH_API+"logout/"+id,role);
    }

    uploadImageAndGetURL(file:any): Observable<any>{
      let formdata: FormData = new FormData();
      formdata.append('image', file[0]);

      return this.http.post(`https://api.imgbb.com/1/upload`, formdata, {params :{key: this.apiKey}})
        .pipe(map((response:any)=>response['data']['url']));
    }

  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   // Check whether the token is expired and return
  //   // true or false
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

}
