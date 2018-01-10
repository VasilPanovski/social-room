import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { NotificationsModule } from './notifications/notifications.module';

import { HttpHeadersService } from '../../services/http-headers.service';
import { UserService } from '../../services/user.service';
import { ChatService } from '../chat/chat.service';
import { NotificationService } from '../../services/notification.service';

import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { AuthenticationService } from '../../services/authentication.service';
import { PeopleTemplateComponent } from '../shared/allPeopleProfiles/peopleTemplate.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    NotificationsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    PeopleTemplateComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    PeopleTemplateComponent
  ],
  providers: [
    HttpHeadersService,
    UserService,
    AuthenticationService,
    NotificationService,
    ChatService
  ]
})
export class SharedModule { }
