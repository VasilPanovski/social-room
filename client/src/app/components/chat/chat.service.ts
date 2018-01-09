import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from '../../constants/constants';
import * as io from 'socket.io-client';

const inviteToChatUrl: string = Constants.hostUrl + 'api/chat/inviteToChat';
const getChatUrl: string = Constants.hostUrl + 'api/chat/getChat/';
const saveMessageUrl: string = Constants.hostUrl + 'api/chat/saveMessage';
const AllChatsUrl: string = Constants.hostUrl + 'api/chat/allChats/';
const DeleteChatUrl: string = Constants.hostUrl + 'api/chat/deleteChat';

// const AuthToken: string = Constants.authToken;

@Injectable()
export class ChatService {

  private socket;
  private url = Constants.hostUrl;

  constructor(
    private http: Http
  ) {
    this.socket = io.connect(this.url);
  }

  getMessage(userId) {
    let observable = new Observable(observer => {
      this.socket = io(this.url, { query: "userId=" + userId });
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  public inviteToVideoChat(invitedUserId, offerSdp) {
    let data = {
      "invitedId": invitedUserId,
      "offerSdp": offerSdp
    }

    this.socket.emit('video-invitation', data)
  }

  public acceptVideoChat(otherUserId, answerSdp) {
    let data = {
      "otherUserId": otherUserId,
      "answerSdp": answerSdp
    }

    this.socket.emit('video-accept', data)
  }

  public listenForAnswerSdp(): Observable<any> {
    // return this.socket.on('accept-sdp', (data) => {
    //   console.log(data);
    //   return data;
    // });

    let observable = new Observable(observer => {
      this.socket.on('accept-sdp', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  public sendMessage(params) {
    this.socket.emit('send-message', params);
  }

  public saveMessage(params) {
    return this.http.post(saveMessageUrl, params)
      .map((res: Response) => {
        return {
          status: res.status,
          body: res.json()
        };
      });
  }

  public inviteToChat(params) {
    return this.http.post(inviteToChatUrl, params)
      .map((res: Response) => {
        return {
          status: res.status,
          body: res.json()
        };
      });
  }

  public loadChat(chatId) {
    return this.http.get(getChatUrl + chatId)
      .map((res: Response) => {
        return {
          status: res.status,
          body: res.json()
        };
      });
  }

  public getAllChats(chatUsers) {
    return this.http.post(AllChatsUrl, chatUsers)
      .map((response: Response) => response.json());
  }

  public deleteChat(params) {
    console.log(params);
    return this.http.post(DeleteChatUrl, params)
      .map((response: Response) => response.json());
  }

}
