import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/clerk/';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  updateEmail(id:any, status:any): Observable<any> {
    return this.http.put(`${baseUrl}/completeBooking/${id}`, status);
  }

  updateBookingStatus(id:any, status:any): Observable<any> {
    return this.http.put(`${baseUrl}/updateBookingStatus/${id}`, status);
  }

  updateConfirmIdentity(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/confirmIdentity/${id}`, data);
  }

  extendReturnDate(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updateFirstName/${id}`, data);
  }
  
  getAllBookings(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getAllForStatus(status:any): Observable<any> {
    return this.http.get(`${baseUrl}/findAllForStatus`, status);
  }

  getBooking(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  
  createBooking(data:any): Observable<any> {
    return this.http.post(baseUrl,data);
  }

  deleteBookings(id:any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAllBookings(): Observable<any> {
    return this.http.delete(baseUrl);
  }

}