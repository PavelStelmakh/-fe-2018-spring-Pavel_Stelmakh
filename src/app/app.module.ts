import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { InvalidInputComponent } from './invalid-input/invalid-input.component';
import { OutputFormComponent } from './output-form/output-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    InvalidInputComponent,
    OutputFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
