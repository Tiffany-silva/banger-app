import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/clerk/';
@Injectable({
  providedIn: 'root'
})
export class ClerkService {

  constructor(private http: HttpClient) { }

  postUpdateEmail(): Observable<any> {
    return this.http.put(baseUrl + 'updateEmail', { responseType: 'text' });
  }

  postUpdatePassword(): Observable<any> {
    return this.http.put(baseUrl + 'updatePassword', { responseType: 'text' });
  }

  postUpdateName(): Observable<any> {
    return this.http.put(baseUrl + 'updateName', { responseType: 'text' });
  }

  getAllClerks(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data:any): Observable<any> {
    return this.http.post(baseUrl,data);
  }

  delete(id:any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

}