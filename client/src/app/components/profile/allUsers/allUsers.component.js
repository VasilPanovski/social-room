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
var AllUsersComponent = (function () {
    function AllUsersComponent(userService) {
        this.userService = userService;
        this.selectedAthleteType = 'pro';
        this.isPro = true;
        this.isAmateur = false;
        this.athletes = [];
        this.proAthletes = [];
        this.amateurAthletes = [];
    }
    AllUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getAllUsers()
            .subscribe(function (athletes) {
            athletes.forEach(function (athlete) {
                if (athlete.roles.indexOf('pro') < 0) {
                    _this.amateurAthletes.push(athlete);
                }
                else {
                    _this.proAthletes.push(athlete);
                }
            });
            _this.athletes = _this.proAthletes;
        });
        // this.selectedAthleteType = 'pro';
    };
    AllUsersComponent.prototype.ngAfterViewInit = function () {
    };
    AllUsersComponent.prototype.changeAtlheteType = function (event, athleteType) {
        event.stopPropagation();
        this.selectedAthleteType = athleteType;
        if (athleteType === 'pro') {
            this.athletes = this.proAthletes;
            this.isPro = true;
            this.isAmateur = false;
        }
        else if (athleteType === 'amateur') {
            this.athletes = this.amateurAthletes;
            this.isPro = false;
            this.isAmateur = true;
        }
    };
    return AllUsersComponent;
}());
AllUsersComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/profile/allUsers/allUsers.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AllUsersComponent);
exports.AllUsersComponent = AllUsersComponent;
//# sourceMappingURL=allUsers.component.js.map