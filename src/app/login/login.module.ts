import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoveryLoginComponent } from '../recovery-login/recovery-login.component';
import { AuthGuard } from '../auth/auth.guard';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../shared/HttpLoaderFactory';

const route: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login/recovery',
    component: RecoveryLoginComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(route),
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
})
  ],
  declarations: [LoginComponent, RecoveryLoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
