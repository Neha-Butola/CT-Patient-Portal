import { HttpClient } from '@angular/common/http';
import { Injectable, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';
import { environment } from 'src/environments/environment';
import { Appointment } from '../schedule-appointment/model/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  api = environment.baseUrl + 'appointments';
  apiUsers = environment.baseUrl + 'users';
  apiProviders = environment.baseUrl + 'providers';

  constructor(private http: HttpClient, private authService: AuthService) {}

  //post appointment for current user
  postAppointment(appointmentData: Appointment): Observable<any> {
    appointmentData.userId = this.authService.userData.id;
    appointmentData.id =
      appointmentData.title + Math.floor(Math.random() * 10) + 1;
    return this.http.post(this.api, appointmentData);
  }

  // get appointments according to user id
  getAppointments(): Observable<any> {
    let userId;
    userId = this.authService.userData.id;
    return this.http.get(this.api + '?' + 'userId' + '=' + userId);
  }

  // delete appointment
  deleteAppointments(data: any, appointmentId: string): Observable<any> {
    return this.http.delete(this.api + '/' + appointmentId, data);
  }

  // get medication list according to user id.
  getMedicationList(): Observable<any> {
    let userId;
    userId = this.authService.userData.id;
    return this.http.get(
      this.apiUsers + '/' + userId + '/' + 'medication-and-allergies'
    );
  }

  // get physician relted to medication
  getPhysicianList(): Observable<any> {
    return this.http.get(this.apiUsers + '?role = Physician');
  }

  // get physician relted to medication
  getProvidersList(title): Observable<any> {
    return this.http.get(
      this.apiProviders + '?' + 'treatments for' + '=' + title
    );
  }

  //post
  // postTreatment(): Observable<any> {
  //   let userId;
  //   userId = this.authService.userData.id;
  // }
}
