import { Component, Input } from '@angular/core';
import { IUserForm } from '../shared/IUserForm';

@Component({
  selector: 'app-output-form',
  templateUrl: './output-form.component.html',
  styleUrls: ['./output-form.component.scss']
})
export class OutputFormComponent{
  @Input() formValue: IUserForm;

  constructor() { }

}
