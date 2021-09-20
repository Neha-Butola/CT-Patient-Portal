import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  api = environment.baseUrl + 'appointments';

  constructor(private http: HttpClient, private authService: AuthService) {}

  postAppointment(appointmentData): Observable<any> {
    appointmentData.userId = this.authService.userData.id;
    console.log(appointmentData.userId);
    return this.http.post(this.api, appointmentData);
  }

  getAppointments(): Observable<any> {
    return this.http.get(this.api);
  }

  deleteAppointments(data: any, appointmentid: number): Observable<any> {
    return this.http.delete(this.api + '/' + appointmentid, data);
  }
}
