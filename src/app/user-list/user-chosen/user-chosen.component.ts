import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from 'models/User';
import { faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../../users.service';
import { PopupService } from 'src/app/popup/popup.service';

@Component({
  selector: 'app-user-chosen',
  templateUrl: './user-chosen.component.html',
  styleUrls: ['./user-chosen.component.scss']
})
export class UserChosenComponent implements OnInit {
  @Input() user: User;
  faCaretDown: IconDefinition = faCaretDown;
  expand: boolean;
  @Output('expand') expandEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() edit: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private usersService: UsersService,
    private popup: PopupService
  ) {}

  ngOnInit() {
    this.expand = false;
    this.expandEvent.emit(this.expand);
  }

  expandList() {
    this.expand = !this.expand;
    this.expandEvent.emit(this.expand);
  }

  deleteUser() {
    this.usersService.deleteUser(this.user.id).subscribe(
      () => {
        this.user = null;
        this.popup.show();
        this.delete.emit();
      },
      () => alert('unknown error')
    );
  }

  editUser() {
    this.edit.emit(this.user);
  }

  addUser() {
    this.edit.emit({} as User);
  }

}
