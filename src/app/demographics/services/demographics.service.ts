import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DemographicsService {
  api = environment.baseUrl + 'demographics';
  // api = 'http://localhost:3000/demographics';

  constructor(private http: HttpClient) {}

  /* getDemography(): Observable<any> {
    return this.httpclient.get(this.api);
  }*/
  saveDemography(data: any): Observable<any> {
    // return this.http.post(`${baseUrl}demographics`, data);
    return this.http.post(this.api, data);
  }
}
