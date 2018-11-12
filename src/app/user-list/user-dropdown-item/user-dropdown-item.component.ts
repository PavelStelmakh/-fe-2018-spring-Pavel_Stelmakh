import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../models/User';
import * as moment  from 'moment';

@Component({
  selector: 'app-user-dropdown-item',
  templateUrl: './user-dropdown-item.component.html',
  styleUrls: ['./user-dropdown-item.component.scss']
})
export class UserDropdownItemComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
    const dateOfNextNotif = moment(this.user.dateOfNextNotif).utcOffset('+04:00').format('DD-MMM-YY');
    this.user.dateOfBirth = moment(this.user.dateOfBirth).utcOffset('+04:00').format('YYYY/MM/DD');
    this.user.dateOfFirstLogin = moment(this.user.dateOfFirstLogin).utcOffset('+04:00').format('DD MMMM YYYY');
    this.user.dateOfNextNotif = dateOfNextNotif !== 'Invalid date' ? dateOfNextNotif: this.user.dateOfNextNotif;
  }

}
