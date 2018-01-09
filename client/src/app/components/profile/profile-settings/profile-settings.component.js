"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user-service");
var constants_1 = require("../../constants/constants");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var authentication_service_1 = require("../../services/authentication.service");
var ProfileSettingsComponent = (function () {
    function ProfileSettingsComponent(userService, fb, router, authService) {
        this.userService = userService;
        this.fb = fb;
        this.router = router;
        this.authService = authService;
        this.isError = false;
        this.genders = [
            { value: 'F', display: 'Female' },
            { value: 'M', display: 'Male' }
        ];
        this.birthDay = [
            { value: 1, display: '1' },
            { value: 2, display: '2' },
            { value: 3, display: '3' },
            { value: 4, display: '4' },
            { value: 5, display: '5' },
            { value: 6, display: '6' },
            { value: 7, display: '7' },
            { value: 8, display: '8' },
            { value: 9, display: '9' },
            { value: 10, display: '10' },
            { value: 11, display: '11' },
            { value: 12, display: '12' },
            { value: 13, display: '13' },
            { value: 14, display: '14' },
            { value: 15, display: '15' },
            { value: 16, display: '16' },
            { value: 17, display: '17' },
            { value: 18, display: '18' },
            { value: 19, display: '19' },
            { value: 20, display: '20' },
            { value: 21, display: '21' },
            { value: 22, display: '22' },
            { value: 23, display: '23' },
            { value: 24, display: '24' },
            { value: 25, display: '25' },
            { value: 26, display: '26' },
            { value: 27, display: '27' },
            { value: 28, display: '28' },
            { value: 29, display: '29' },
            { value: 30, display: '30' },
            { value: 31, display: '31' }
        ];
        this.birthMonth = [
            { value: 'Jan', display: 'January' },
            { value: 'Feb', display: 'February' },
            { value: 'Mar', display: 'March' },
            { value: 'Apr', display: 'April' },
            { value: 'May', display: 'May' },
            { value: 'Jun', display: 'June' },
            { value: 'Jul', display: 'July' },
            { value: 'Aug', display: 'August' },
            { value: 'Sep', display: 'September' },
            { value: 'Oct', display: 'October' },
            { value: 'Nov', display: 'November' },
            { value: 'Dec', display: 'December' }
        ];
        this.birthYear = [
            { value: 1990, display: '1990' },
            { value: 1991, display: '1991' }
        ];
        this.countries = constants_1.Constants.countries;
    }
    ProfileSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService
            .getLoggedUser()
            .toPromise()
            .then(function (x) {
            _this.user = x.user;
            console.log(_this.user);
            _this.userSettingsToUpdate = _this.fb.group({
                'newPassword': ['', forms_1.Validators.minLength(4)],
                'confirmedPassword': ['', forms_1.Validators.minLength(4)],
                'firstName': _this.user.firstName,
                'lastName': _this.user.lastName,
                'email': _this.user.email,
                'gender': [_this.user.gender, forms_1.Validators.required],
                'birthDay': _this.user.birthDate.day,
                'birthMonth': _this.user.birthDate.month,
                'birthYear': _this.user.birthDate.year,
                'country': _this.user.country,
                'bio': _this.user.bio
            });
        });
        this.userSettingsToUpdate = this.fb.group({
            'firstName': ['', forms_1.Validators.required],
            'lastName': ['', forms_1.Validators.required],
            'email': '',
            'gender': '',
            'birthDay': '',
            'birthMonth': '',
            'birthYear': '',
            'country': '',
            'bio': '',
            'newPassword': ['', forms_1.Validators.minLength(4)],
            'confirmedPassword': ['', forms_1.Validators.minLength(4)],
        });
    };
    ProfileSettingsComponent.prototype.updateSettings = function () {
        var _this = this;
        this.userService.updateSettings(this.user.id, this.userSettingsToUpdate.value)
            .subscribe(function (x) {
            if (x.status === 201) {
                _this.isError = false;
                _this.authService.logout();
                _this.router.navigate(['/login']);
                location.reload();
            }
            else if (x.status === 202) {
                _this.errorMessage = x.body.message;
                _this.isError = true;
            }
            else {
                //REDIRECT to error page
            }
        });
    };
    return ProfileSettingsComponent;
}());
ProfileSettingsComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/profile/profile-settings/profile-settings.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        forms_1.FormBuilder,
        router_1.Router,
        authentication_service_1.AuthenticationService])
], ProfileSettingsComponent);
exports.ProfileSettingsComponent = ProfileSettingsComponent;
//# sourceMappingURL=profile-settings.component.js.map