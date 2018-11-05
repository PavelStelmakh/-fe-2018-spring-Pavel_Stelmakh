import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from './admin.component';
import { UserDetailsModule } from '../user-details/user-details.module';
import { AuthGuard } from '../auth/auth.guard';

const route: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    UserDetailsModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
