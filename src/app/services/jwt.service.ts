import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
@Injectable()
export class JwtService {
  private isactivated: BehaviorSubject<string> = new BehaviorSubject('');

   // method to read value of message field
   public readIsActivated(): Observable<string> {
    return this.isactivated.asObservable();
  }

  getToken(): String {
    return window.localStorage['avestan_auth_dev'];
  }
  saveToken(token: String) {
    window.localStorage['avestan_auth_dev'] = token;
  }
  destroyToken() {
    window.localStorage.removeItem('avestan_auth_dev');
  }
  // USER DATA
  getUser(): String {
    let data = window.localStorage['userData']
    return JSON.parse(data);
  }
  saveUser(data: any) {
     window.localStorage['userData'] = JSON.stringify(data);

    console.log("saved user data", window.localStorage['userData'])
  }
  destroyUser() {
    window.localStorage.removeItem('userData');
  }

}
