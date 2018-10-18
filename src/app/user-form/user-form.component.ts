import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usernameValidator, userageValidator, dateValidator } from '../validators';
import { messageList } from '../shared/messageList';
import { IUserForm } from '../shared/IUserForm';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Output() submitForm: EventEmitter<IUserForm> = new EventEmitter<IUserForm>();
  userForm: FormGroup;
  messageList: object;

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.messageList = messageList;
    this.userForm = this.builder.group({
      username: ['', Validators.required, usernameValidator()],
      userage: ['', [Validators.required, userageValidator()]],
      birthday: ['', [Validators.required, dateValidator('YYYY/MM/DD')]],
      dateOfLogin: ['', [Validators.required, dateValidator('DD MMMM YYYY')]],
      DateOfNotification: ['', [Validators.required, dateValidator('DD-MMM-YY')]]
    });
  }

  get username() {
    return this.userForm.get('username');
  }

  get userage() {
    return this.userForm.get('userage');
  }

  get birthday() {
    return this.userForm.get('birthday');
  }

  get DateOfNotification() {
    return this.userForm.get('DateOfNotification');
  }

  get dateOfLogin() {
    return this.userForm.get('dateOfLogin');
  }

  onSubmit() {
    this.submitForm.emit(this.userForm.value);
  }

}
