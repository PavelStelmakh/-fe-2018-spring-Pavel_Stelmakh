import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SignIn } from 'models/SignIn';
import { checkExistNameValidator } from '../validators/checkExistName-validator';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  wrongData: boolean;

  constructor(
    private builder: FormBuilder, 
    private auth: AuthService,
    private router: Router,
    private usersService: UsersService
    ) {}

  ngOnInit() {
    this.wrongData = false;
    this.loginForm = this.builder.group({
      login: ['', Validators.required, checkExistNameValidator(this.usersService, true)],
      password: ['', Validators.required]
    });
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    const data: SignIn = {
      login: this.login.value,
      password: this.password.value
    };
    this.auth.signIn(data).subscribe(result => {
      if (result.status === 200) {        
        this.router.navigate(['/details']);
      }
    },
    error => {
      this.loginForm.reset();
      this.wrongData = true;
    });
    
  }

}
