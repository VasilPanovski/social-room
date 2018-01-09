import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ChatService } from './../chat.service';

@Component({
  selector: 'allChats-template',
  templateUrl: './allChats.component.html'
})
export class AllChatsTemplateComponent {

  public success: string;
  public error: boolean;
  public user: any = null;
  public allChats: any = [];

  constructor(public userService: UserService,
              public chatService: ChatService,
              public router: Router) {
  }

  public ngOnInit(): void {
      this.userService
        .getLoggedUser()
        .subscribe((x) => {
            //Get logged user
            this.user = this.userService.loggedUser;

            this.getAllChats();
          },
          (err) => {
            console.log(err);
          });


    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        this.router.navigate([event['url']]);
        window.location.reload();
      });

  }

  public getAllChats() {
    this.chatService.getAllChats({
      userId: this.user.id
    })
      .subscribe((response) => {
          this.allChats = response.result;
        },
        (err) => {
          console.log(err);
        });
  }

  public deleteChat(chatId) {
    let params = {
      userId: this.user.id,
      chatId: chatId
    };
    this.chatService.deleteChat(params)
      .subscribe((response) => {
          window.location.reload();
          this.router.navigate(['/chat']);
      },
        (err) => {
      console.log(err);
        });
  }

}
