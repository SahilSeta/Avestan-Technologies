import { Injectable } from '@angular/core';
//import { Headers, Http, Response, URLSearchParams } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams    } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';

import { Router } from '@angular/router';

import { catchError, map } from 'rxjs/operators';
import { JwtService } from './jwt.service';


@Injectable()
export class ApiService {
   API_URL: String = 'http://localhost:4500';

  headers = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private router: Router, private jwtService : JwtService
  ) {

  }

  private setHeaders(): HttpHeaders {
    const headersConfig : any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `${this.jwtService.getToken()}`;
    }
    console.log(headersConfig['Authorization']);
    return new HttpHeaders(headersConfig);
  }
  private setplainHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    return new HttpHeaders(headersConfig);
  }

  get(path: string, params: HttpParams = new HttpParams({})): Observable<any> {
    return this.http.get(`${this.API_URL}${path}`, { headers: this.setHeaders(), params })
      .pipe(catchError( errorRes => {
        console.log(errorRes);
        return throwError(errorRes);
      })
    );
  }
  put(path: string, body : any): Observable<any> {
    return this.http.put(
      `${this.API_URL}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .pipe(
      map(res => { return res; }),
      catchError(( error )=> {
        return throwError(error);
      })
    );
  }
  post(path: string, body : any): Observable<any> {
    return this.http.post(
      `${this.API_URL}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .pipe(catchError( errorRes => {
      return throwError(errorRes);
    }));
  }
  patch(path: string): Observable<any> {
    return this.http.patch(
      `${this.API_URL}${path}`,
      null,
      { headers: this.setHeaders() }
    )
  }
  delete(path : string): Observable<any> {
    return this.http.delete(
      `${this.API_URL}${path}`,
      { headers: this.setHeaders() }
    )
  }
}
