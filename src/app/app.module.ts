import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { BASE_URL } from './url.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { HttpLoaderFactory } from './shared/HttpLoaderFactory';
import { PopupModule } from './popup/popup.module';
import { SpinnerDirective } from './spinner.directive';

const route: Routes = [
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'user'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SpinnerDirective  
  ],
  imports: [
    BrowserModule,    
    LoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(route),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, BASE_URL]
      },
      isolate: true
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
