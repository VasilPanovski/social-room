import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Constants } from '../../../constants/constants'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

import { CloudinaryImageComponent } from 'ng2-cloudinary';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

const AuthToken: string = Constants.authToken;

@Component({
	templateUrl: './profile-settings.component.html',
	styleUrls: ['./profile-settings.component.css']
})

export class ProfileSettingsComponent implements OnInit {

	public hasBaseDropZoneOver: boolean = false;

	public user: any;
	public errorMessage: string;
	public isError: boolean = false;

	public userSettingsToUpdate: FormGroup;

	public genders = Constants.genders;
	public birthDate: Date;
	public imageUrl: string;
	public imageUploading: boolean = false;
	public showImageUploader: boolean = false;
	public uploader: CloudinaryUploader = new CloudinaryUploader(
		new CloudinaryOptions({ cloudName: Constants.cloudinaryCloudName, uploadPreset: Constants.cloudinaryUploadPreset })
	);

	constructor(public userService: UserService, public fb: FormBuilder, public router: Router, public authService: AuthenticationService) {
		this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: any): any => {
		
			let res: any = JSON.parse(response);
			
			if (res.url) {
				this.imageUrl = res.url;
				this.imageUploading = false;
			}
			else {
				this.imageUploading = false;
				this.isError = true;
				this.errorMessage = 'Image upload failed, please try again and if problem persist, contact admin';
				console.log('error in image uploading');
			}

			return { item, response, status, headers };
		};

	}

	public ngOnInit(): void {

		this.user = this.userService.loggedUser;
		this.userSettingsToUpdate = this.fb.group({
			'username': this.user.username,
			'email': this.user.email,
			'gender': this.user.gender,
			'dateOfBirth': this.user.dateOfBirth,
			'location': this.user.location,
			'profilePicUrl': this.user.profilPicUrl,
			'newPassword': ['', Validators.minLength(4)],
			'confirmedPassword': ['', Validators.minLength(4)]
		});
		
		if (this.user) {
			this.imageUrl = this.user.profilPicUrl;

			this.userSettingsToUpdate = this.fb.group({
				'username': this.user.username,
				'email': this.user.email,
				'gender': this.user.gender,
				'dateOfBirth': this.user.dateOfBirth,
				'location': this.user.location,
				'profilePicUrl': this.user.profilPicUrl,
				'newPassword': ['', Validators.minLength(4)],
				'confirmedPassword': ['', Validators.minLength(4)]
			});
		}

		//Check for user if page is refreshed
		if (!this.user) {
			this.userService
				.getLoggedUser()
				.subscribe((x) => {
					this.userService.loggedUser = x.user;
					this.user = this.userService.loggedUser;
					 console.log(this.user)

					if (this.user) {
						this.imageUrl = this.user.profilPicUrl;
						// console.log(this.additionalImages)

						this.userSettingsToUpdate = this.fb.group({
							'username': this.user.username,
							'email': this.user.email,
							'gender': this.user.gender,
							'dateOfBirth': this.user.dateOfBirth,
							'location': this.user.location,
							'profilePicUrl': this.user.profilPicUrl,
							'newPassword': ['', Validators.minLength(4)],
							'confirmedPassword': ['', Validators.minLength(4)]
						});
					}
				},
				(err) => {
					localStorage.removeItem(AuthToken);

				});
		}
	}

	updateSettings() {
		let form = this.userSettingsToUpdate.value;
		console.log(form)
		this.userService.updateSettings(this.user.id, form)
			.subscribe((response) => {
				this.isError = false;
				this.userService.getLoggedUser()
					.subscribe((x) => {
						this.userService.loggedUser = x.user;
						this.userSettingsToUpdate.reset();

						this.router.navigate(['/home']);
					},
					(err) => {
						localStorage.removeItem(AuthToken);

						this.userSettingsToUpdate.reset();

						this.router.navigate(['/home']);
						console.log('Error in user service');
					});
			},
			(error) => {
				this.errorMessage = error.json().message;
				this.isError = true;
				setTimeout(() => {
					this.isError = false;

				}, 3500);
			});
	}

	upload() {
		this.uploader.uploadAll();
		this.imageUploading = true;
		this.isError = false;
		this.errorMessage = '';
	}

	toggleImageUploader() {
		if (this.showImageUploader === false) {
			this.showImageUploader = true;
		}
		else {
			this.showImageUploader = false;
		}
	}
}
