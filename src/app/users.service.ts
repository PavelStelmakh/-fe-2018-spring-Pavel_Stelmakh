import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './url.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from 'models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnDestroy {
  private id: number;
  readonly userSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  readonly userEditSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  readonly spinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, @Inject(BASE_URL) private url: string) { }

  setId(id: number) {
    this.id = id;
  }

  getUser() {
    this.userSubject.next({} as User);
    this.spinner.next(true);
    this.http.get(`${this.url}/users/${this.id}`, {
      observe: 'response',
      withCredentials: true
    }).subscribe(result => {
      this.spinner.next(false);
      this.userSubject.next(result.body as User);
    });
  }

  logout() {
    this.setId(0);
    this.userSubject.next({} as User);
  }

  checkExistName(name: string, id?: number) {
    const idUser: number = id || this.id || 0;
    return this.http.get(`${this.url}/login/find/${name}/${idUser}`, {
      observe: 'response',
      withCredentials: true
    });
  }

  update(data: User, id?: number) {
    const idUser: number = id || this.id;
    return this.http.put(`${this.url}/users/${idUser}`, data, {
      observe: 'response',
      withCredentials: true
    })
    .pipe(
      tap((response) => {
        if (response.status === 200 && id === this.id) {
          this.userSubject.next(data);
        }
      })
    );
  }

  addUser(data: User) {
    return this.http.post(`${this.url}/users/add`, data, {
      observe: 'response',
      withCredentials: true
    });
  }

  ngOnDestroy() {
    this.userSubject.complete();
    this.userEditSubject.complete();
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

  deleteUser(id: number) {
    return this.http.delete(`${this.url}/users/${id}`, {withCredentials: true});
  }

}
