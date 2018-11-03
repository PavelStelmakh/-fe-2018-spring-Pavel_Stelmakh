import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, take, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkLogin().pipe(
      take(1),
      mergeMap(result => {
        if (result.status === 200) {
          switch (state.url) {
            case '/login':
            case '/login/recovery': 
              this.router.navigate(['/details']);
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
