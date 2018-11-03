import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { UserChosenComponent } from './user-chosen/user-chosen.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../shared/HttpLoaderFactory';
import { HoverDirective } from './hover.directive';
import { UserDropdownListComponent } from './user-dropdown-list/user-dropdown-list.component';
import { UserDropdownItemComponent } from './user-dropdown-item/user-dropdown-item.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    UserListComponent, 
    UserChosenComponent,
    HoverDirective,
    UserDropdownListComponent,
    UserDropdownItemComponent
  ],
  providers: [
  ],
  exports: [UserListComponent]
})
export class UserListModule { }
