import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Store } from '@ngrx/store';
import * as profileReducer from '../reducers/profile.reduser';
import * as profileAction from '../actions/profile.action';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  select: number;
  isEditUsers: boolean;
  @Input() role: string;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private userService: UsersService,
    private store: Store<profileReducer.State>
    ) {}

  ngOnInit() {
    this.isEditUsers = false;
    this.select = 0;
    this.store.dispatch(new profileAction.LoadProfileAction());
  }

  logout() {
    this.auth.logout().subscribe(result => {
      if (result.status === 200) {
        this.userService.logout();
        this.store.dispatch(new profileAction.SetIdAction(null));
        this.router.navigate(['/login']);
      }
    },
    error => {
      alert('Неизвестная ошибка');
    });
  }

  onToggle(tab: number){
    this.isEditUsers = false;
    this.select = tab;
  }

}
