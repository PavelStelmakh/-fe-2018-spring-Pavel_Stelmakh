import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'models/User';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  username: FormControl;
  faSearch: IconDefinition = faSearch;
  user: User;
  users: User[];
  expand: boolean;
  focus: boolean;
  notFound: boolean;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.username = new FormControl('');
    this.focus = false;
  }

  selectUser(user: User) {
    this.user = user;
    this.focus = false;
  }

  focusInput() {
    this.notFound = false;
    this.users = [];
    this.focus = true;
    this.usersService.search('all').subscribe((users: User[]) => this.users = users);
  }

  expandList(expand: boolean) {
    this.expand = expand;
    this.username.setValue('');
  }

  searchUsers() {
    this.usersService.search(this.username.value).subscribe(
      (users: User[]) => this.users = users,
      () => {
        this.notFound = true;
        this.users = [];
      }
    );
  }

  updateUsers() {
    this.username.setValue('');
    this.usersService.search('all').subscribe((users: User[]) => this.users = users);
  }

  editUser(user: User) {
    this.usersService.userEditSubject.next(user);
    this.edit.emit();
  }

}
