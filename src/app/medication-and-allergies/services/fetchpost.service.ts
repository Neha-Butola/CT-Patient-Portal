import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// to handle post request for medicatio & Allegies
export class FetchpostService {
  api = 'http://localhost:3000/medication-and-allergies';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  createMedicationAndAllergies(data: any): Observable<any> {
    data.userId = this.authService.userData.id;
    return this.httpClient.post(this.api, data);
  }
  getMedicationData(): Observable<any> {
    let userId;
    userId = this.authService.userData.id;
    if (this.authService.userData.role == 'Patient') {
      return this.httpClient.get(this.api + '?' + 'userId' + '=' + userId);
    } else {
      return this.httpClient.get(this.api);
    }
    return this.getMedicationData();
  }
  deleteMedicationData(pid: any): Observable<any> {
    return this.httpClient.delete(this.api + '/' + pid);
  }
  viewMedicationData(pid: any): Observable<any> {
    return this.httpClient.get(this.api + '/' + pid);
  }
  updateMedicationData(pid: any, data: any): Observable<any> {
    let userId;
    userId = this.authService.userData.id;
    return this.httpClient.put(
      this.api + '/' + pid + '?' + 'userId' + '=' + userId + '/' + pid,
      data
    );
  }
}
