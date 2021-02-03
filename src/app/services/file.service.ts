import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': '*'})
// };
@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly apiKey: string = '659ad79210abf40244561adc10b63988';

  constructor(private http: HttpClient) {
  }

  uploadImageAndGetURL(file:any): Observable<any>{
    let formdata: FormData = new FormData();
    formdata.append('image', file[0]);

    return this.http.post(`https://api.imgbb.com/1/upload`, formdata, {params :{key: this.apiKey}})
      .pipe(map((response:any)=>response['data']['url']));
  }
}
