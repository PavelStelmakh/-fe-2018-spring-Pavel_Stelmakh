import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  selectFirst: boolean;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private userService: UsersService
    ) { }

  ngOnInit() {
    this.selectFirst = true;
    this.userService.getUser();
  }

  logout() {
    this.auth.logout().subscribe(result => {
      if (result.status === 200) {
        this.userService.logout();
        this.router.navigate(['/login']);
      }
    },
    error => {
      alert('Неизвестная ошибка');
    });
  }

  onToggle(event){
    if (!event.target.classList.contains('select')) {
      this.reverseSelect();
    } 
  }

  reverseSelect() {
    this.selectFirst = !this.selectFirst;
  }

}
