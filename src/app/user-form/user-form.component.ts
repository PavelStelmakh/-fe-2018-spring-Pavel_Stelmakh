import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usernameValidator, userageValidator, dateValidator, checkExistNameValidator } from '../validators';
import { UsersService } from '../users.service';
import { IUser } from '../../../models/IUser';
import { PopupService } from '../popup/popup.service';
import * as moment  from 'moment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  @Output() update: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private builder: FormBuilder, 
    private user: UsersService,
    private popup: PopupService
    ) {}

  ngOnInit() {
    this.userForm = this.builder.group({
      name: ['', Validators.required, [usernameValidator(), checkExistNameValidator(this.user)]],
      age: ['', [Validators.required, userageValidator()]],
      dateOfBirth: ['', [Validators.required, dateValidator('YYYY/MM/DD')]],
      dateOfFirstLogin: ['', [Validators.required, dateValidator('DD MMMM YYYY')]],
      information: ['', [Validators.required]],
      dateOfNextNotif: ['', [Validators.required, dateValidator('DD-MMM-YY')]]
    });
    this.user.subject.subscribe((value: IUser) => {
      if (value.id) {
        const dateOfNextNotif = moment(value.dateOfNextNotif).format('DD-MMM-YY');
        this.userForm.patchValue({
          name: value.name,
          age: value.age,
          dateOfBirth: moment(value.dateOfBirth).format('YYYY/MM/DD'),
          dateOfFirstLogin: moment(value.dateOfFirstLogin).format('DD MMMM YYYY'),
          information: value.information,
          dateOfNextNotif: dateOfNextNotif !== 'Invalid date' ? dateOfNextNotif: value.dateOfNextNotif
        });
      }
    });
  }

  get name() {
    return this.userForm.get('name');
  }

  get age() {
    return this.userForm.get('age');
  }

  get dateOfBirth() {
    return this.userForm.get('dateOfBirth');
  }

  get dateOfNextNotif() {
    return this.userForm.get('dateOfNextNotif');
  }

  get information() {
    return this.userForm.get('information');
  }

  get dateOfFirstLogin() {
    return this.userForm.get('dateOfFirstLogin');
  }

  onSubmit() {
    this.popup.show();
    this.user.update(this.userForm.value).subscribe(result => {
      if (result.status === 200) {
        this.update.emit();
        this.user.getUser();
      }
    });
  }

}
