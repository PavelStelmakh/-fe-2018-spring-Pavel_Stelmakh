import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';

import { HttpLoaderFactory } from '../shared/HttpLoaderFactory';
import { UserListModule } from '../user-list/user-list.module';
import { OutputFormComponent } from './output-form/output-form.component';
import { TreeModule } from '../tree/tree.module';
import { UserDetailsComponent } from './user-details.component';
import { BASE_URL } from '../url.service';
import { UserFormComponent } from './user-form/user-form.component';
import { InvalidInputComponent } from './invalid-input/invalid-input.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as language from '../reducers/language.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, BASE_URL]
      },
      isolate: true
    }),
    UserListModule,
    TreeModule
  ],
  declarations: [
    UserFormComponent,
    InvalidInputComponent,
    UserDetailsComponent,
    OutputFormComponent,
  ],
  providers: [
    {provide: BASE_URL, useValue: 'http://localhost:3000'}
  ],
  exports: [
    UserDetailsComponent
  ]
})
export class UserDetailsModule {

  constructor(private translate: TranslateService, private store: Store<language.State>) {
    store.pipe(select(language.getLang)).subscribe((lang: string) => translate.use(lang));
  }

 }
