import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usernameValidator, userageValidator, dateValidator, checkExistNameValidator } from '../../validators';
import { UsersService } from '../../users.service';
import { User } from 'models/User';
import { PopupService } from '../../popup/popup.service';
import * as moment  from 'moment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  private id: number;
  @Output() update: EventEmitter<number> = new EventEmitter<number>();
  @Input('edit') isEditUser: boolean;
  private isCreateNewUser: boolean;

  constructor(
    private builder: FormBuilder, 
    private user: UsersService,
    private popup: PopupService
    ) {}

  ngOnInit() {
    this.isCreateNewUser = false;
    this.userForm = this.builder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, userageValidator()]],
      dateOfBirth: ['', [Validators.required, dateValidator('YYYY/MM/DD')]],
      dateOfFirstLogin: ['', [Validators.required, dateValidator('DD MMMM YYYY')]],
      information: ['', [Validators.required]],
      dateOfNextNotif: ['', [Validators.required, dateValidator('DD-MMM-YY')]]
    });
    if (!this.isEditUser) {
      this.user.userSubject.subscribe((value: User) => this.setFormValue(value));
    } else {
      this.user.userEditSubject.subscribe((value: User) => this.setFormValue(value));
    }
  }

  get name() {
    return this.userForm.get('name');
  }

  get password() {
    return this.userForm.get('password');
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
    if (!this.isCreateNewUser) { 
      this.user.update(this.userForm.value, this.id).subscribe(result => {
        if (result.status === 200) {
          this.popup.show();
          if (!this.isEditUser) {
            this.update.emit(0);
            this.user.getUser();
          } else {
            this.update.emit(1);
          }        
        }
      });
    } else {
      this.user.addUser(this.userForm.value).subscribe(result => {
        if (result.status === 200) {
          this.popup.show();
          this.update.emit(1);       
        }
      });
    }
  }

  setFormValue(value: User) {
    if (value.id) {
      this.isCreateNewUser = false;
      this.id = value.id;
      this.name.setAsyncValidators([usernameValidator(), checkExistNameValidator(this.user, false, this.id)]);
      const dateOfNextNotif = moment(value.dateOfNextNotif).format('DD-MMM-YY');
      this.userForm.patchValue({
        name: value.name,
        password: value.password,
        age: value.age,
        dateOfBirth: moment(value.dateOfBirth).format('YYYY/MM/DD'),
        dateOfFirstLogin: moment(value.dateOfFirstLogin).format('DD MMMM YYYY'),
        information: value.information,
        dateOfNextNotif: dateOfNextNotif !== 'Invalid date' ? dateOfNextNotif: value.dateOfNextNotif
      });
    } else {
      this.isCreateNewUser = true;
      this.name.setAsyncValidators([usernameValidator(), checkExistNameValidator(this.user, false)]);
    }
  }

}
