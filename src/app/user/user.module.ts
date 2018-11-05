import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from './user.component';
import { UserDetailsModule } from '../user-details/user-details.module';
import { AuthGuard } from '../auth/auth.guard';

const route: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    UserDetailsModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
