import { Component, OnInit } from '@angular/core';

import { IathletePreview } from './IAthletePreview';
import { UserService } from '../../../services/user.service';

@Component({
    templateUrl: './allUsers.component.html'
})
export class AllUsersComponent implements OnInit {
    public people: any[] = [];
    public maleUsers: any[] = [];
    public femaleUsers: any[] = [];
    public otherUsers: any[] = [];
    

    constructor(public userService: UserService) {}

    public ngOnInit(): void {
        this.userService.getAllUsers()
            .subscribe((people) => {
              var user = this.userService.loggedUser;
              this.people = people;
 
              for(let peopleItem of this.people) {
                  if(peopleItem.gender == "M") {
                    this.maleUsers.push(peopleItem);
                  } else if (peopleItem.gender == "F") {
                    this.femaleUsers.push(peopleItem);
                  } else if (peopleItem.gender == " ") {
                     this.otherUsers.push(peopleItem);
                  }
              }
            });
    }
}
