import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

import { HttpHeadersService } from '../../services/http-headers.service';
import { UserService } from '../../services/user.service';

import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { AuthenticationService } from '../../services/authentication.service';
//import { NotificationService } from '../services/notificationService';
//import { ChatService } from '../chat/chat.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    HttpHeadersService,
    UserService,
    AuthenticationService,
    //ChatService
  ]
})
export class SharedModule { }
