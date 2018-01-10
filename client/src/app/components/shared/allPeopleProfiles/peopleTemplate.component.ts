import { Component, Input, OnInit  } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { IathletePreview } from '../../profile/allUsers/IAthletePreview';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ChatService } from '../../chat/chat.service';
import { FilterdataPipe } from './peopleFilter.pipe';

@Component({
    selector: 'people-template',
    templateUrl: './peopleTemplate.component.html',
    styleUrls: ['./peopleTemplate.component.css']
})
export class PeopleTemplateComponent implements OnInit {

  public filterName: string = 'all';

  @Input() public people: IathletePreview[] = [];
  @Input() public male: IathletePreview[] = [];
  @Input() public female: IathletePreview[] = [];
  @Input() public other: IathletePreview[] = [];

  @Input() public peopleToShow:any;

    public success: string;
    public error: boolean;

    constructor(public userService: UserService,
                public chatService: ChatService,
                public router: Router,
                private _notificationService: NotificationService) { }

    changeFilter(filter) { 
      if(filter == 'all') {
        this.peopleToShow = this.people;
      } else if (filter == 'Male') { 
        this.peopleToShow = this.male;
      } else if (filter == 'Female') { 
        this.peopleToShow = this.female;
      }

      this.filterName = filter;
    } 
    public openUserProfile() {
      console.log('profile');
    }

    public inviteToChat(id) {
      let senderId = Number(this.userService.loggedUser.id);
      let receiverId = Number(id);

      var inviteToChatParams = {
        sender: senderId,
        receiver: receiverId
      };

      console.log(inviteToChatParams)
      
      this.chatService.inviteToChat(inviteToChatParams)
        .subscribe((res: any) => {
          var params = {
              user: receiverId,
              notificationTitle: 'New chat invite',
              notificationText: 'Someone invited you to a chat',
              senderId: senderId,
              chatId: res.body['id']
            };
            this._notificationService.sendNotification(params);
            console.log(params)
            this.router.navigate(['/chat/' + res.body['id']]);

          this._notificationService.saveNotification(params)
            .subscribe((res: any) => {
                this.success = 'Done!';
              },
              (err: any) => {
                this.error = true;

                setTimeout(() => {
                  this.error = false;
                }, 3500);
              });
        });

    }

    ngOnInit(): void {
      
    }

}
