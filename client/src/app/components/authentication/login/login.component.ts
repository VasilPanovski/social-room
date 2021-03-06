import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { NotificationService } from '../../../services/notification.service';
import { UserService } from '../../../services/user.service';

import { Constants } from '../../../constants/constants';

const AuthToken: string = Constants.authToken;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userToLogin: FormGroup;
  public error: boolean = false;
  public errorMessage: string;

  constructor(private fb: FormBuilder,
      private _authService: AuthenticationService,
      private _router: Router,
      public userService: UserService
  ) {
  }

  ngOnInit() {
      this.userToLogin = this.fb.group({
          'username': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
          'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      });
  }


  login(): void {
      this._authService.login(this.userToLogin.value)
          .subscribe((res: any) => {
              this.userService.getLoggedUser()
                  .subscribe((x) => {
                      this.userService.loggedUser = x.user;
                      console.log(x.user);
                      this._router.navigate(['/home']);

                  },
                  (error) => {
                      localStorage.removeItem(AuthToken);
                      this.userService.loggedUser = null;
                      this._router.navigate(['/home']);
                      console.log('Error in user service');

                  });
          },
          (err: any) => {
              let notificationMsg = JSON.parse(err._body).message;
              this.error = true;
              this.errorMessage = notificationMsg;
              setTimeout(() => {
                  this.error = false;

              }, 5000);
          });
  }

}
