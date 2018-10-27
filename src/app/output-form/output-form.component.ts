import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { IUser } from '../../../models/IUser';
import * as moment  from 'moment';

@Component({
  selector: 'app-output-form',
  templateUrl: './output-form.component.html',
  styleUrls: ['./output-form.component.scss']
})
export class OutputFormComponent implements OnInit {
  formValue: IUser;

  constructor(private user: UsersService) { }

  ngOnInit() {
    this.user.subject.subscribe((value: IUser) => {
      this.formValue = value;
      if (value.id) {
        const dateOfNextNotif = moment(value.dateOfNextNotif).utcOffset('+04:00').format('DD-MMM-YY');
        this.formValue.dateOfBirth = moment(value.dateOfBirth).utcOffset('+04:00').format('YYYY/MM/DD');
        this.formValue.dateOfFirstLogin = moment(value.dateOfFirstLogin).utcOffset('+04:00').format('DD MMMM YYYY');
        this.formValue.dateOfNextNotif = dateOfNextNotif !== 'Invalid date' ? dateOfNextNotif: value.dateOfNextNotif;
      }
    });
  }

}
