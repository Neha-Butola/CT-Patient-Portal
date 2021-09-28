import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  api = environment.baseUrl + 'billing';

  // api = 'http://localhost:3000/demographics';

  constructor(private http: HttpClient) {}

  saveBill(data: any): Observable<any> {
    // return this.http.post(`${baseUrl}demographics`, data);
    return this.http.post(this.api, data);
  }

  getBilling(patientId: number): Observable<any> {
    return this.http.get(this.api + '/' + patientId);
  }

  getBillingData(): Observable<any> {
    return this.http.get(this.api);
  }

  updateBill(data: any, patientId: any): Observable<any> {
    return this.http.put(this.api + '/' + patientId, data);
  }
}
