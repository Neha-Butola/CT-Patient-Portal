import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demographics } from '../model/demographics';
// import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DemographicsService {
  api = environment.baseUrl + 'demographics';

  // api = 'http://localhost:3000/demographics';

  constructor(private http: HttpClient) {}

  saveDemography(data: any): Observable<any> {
    // return this.http.post(`${baseUrl}demographics`, data);
    return this.http.post(this.api, data);
  }
  getDemography(): Observable<any> {
    return this.http.get(this.api);
  }

  deleteDemography(): Observable<any> {
    return this.http.delete(this.api);
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  putDemography(data: any): Observable<any> {
    return this.http.put(this.api, data, this.httpOptions);
    console.log(data);
  }
}
