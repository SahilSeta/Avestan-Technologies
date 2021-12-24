import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService : ApiService) { }
  signUpProcess(data : any): Observable<any> {
    return this.apiService.post(`/auth/signup`, data)
    .pipe(
      map(response => {
        return response;
      })
    );
  }
  checkUser(data : any): Observable<any> {
    return this.apiService.post(`/auth/login`, data)
    .pipe(
      map(response => {
        return response;
      })
    );
  }
}
