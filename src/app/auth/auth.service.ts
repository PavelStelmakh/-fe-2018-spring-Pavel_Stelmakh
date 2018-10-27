import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../url.service';
import { ISignIn } from '../../../models/ISignIn';
import { IRecovery } from '../../../models/IRecovery';
import { tap } from 'rxjs/operators';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    @Inject(BASE_URL) private url: string,
    private user: UsersService
    ) { }

  signIn(userData: ISignIn) {
    return this.http.post<ISignIn>(this.url + '/login', userData, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response',
      withCredentials: true
    });
  }

  recovery(userData: IRecovery) {
    return this.http.post<ISignIn>(this.url + '/login/recovery', userData, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
    });
  }

  checkLogin() {
    return this.http.get(this.url + '/login', {
      observe: 'response',
      withCredentials: true
    })
    .pipe(
      tap(result => {
        if (result.status === 200) {
          this.user.setId(+result.body['id']);
        }
      })
    );
  }

  logout() {
    return this.http.get(this.url + '/login/logout', {
      observe: 'response',
      withCredentials: true
    });
  }

}
