import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usernameValidator, userageValidator, dateValidator, checkExistNameValidator } from '../../validators';
import { UsersService } from '../../users.service';
import { User } from '../../../../models/User';
import { PopupService } from '../../popup/popup.service';
import * as moment  from 'moment';
import { Store, select } from '@ngrx/store';
import * as usersAction from '../../actions/users.action';
import * as usersReducer from '../../reducers/users.reducer';
import * as profileAction from '../../actions/profile.action';
import * as profileReducer from '../../reducers/profile.reduser';

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
    private popup: PopupService,
    private storeUsers: Store<usersReducer.State>,
    private storeProfile: Store<profileReducer.State>
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
      this.storeProfile.pipe(select(profileReducer.getProfileUser)).subscribe((value: User) => this.setFormValue(value));
    } else {
      this.storeUsers.pipe(select(usersReducer.getSelectedUser)).subscribe((value: User) => this.setFormValue(value));
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
    const value: User = this.userForm.value;
    if (!this.isCreateNewUser) {
      value.id = this.id;
      this.popup.show();
      if (!this.isEditUser) {
        this.update.emit(0);
        this.storeProfile.dispatch(new profileAction.EditProfileAction(value));
      } else {
        this.update.emit(1);
        this.storeUsers.dispatch(new usersAction.EditUserAction(value));
      } 
    } else {
      this.storeUsers.dispatch(new usersAction.AddUserAction(value));
      this.popup.show();
      this.update.emit(1); 
    }
  }

  setFormValue(value: User) {
    if (value) {
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
