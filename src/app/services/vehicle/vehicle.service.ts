import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/vehicle';
const rateCompareUrl='http://localhost:8080/api/webScraping';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  updateQuantity(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updateQuantity/${id}`, {quantity: data});
  }

  updatePrice(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updatePrice/${id}`, {price: data});
  }

  getAllVehicles(): Observable<any> {
    console.log(this.http.get(baseUrl));
    return this.http.get(baseUrl, { responseType: 'json' });
  }

  getAllBookingsofVehicle(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/findAllBookingsofVehicle/${id}`);
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

  getComparisonRates(): Observable<any> {
    return this.http.get(`${rateCompareUrl}/rateComparison`);
  }

}
