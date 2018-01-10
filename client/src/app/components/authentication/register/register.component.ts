import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { FileUploader } from 'ng2-file-upload';

import { Router } from '@angular/router';

import { Constants } from '../../../constants/constants';


@Component({
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
    public userId: string;
    public userEmail: string;
    public userToRegister: FormGroup;
    public error: boolean = false;
    public errorMessage: string;
    public isError: boolean = false;

    constructor(public fb: FormBuilder,
        public authService: AuthenticationService,
        public router: Router) {

    }

    ngOnInit() {
        this.userToRegister = this.fb.group({
            'username': ['', Validators.required],
            'email': ['', Validators.required],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'confirmedPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });
    }

    register(file): void {
        this.authService
            .register(this.userToRegister.value)
            .subscribe((res: any) => {
                this.userId = res.body['id'];
                this.userEmail = res.body['email'];
                this.router.navigate(['/home']);
              },
            (err: any) => {
                let notificationMsg = JSON.parse(err._body).message;
                this.error = true
                this.errorMessage = notificationMsg;
                setTimeout(() => {
                    this.error = false;

                }, 5000);
            });
    }

}
