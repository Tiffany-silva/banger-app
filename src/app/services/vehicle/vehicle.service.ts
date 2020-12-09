import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/clerk/';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  updateQuantity(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updateQuantity/${id}`, data);
  }

  updatePrice(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updatePrice/${id}`, data);
  }
  
  getAllVehicles(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getAllBookingsofVehicle(data:any): Observable<any> {
    return this.http.get(`${baseUrl}/findAllBookingsofVehicle`, data);
  }

  getVehicle(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  
  createVehicle(data:any): Observable<any> {
    return this.http.post(baseUrl,data);
  }

  deleteVehicle(id:any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAllVehicles(): Observable<any> {
    return this.http.delete(baseUrl);
  }

}