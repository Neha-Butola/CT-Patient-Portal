import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/user/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchuserdataService {
  api = 'http://localhost:3000/users';
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getUsersData(): Observable<any> {
    let userId;
    userId = this.authService.userData.id;
    if (this.authService.userData.role == 'Admin') {
      return this.httpClient.get(this.api);
    } else {
      console.log('error');
    }
    return this.getUsersData();
  }
  chnageUserStatus(pid: any, status: any): Observable<any> {
    let userId;
    userId = this.authService.userData.id;
    return this.httpClient.put(
      this.api + '/' + pid + '?' + 'userId' + '=' + userId + '/' + pid,
      status
    );
  }
}
