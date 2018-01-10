import { Component, ViewChild, ElementRef, Input } from '@angular/core';
// import { Inputs } from '../../forms/components/inputs';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';

import { OnInit, OnDestroy } from '@angular/core';

@Component({
	templateUrl: './notifications.component.html'
})

export class NotificationsComponent {
	public user: any;

	public error: boolean = false;
	public errorMessage: string;
	public notificationToSend: FormGroup;
	public success: string;
	public notifications = [];
	public connection;
	public notification;
	public users;

	constructor(public fb: FormBuilder,
		private _notificationService: NotificationService,
		public userService: UserService) {
	}

	ngOnInit() {
		this.user = this.userService.loggedUser;

		if (this.user) {
			this.connection = this._notificationService.getNotifications(this.user.id).subscribe(notification => {
				this.notifications.unshift(notification);
			});

		}
		else {
			console.log('No logged user, check why');
		}


		let now = new Date(Date.now());
		this.notificationToSend = this.fb.group({
			notificationTitle: ['', [Validators.required]],
			notificationText: ['', [Validators.required]],
			user: ['', [Validators.required]],
			createdAt: [now, [Validators.required]],
			seen: false

		});
	}

	ngOnDestroy() {
		if (this.connection) {
			console.log('destroy');
			this.connection.unsubscribe();


		}
	}

	public sendNotification() {
		var params = this.notificationToSend.value;
		console.log(params);
		this._notificationService.sendNotification(params);
		this.notification = '';
		this._notificationService.saveNotification(params)
			.subscribe((res: any) => {
				this.success = 'Done!';
			},
			(err: any) => {
				this.error = true;

				setTimeout(() => {
					this.error = false;
				}, 2500);
			});
	}




}
