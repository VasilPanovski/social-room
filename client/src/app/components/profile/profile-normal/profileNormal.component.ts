import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { NotificationService } from '../../../services/notification.service';
import { ChatService } from '../../chat/chat.service';
import { Constants } from '../../../constants/constants'

const AuthToken: string = Constants.authToken;

@Component({
    templateUrl: './profileNormal.component.html',
    styleUrls: ['./profileNormal.component.css']

})

export class ProfileNormalComponent implements OnInit {
    public contentLoaded = false;

    private userToShow;
    private mainImage: string;
    private showPopup : boolean = false;
    private doNotshowUserActions: boolean;
    private logUser: any; 
    private viewedUserId;
    public success: string;
    public error: boolean;

    changeImage(image): void {
        this.mainImage = image;
    }

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        public chatService: ChatService,
        private notificationService: NotificationService,
        public router: Router
    ) { }
    

    public ngOnInit(): void {
        this.logUser = this.userService.loggedUser;
        let token = localStorage.getItem(AuthToken);
        let userId: string = (<any>this.route.params)._value.id; 
        console.log(userId)
        this.userService.getUserData(userId)
        .subscribe(x => {
            this.userToShow = x;
            this.mainImage = this.userToShow.profilePicUrl;
            this.contentLoaded = true; 
            console.log(x)
            if(this.logUser){
                this.doNotshowUserActions = this.checkIfProfileIsLogedUser(this.logUser.id,this.userToShow._id )
            }            
             
        },
        (error) => {
            console.log(error);
            this.contentLoaded = true;

        });
        
        //Check for user if page is refreshed
		if (token && !this.logUser) {
			this.userService
				.getLoggedUser()
				.subscribe((x) => {
					this.userService.loggedUser = x.user;
                    this.logUser = this.userService.loggedUser;  
                    this.doNotshowUserActions = this.checkIfProfileIsLogedUser(this.logUser.id,this.userToShow._id )
				},
				(err) => {
					localStorage.removeItem(AuthToken); 
				}); 
		}
    }

    public checkIfProfileIsLogedUser (logUserId, userToShowId) { 
        if(logUserId == userToShowId) { 
            return true;
        } else { 
            return false;
        }
    }

    public inviteToChat(id) {
        var inviteToChatParams = {
          sender: this.logUser.id,
          receiver: id
        };

        this.chatService.inviteToChat(inviteToChatParams)
          .subscribe((res: any) => {
              console.log(res)
            var params = {
              user: this.viewedUserId,
              notificationTitle: 'New chat invitation',
              notificationText: this.userService.loggedUser.username + ' invited you to a chat',
              senderId: this.logUser.id,
              chatId: res.body.result['_id']
            };
            this.notificationService.sendNotification(params);
    
            this.router.navigate(['/chat/' + res.body.result['_id']]);
    
            this.notificationService.saveNotification(params)
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
}
