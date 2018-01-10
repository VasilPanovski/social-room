import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from '../../constants/constants';
import { HttpHeadersService } from '../../services/http-headers.service';
import { StompService } from 'ng2-stomp-service';

const inviteToChatUrl: string = Constants.hostUrl + 'api/chat/invitation';
const getChatUrl: string = Constants.hostUrl + 'api/chat/getChat/';
const saveMessageUrl: string = Constants.hostUrl + 'api/chat/saveMessage';
const AllChatsUrl: string = Constants.hostUrl + 'api/chat/allChats/';
const DeleteChatUrl: string = Constants.hostUrl + 'api/chat/deleteChat';

// const AuthToken: string = Constants.authToken;

@Injectable()
export class ChatService {

  private subscription: any;
  private data: any;
  private url = Constants.hostUrl;

  constructor(
    private http: Http,
    public httpHeaderService: HttpHeadersService,
    private stomp: StompService
  ) {
    stomp.configure({
      host: 'http//localhost:8085/app/chat/socket',
      debug: true,
      queue: {'init': false}
    })
  }

  getMessage(userId) {
    let observable = new Observable(observer => {

      this.subscription = this.stomp.subscribe(this.url + '/chat/' + userId, (data) => {
        this.data = data;
      })

      let messageObj = {
        content: this.data,
        receiverId: userId
      }
      this.stomp.send('/app/chat', JSON.stringify(messageObj))
    
      return () => {
        this.subscription.unsubscribe()
      };
    })
    return observable;
  }

  public sendMessage(params) {
    this.stomp.send('/app/chat', JSON.stringify(params));
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
    console.log(params)
    return this.http.post(inviteToChatUrl, JSON.stringify(params), this.httpHeaderService.getHeaders())
      .map((res: Response) => {
        console.log(res)
        return {
          status: res.status,
          body: res.json()
        };
      });
  }

  public loadChat(chatId) {
    return this.http.get(getChatUrl + chatId)
      .map((res: Response) => {
        console.log(res)
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
