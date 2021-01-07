import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/hirer';
@Injectable({
  providedIn: 'root'
})
export class HirerService {

  constructor(private http: HttpClient) { }

  updateEmail(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updateEmail/${id}`, data);
  }

  updatePassword(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updatePassword/${id}`, data);
  }

  updateConfirmIdentity(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/confirmIdentity/${id}`, data);
  }

  updateFirstName(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updateFirstName/${id}`, data);
  }
  
  updatePhotoURL(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updatePhotoURL/${id}`, data);
  }
  
  updateAddress(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updateAddress/${id}`, data);
  }
  
  checkIfBlacklisted(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/isBlacklisted/${id}`);
  }

  getAllBlacklisted(): Observable<any> {
    return this.http.get(baseUrl+'findAllBlacklisted');
  }

  getAllBookingsOfHirer(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/findAllBookingsOfHirer/${id}`);
  }

  getHirer(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  getAllHirers(): Observable<any> {
    return this.http.get(baseUrl);
  }

  blackListUser(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/blackList/${id}`, data);
  }
  create(data:any): Observable<any> {
    return this.http.post(baseUrl,data);
  }

  deleteHirer(id:any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAllHirers(): Observable<any> {
    return this.http.delete(baseUrl);
  }

}