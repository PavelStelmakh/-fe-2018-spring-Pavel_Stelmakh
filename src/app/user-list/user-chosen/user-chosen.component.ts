import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { User } from 'models/User';
import { faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PopupService } from 'src/app/popup/popup.service';
import * as usersAction from '../../actions/users.action';
import * as usersReducer from '../../reducers/users.reducer';

@Component({
  selector: 'app-user-chosen',
  templateUrl: './user-chosen.component.html',
  styleUrls: ['./user-chosen.component.scss']
})
export class UserChosenComponent implements OnInit {
  user: User;
  faCaretDown: IconDefinition = faCaretDown;
  expand: boolean;
  @Output('expand') expandEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private popup: PopupService,
    private store: Store<usersReducer.State>
  ) {}

  ngOnInit() {
    this.expand = false;
    this.expandEvent.emit(this.expand);
    this.store.pipe(select(usersReducer.getSelectedUser)).subscribe((user: User) => this.user = user);
  }

  expandList() {
    this.expand = !this.expand;
    this.expandEvent.emit(this.expand);
  }

  deleteUser() {
    this.store.dispatch(new usersAction.DeleteUserAction(this.user.id));
    this.user = null;
    this.popup.show();
    this.delete.emit();
  }

  editUser() {    
    this.store.dispatch(new usersAction.SelectUserAction(this.user.id));
    this.edit.emit();
  }

  addUser() {
    this.store.dispatch(new usersAction.SelectUserAction(null));
    this.edit.emit();
  }

}
