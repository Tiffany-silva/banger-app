import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/booking';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  completeBooking(id:any, status:any): Observable<any> {
    return this.http.put(`${baseUrl}/completeBooking/${id}`, status);
  }

  updateBookingStatus(id:any, status:any): Observable<any> {
    return this.http.put(`${baseUrl}/updateBookingStatus/${id}`, status);
  }

  updateConfirmIdentity(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/confirmIdentity/${id}`, data);
  }

  extendReturnDate(id:any, returnDate:any): Observable<any> {
    return this.http.put(`${baseUrl}/extendReturnDate/${id}`, {returnDate: returnDate});
  }
  
  getAllBookings(): Observable<any> {
    return this.http.get(baseUrl);
  }

  checkForBookingAvailability(date:any): Observable<any> {
    return this.http.get(`${baseUrl}/checkForBookingAvailability`, {params: {date: date}});
  }

  getAllForStatus(status:any): Observable<any> {
    return this.http.get(`${baseUrl}/findAllForStatus`, {params: {bookingStatus: status}});
  }
  findAllBookingsOfUser(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/findAllBookingsOfUser/${id}`);
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

  getAvailableVehicles(requestedBooking:any): Observable<any> {
    return this.http.post(`${baseUrl}/getAvailableVehicles`, requestedBooking);
  }
  findAllForStatusOfUser(id:any, status:any): Observable<any> {
    return this.http.get(`${baseUrl}/findAllForStatusOfUser`, {params: {id: id, bookingStatus: status}});
  }

  getAvailabilityOfVehicle(requestedBooking:any): Observable<any> {
    return this.http.post(`${baseUrl}/getAvailabilityOfVehicle`,requestedBooking );
  }

  getAvailableEquipments(requestedBooking:any): Observable<any> {
    return this.http.post(`${baseUrl}/getAvailableEquipments`, requestedBooking);
  }


}