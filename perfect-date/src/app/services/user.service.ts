import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost/angular/perfect-date-api/api';

  constructor(private http: HttpClient) {
  }

  getAuthUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-auth-user`);
  }
  login(loginData: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }
  registration(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/registration`, user);
  }
  getToken(): string {
    return localStorage.getItem('access_token');
  }
  logout():Observable<any> {
   return this.http.get(`${this.baseUrl}/logout`);
  }

}
