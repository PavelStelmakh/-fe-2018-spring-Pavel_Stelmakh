import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { InvalidInputComponent } from './invalid-input/invalid-input.component';
import { OutputFormComponent } from './output-form/output-form.component';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { BASE_URL } from './url.service';
import { AuthService } from './auth/auth.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuard } from './auth/auth.guard';
import { SpinnerDirective } from './spinner.directive';
import { HttpLoaderFactory } from './shared/HttpLoaderFactory';
import { PopupModule } from './popup/popup.module';


const route: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    InvalidInputComponent,
    OutputFormComponent,
    UserDetailsComponent,
    SpinnerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    HttpClientModule,
    RouterModule.forRoot(route),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, BASE_URL]
      },
    }),
    PopupModule
  ],
  providers: [
    {provide: BASE_URL, useValue: 'http://localhost:3000'},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
