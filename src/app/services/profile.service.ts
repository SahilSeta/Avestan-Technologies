import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService : ApiService) {

   }
   getProfiles(): Observable<any> {
    return this.apiService.get('/profile/all' )
    .pipe(
      map(response => {
        return response;
      })
    );
  }
  getProfileById(productID: any): Observable<any> {
    return this.apiService.get(`/profile/view/${productID}` )
    .pipe(
      map(response => {
        return response;
      })
    );
  }
  updateProfile(deleteid: any, data : any): Observable<any> {
    return this.apiService.put(`/profile/update/${deleteid}`, data)
    .pipe(
      map(response => {
        return response;
      })
    );
  }
  deleteProfile(deleteid: any): Observable<any> {
    return this.apiService.delete(`/profile/delete/${deleteid}`)
    .pipe(
      map(response => {
        return response;
      })
    );
  }
}
