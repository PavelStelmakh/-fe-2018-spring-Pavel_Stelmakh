import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Recovery } from 'models/Recovery';
import { dateValidator, checkExistNameValidator } from '../validators';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-recovery-login',
  templateUrl: './recovery-login.component.html',
  styleUrls: ['./recovery-login.component.scss']
})
export class RecoveryLoginComponent implements OnInit {
  recoveryForm: FormGroup;
  wrongData: boolean;

  constructor(
    private builder: FormBuilder, 
    private auth: AuthService, 
    private router: Router, 
    private usersService: UsersService
    ) {}

  ngOnInit() {
    this.wrongData = false;
    this.recoveryForm = this.builder.group({
      login: ['', Validators.required, checkExistNameValidator(this.usersService, true)],
      birthday: ['', [Validators.required, dateValidator('YYYY/MM/DD')]],
      password: ['', Validators.required]
    });
  }

  get login() {
    return this.recoveryForm.get('login');
  }

  get birthday() {
    return this.recoveryForm.get('birthday');
  }

  get password() {
    return this.recoveryForm.get('password');
  }

  onSubmit() {
    const data: Recovery = {
      login: this.login.value, 
      birthday: this.birthday.value, 
      password: this.password.value
    };
    this.auth.recovery(data).subscribe(result => {
      if (result.status === 200) {
        this.router.navigate(['/login']);
      }
    },
    error => {
      this.recoveryForm.reset();
      this.wrongData = true;
    });
    
  }

}
