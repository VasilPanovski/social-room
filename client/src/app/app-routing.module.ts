import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileNormalComponent } from './components/profile/profile-normal/profileNormal.component';
import { ProfileSettingsComponent } from './components/profile/profile-settings/profile-settings.component';
import { AllUsersComponent } from './components/profile/allUsers/allUsers.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile/edit', component: ProfileSettingsComponent },
  { path: 'profile/:id', component: ProfileNormalComponent },
  { path: 'myprofile/:id', component: ProfileNormalComponent },
  { path: 'people', component: AllUsersComponent },
  { path: 'chat/:id', component: ChatComponent },
  // { path: 'delete/:id', component: ProfileNormalComponent }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
