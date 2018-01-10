import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHeadersService } from './http-headers.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Constants } from '../constants/constants';

const markNotificationsAsRead: string = Constants.hostUrl + 'api/notifications/markAsRead/';
const saveNotificationUrl: string = Constants.hostUrl + 'api/notifications/save';

@Injectable()
export class NotificationService {
  private url = Constants.hostUrl;

  private socket;

  constructor(
    private http: Http,
    public httpHeaderService: HttpHeadersService
  ) {
  }

  getNotifications(userId) {
    let observable = new Observable(observer => {
      this.socket = io(this.url, { query: "userId=" + userId });
      this.socket.on('notification', (data) => {
        observer.next(data.notification);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  sendNotification(params) {

    //this.socket.emit('add-notification', params);
    return this.http.post(saveNotificationUrl, JSON.stringify(params), this.httpHeaderService.getHeaders())
      .map((res: Response) => {
        return {
          status: res.status,
          body: res.json()
        };
      });
  }

  saveNotification(params) {
    return this.http.post(saveNotificationUrl, JSON.stringify(params), this.httpHeaderService.getHeaders())
      .map((res: Response) => {
        return {
          status: res.status,
          body: res.json()
        };
      });
  }

  markNotificationsAsRead(id) {
    return this.http.get(markNotificationsAsRead + id)
      .map((res: Response) => {
        return {
          status: res.status,
          body: res.json()
        }
      })
  }
}
