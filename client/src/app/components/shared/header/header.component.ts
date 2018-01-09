import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { Constants } from '../../../constants/constants';

import 'rxjs/Rx';
import * as $ from 'jquery';

const AuthToken: string = Constants.authToken;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: any = null;
  public isPro: boolean = false;
  public profileDropdown: boolean = false;
  public notificationsDropdown: boolean = false;
  public notifications = [];
  public connection;
  public notification;
  public unread;

  constructor(public userService: UserService,
      public authService: AuthenticationService,
      public router: Router,
      private _notificationService: NotificationService) {

  }

  ngOnInit() {
      //Get logged user
      this.user = this.userService.loggedUser;
      console.log(this.user)
      if (this.user) {
          if (this.user.roles.indexOf("pro") >= 0) {
              this.isPro = true;
          }
          //Notifications

          this.notifications = this.userService.loggedUser.notifications;
          this.unread = this.notifications.filter(
              function (obj) {
                  return obj.seen == false;
              }
          ).length > 0;
          let userId = this.userService.loggedUser.id;
          this.connection = this._notificationService.getNotifications(userId).subscribe(notification => {
              this.notifications.unshift(notification);
              this.unread = true;
          });

      }
      
      let token = localStorage.getItem(AuthToken);
      if (token && !this.user) { 
          this.userService
              .getLoggedUser()
              .subscribe((x) => {
                  this.userService.loggedUser = x.user;

                  //Get logged user
                  this.user = this.userService.loggedUser;
                  if (this.user) {
                      if (this.user.authorities.includes("ROLE_USER") >= 0) {
                          this.isPro = true;
                      }
                      //Notifications

                      this.notifications = this.user.notifications;
                      this.unread = this.notifications.filter(
                          function (obj) {
                              return obj.seen == false;
                          }
                      ).length > 0;
                      let userId = this.user.id;
                      this.connection = this._notificationService.getNotifications(userId).subscribe(notification => {
                          this.notifications.unshift(notification);
                          this.unread = true;
                      });

                  }
              },
              (err) => {
                  //TODO Navigate to error page
                  localStorage.removeItem(AuthToken);

              });
      }
  }


//   ngAfterViewInit() {
//       var $win = $(window);
//       var $doc = $(document);
//       //=====================================================//
//       // fixed header
//       //=====================================================//

//       // var header = $('#header');
//       // var headerHeight = header.outerHeight();

//       // $win.on('load resize', function () {

//       //     if ($win.width() >= 1025) {
//       //         header.parent('.header-wrap').height(headerHeight);
//       //     } else {
//       //         header.parent('.header-wrap').height('auto');
//       //         $('.header-inner').removeAttr('style');
//       //         $('.btn-menu ').removeClass('open');
//       //     }
//       // });

//   }

  public logout() {
      this.authService.logout()
          .subscribe(() => {
              this.userService.loggedUser = undefined;
              this.user = undefined;
              this.toggleProfileDropdown();
              this.router.navigate(['/home']);
          });

      this.connection.unsubscribe();
  }

  public toggleProfileDropdown() {
      if (this.profileDropdown === false) {
          this.profileDropdown = true;
      }
      else {
          this.profileDropdown = false;
      }
  }

  public toggleNotifications() {
      if (this.notificationsDropdown === false) {
          this.notificationsDropdown = true;

      }
      else {
          this._notificationService.markNotificationsAsRead(this.userService.loggedUser.id)
              .subscribe((res: any) => {
                  this.unread = false;
                  this.notifications.forEach(x => x.seen = true);
              },
              (err: any) => {
              });
          this.notificationsDropdown = false;
      }

  }

//   public openMenuMore() {
//       $('.navigation-secondary').stop().slideToggle(400); 
//   }

}
