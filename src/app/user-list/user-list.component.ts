import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { User } from '../../../models/User';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { skip } from 'rxjs/operators';
import * as usersAction from '../actions/users.action';
import * as usersReducer from '../reducers/users.reducer';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  username: FormControl;
  faSearch: IconDefinition = faSearch;
  users: User[];
  expand: boolean;
  focus: boolean;
  notFound: boolean;
  updateListUsers: boolean;

  constructor(private store: Store<usersReducer.State>) {}

  ngOnInit() {
    this.users = [];
    this.updateListUsers = true;
    this.username = new FormControl('');
    this.focus = false;
    this.store.pipe(select(usersReducer.getUsersArray), skip(1)).subscribe(
      (users: User[]) => {
        if (this.users.length !== users.length) {
          this.updateListUsers = true;
        }
        this.users = users;
        if (users.length === 0) {
          this.notFound = true;
        } 
      }
    );
  }

  selectUser(user: User) {
    this.store.dispatch(new usersAction.SelectUserAction(user.id));
    this.focus = false;
  }

  focusInput() {
    this.notFound = false;
    this.focus = true;
    if(this.updateListUsers) {
      this.users = [];
      this.store.dispatch(new usersAction.LoadUsersAction('all'));
      this.updateListUsers = false;
    }
  }

  expandList(expand: boolean) {
    this.focus = false;
    this.expand = expand;
    this.username.setValue('');
  }

  searchUsers() {
    this.store.dispatch(new usersAction.LoadUsersAction(this.username.value));
  }

  updateUsers() {
    this.username.setValue('');
    this.users = [];
  }

  editUser() {
    this.edit.emit();
  }

}
