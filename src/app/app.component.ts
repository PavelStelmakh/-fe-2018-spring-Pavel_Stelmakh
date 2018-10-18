import { Component } from '@angular/core';
import { IUserForm } from './shared/IUserForm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Please, fill in the fields';
  formValue: IUserForm;

  onSubmit(value: IUserForm) {
    this.formValue = value;
  }
}
