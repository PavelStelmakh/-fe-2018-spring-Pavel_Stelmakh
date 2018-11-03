import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './url.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {
  private id: number;
  readonly subject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  readonly spinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, @Inject(BASE_URL) private url: string) { }

  setId(id: number) {
    this.id = id;
  }

  getUser() {
    this.subject.next({} as User);
    this.spinner.next(true);
    this.http.get(`${this.url}/users/${this.id}`, {
      observe: 'response',
      withCredentials: true
    }).subscribe(result => {
      this.spinner.next(false);
      this.subject.next(result.body as User);
    });
  }

  logout() {
    this.subject.next({} as User);
  }

  checkExistName(name: string) {
    return this.http.get(`${this.url}/login/find/${name}`, {
      observe: 'response',
      withCredentials: true
    });
  }

  update(data: User) {
    return this.http.put(`${this.url}/users/${this.id}`, data, {
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

  search(name: string): Observable<User[]> {
    this.spinner.next(true);
    return this.http.get<User[]>(`${this.url}/users/search/${name}`, {withCredentials: true})
    .pipe(
      tap(() => this.spinner.next(false)),
      catchError(err => {
        this.spinner.next(false);
        throw new Error;
        })
      );
  }

}
