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
  api = '/medication-and-allergies/';
  constructor(private httpClient: HttpClient) {}
  createMedicationAndAllergies(
    medicationData: MedicationFormDetails
  ): Observable<any> {
    return this.httpClient.post(this.api, medicationData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
