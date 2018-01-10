import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { routing } from './notifications.routing';
import { HttpModule } from '@angular/http';
import { HttpHeadersService } from '../../../services/http-headers.service'
import { NotificationsComponent } from './notifications.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    NotificationsComponent
  ],
  providers: [HttpHeadersService]
})
export class NotificationsModule { }