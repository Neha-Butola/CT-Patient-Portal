import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImmDetailsService {
  api = environment.baseUrl + 'immunization';
  constructor(private http: HttpClient) {}

  submitImmunization(data: any) {
    return this.http.post(this.api, data);
  }
  getImmunization(patientId: number): Observable<any> {
    return this.http.get(this.api + '/' + patientId);
  }
}
