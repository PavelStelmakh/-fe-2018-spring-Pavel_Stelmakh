import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './url.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from '../../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {
  private id: number;
  readonly subject: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({} as IUser);
  readonly spinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, @Inject(BASE_URL) private url: string) { }

  setId(id: number) {
    this.id = id;
  }

  getUser() {
    this.subject.next({} as IUser);
    this.spinner.next(true);
    this.http.get(this.url + `/users/${this.id}`, {
      observe: 'response',
      withCredentials: true
    }).subscribe(result => {
      this.spinner.next(false);
      this.subject.next(result.body as IUser);
    });
  }

  logout() {
    this.subject.next({} as IUser);
  }

  checkExistName(name: string) {
    return this.http.get(this.url + `/login/find/${name}`, {
      observe: 'response',
      withCredentials: true
    });
  }

  update(data: IUser) {
    return this.http.put(this.url + `/users/${this.id}`, data, {
      observe: 'response',
      withCredentials: true
    })
    .pipe(
      tap((response) => {
        if (response.status === 200) {
          this.subject.next(data);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subject.complete();
    this.spinner.complete();
  }

}
