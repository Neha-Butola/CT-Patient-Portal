import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/user/model/user.model';
import { MedicationFormDetails } from '../model/medication-form-details';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// to handle post request for medicatio & Allegies
export class FetchpostService {
  api = 'http://localhost:3000/medication-and-allergies';
  constructor(private httpClient: HttpClient) {}
  createMedicationAndAllergies(data: any): Observable<any> {
    return this.httpClient.post(this.api, data);
  }
  getMedicationData(): Observable<any> {
    return this.httpClient.get(this.api);
  }
  deleteMedicationData(pid: any): Observable<any> {
    return this.httpClient.delete(this.api + '/' + pid);
  }
  viewMedicationData(pid: 6): Observable<any> {
    return this.httpClient.get(this.api + '/' + pid);
  }
  updateMedicationData(pid: any, data: any): Observable<any> {
    return this.httpClient.put(this.api + '/' + pid, data);
  }
}
