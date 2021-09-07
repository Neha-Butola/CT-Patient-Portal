import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemographicsService {
  api = '/demographics';
  constructor(private http: HttpClient) {}

  /* getDemography(): Observable<any> {
    return this.httpclient.get(this.api);
  }*/
  saveDemography(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }
}
