import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/User';
import * as moment  from 'moment';
import { Store, select } from '@ngrx/store';
import * as profileReducer from '../../reducers/profile.reduser';

@Component({
  selector: 'app-output-form',
  templateUrl: './output-form.component.html',
  styleUrls: ['./output-form.component.scss']
})
export class OutputFormComponent implements OnInit {
  formValue: User;

  constructor(private store: Store<profileReducer.State>) { }

  ngOnInit() {
    this.store.pipe(select(profileReducer.getProfileUser)).subscribe((value: User) => {
      this.formValue = value || {} as User;
      if (value) {
        const dateOfNextNotif = moment(value.dateOfNextNotif).utcOffset('+04:00').format('DD-MMM-YY');
        this.formValue.dateOfBirth = moment(value.dateOfBirth).utcOffset('+04:00').format('YYYY/MM/DD');
        this.formValue.dateOfFirstLogin = moment(value.dateOfFirstLogin).utcOffset('+04:00').format('DD MMMM YYYY');
        this.formValue.dateOfNextNotif = dateOfNextNotif !== 'Invalid date' ? dateOfNextNotif: value.dateOfNextNotif;
      }
    });
  }

}
