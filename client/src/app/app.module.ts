import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'
import { SharedModule } from './components/shared/shared.module';
import { Ng2CloudinaryModule } from '../../node_modules/ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileNormalComponent } from './components/profile/profile-normal/profileNormal.component';
import { ProfileSettingsComponent } from './components/profile/profile-settings/profile-settings.component';
import { AllUsersComponent } from './components/profile/allUsers/allUsers.component';
import { ChatComponent } from './components/chat/chat.component';
import { AllChatsTemplateComponent } from './components/chat/allChats/allChats.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileNormalComponent,
    ProfileSettingsComponent,
    AllUsersComponent,
    ChatComponent,
    AllChatsTemplateComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    SharedModule,
    Ng2CloudinaryModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
