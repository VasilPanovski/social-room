import { Routes, RouterModule }  from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'notifications', component: NotificationsComponent}
    ]
  }
];

// export const routing: ModuleWithProviders = RouterModule.forChild(routes);
export const routing = RouterModule.forChild(routes);
