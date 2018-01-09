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
      } else if (filter == 'm') { 
        this.peopleToShow = this.male;
      } else if (filter == 'f') { 
        this.peopleToShow = this.female;
      } else if (filter == 'other') { 
        this.peopleToShow = this.other;
      }

      this.filterName = filter;
    } 
    public openUserProfile() {
      console.log('profile');
    }

    

    public inviteToChat(id) {
      var inviteToChatParams = {
        sender: this.userService.loggedUser.id,
        receiver: id
      };

      this.chatService.inviteToChat(inviteToChatParams)
        .subscribe((res: any) => {
          var params = {
              user: id,
              notificationTitle: 'New chat invite',
              notificationText: 'Someone invited you to a chat',
              senderId: res.body.result['_id'],
              chatId: res.body.result['_id']
            };
            this._notificationService.sendNotification(params);

            this.router.navigate(['/chat/' + res.body.result['_id']]);

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
        });

    }

    ngOnInit(): void {
      console.log('blaa')
    }

}
