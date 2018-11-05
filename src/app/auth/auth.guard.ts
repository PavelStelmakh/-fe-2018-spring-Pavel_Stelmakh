import { Injectable } from '@angular/core';
import { CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, take, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router
    ) {}

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
      const {path} = route;
      return this.authService.checkLogin().pipe(
        take(1),
        mergeMap(result => {
          if (result.status === 200) {
            if (result.body['role'] === 'admin') {
              if (path === 'admin') {
                return of(true);
              } else {
                this.router.navigate(['/admin']);
                return of(false);
              }
            } else {
              if (path === 'user') {
                return of(true);
              } else {
                this.router.navigate(['/user']);
                return of(false);
              }
            }
          }
        }),
        catchError(error => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkLogin().pipe(
      take(1),
      mergeMap(result => {
        if (result.status === 200) {
          switch (state.url) {
            case '/login':
            case '/login/recovery': 
              this.router.navigate([`/${result.body['role']}`]);
              return of(false);
            default: return of(true);
          }          
        }
      }),
      catchError(error => {
        switch (state.url) {
          case '/login':
          case '/login/recovery': 
            return of(true);
          default: 
            this.router.navigate(['/login']);
            return of(false);
        }
      })
    );
  }
}
