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
              let user = this.userService.loggedUser;
              this.people = people;
 
              for(let peopleItem of this.people) {
                  if(peopleItem.gender == "Male") {
                    this.maleUsers.push(peopleItem);
                  } else if (peopleItem.gender == "Female") {
                    this.femaleUsers.push(peopleItem);
                  } 
              }
            });
    }
}
