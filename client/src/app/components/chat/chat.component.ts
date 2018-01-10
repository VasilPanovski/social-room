import { Component, OnInit, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ChatService } from './chat.service';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../constants/constants';
import { CloudinaryOptions, CloudinaryUploader, CloudinaryImageComponent } from 'ng2-cloudinary';

//emoji modules
import { EmojiPickerModule, EmojiPickerOptions, CaretEvent, EmojiEvent } from 'angular2-emoji-picker';
import { EmojiPickerAppleSheetLocator } from 'angular2-emoji-picker/lib-dist/sheets';

import 'rxjs/Rx';
import * as $ from 'jquery';

const AuthToken: string = Constants.authToken;

@Component({
	templateUrl: './chat.component.html'
})

export class ChatComponent {
	@ViewChild('textarea') textarea: ElementRef;
	
	  public messageToSend: FormGroup;
	  public messages: any[] = [];
	  public success: string;
	  public error: string;
	  public connection;
	  public user: any = null;
	  public chatId: string;
	  public chat;
	  public receiver: any = null;
	  public sender: any = null;
	  public userImages: any[] = [];
	  public theOtherUserID: string;
	  public showAcceptVideoChatButton = false;
	  public showVideoChat = false;
	  public isInitializer = false;
	  public weRTCsdpOffer: string;
	  public plainText = true;
	  public imageUrl: string;
	
	  // emoji
	  public eventMock;
	  public eventPosMock;
	  public direction = Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : (Math.random() > 0.5 ? 'right' : 'left');
	  public toggled = false;
	  public content = '';
	  private _lastCaretEvent: CaretEvent;
	  public uploader: CloudinaryUploader = new CloudinaryUploader(
		new CloudinaryOptions({ cloudName: Constants.cloudinaryCloudName, uploadPreset: Constants.cloudinaryUploadPreset })
	  );
	
	
	  constructor(public userService: UserService,
		private fb: FormBuilder,
		public chatService: ChatService,
		private route: ActivatedRoute,
		private emojiPickerOptions: EmojiPickerOptions) {
		this.emojiPickerOptions.setEmojiSheet({
		  url: 'sheet_apple_32.png',
		  locator: EmojiPickerAppleSheetLocator
		});
		this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: any): any => {
		  const res: any = JSON.parse(response);
		  if (res.url) {
			this.plainText = false;
			this.imageUrl = res.url;
			this.content = res.url;
			// this.content = `<div class="chatUser-image"><img   src="${res.url}"/></div>`;
			this.sendMessage();
		  } else {
			this.content = 'Loading file failed!';
		  }
	
		  return { item, response, status, headers };
		};
	  }
	
	  ngOnInit(): void {
		// this.chatId = (<any>this.route.params)._value.id;
		// Check for user if page is refreshed
		const token = localStorage.getItem(AuthToken);
	
		if (token && !this.user) {
		  this.userService
			.getLoggedUser()
			.subscribe((x) => {
			  this.userService.loggedUser = x.user;
			  this.user = this.userService.loggedUser;
	
			  this.loadChat();
			  this.messageListener(this.user.id);
	
			  this.route.params.subscribe(params => {
	
				if (params['id']) {
				  this.chatId = params['id'];
				  this.loadChat();
				}
			  });
			},
			(err) => {
			  localStorage.removeItem(AuthToken);
			});
		} else {
		  this.user = this.userService.loggedUser;
		  this.route.params.subscribe(params => {
			if (params['id']) {
			  this.chatId = params['id'];
			  this.loadChat();
			}
		  });
		  this.messageListener(this.user.id);
		}
	
		this.messageToSend = this.fb.group({
		  'message': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
		});
	  }
	
	  ngOnDestroy() {
		if (this.connection) {
		  console.log('destroy');
		  this.connection.unsubscribe();
		}
	  }
	
	  public messageListener(userId) {
		this.connection = this.chatService.getMessage(this.user.id).subscribe(data => {
	
		  console.log(data);
	
		  if (data['type'] === 'video-invitation') {
			this.showVideoChat = true;
			this.weRTCsdpOffer = data['message'];
		  } else {
			const message = data['message'];
			if (this.chatId === message['chatId']) {
			  this.messages.push({ message: message['message'], senderId: message['senderId'] });
			};
		  }
		});
	  }
	
	  public loadChat() {
		this.chatService.loadChat(this.chatId)
		  .subscribe((res: any) => {
				console.log(res)
			this.chat = res.body.chat[0];
			this.theOtherUserID = this.chat.users.filter(user => user.id !== this.user.id)[0].id;
	
			this.messages = this.chat['messages'].reverse();
	
			if (this.chat['users'][0].id === this.user.id) {
			  this.sender = this.chat['users'][0];
			  this.receiver = this.chat['users'][1];
			} else {
			  this.sender = this.chat['users'][1];
			  this.receiver = this.chat['users'][0];
			}
	
			this.userImages[this.sender.id] = this.sender.image;
			this.userImages[this.receiver.id] = this.receiver.image;
	
		  },
		  (err: any) => {
			this.error = err;
		  });
	  }
	
	  public sendMessage() {
		let message = this.content.trim();
		if (message.length === 0 || message === '') {
		  return;
		}
	
		const isLink = /((https|http)?:\/\/[^\s]+)/g.test(message);
		if (isLink && this.plainText) {
		  message = this.changeMessage(message);
		  this.plainText = false;
		}
	
		const messageContent = {
		  message: { content: message, plainText: this.plainText, imageUrl: this.imageUrl },
		  senderId: this.sender.id
		};
	
		if (this.imageUrl) {
		  messageContent['imageUrl'] = this.imageUrl;
		}
	
		this.messages.push(messageContent);
		this.messageToSend.reset();
		this.content = '';
	
		const params = {
		  user: this.receiver.id,
		  chatId: this.chatId,
		  message: { content: message, plainText: this.plainText, imageUrl: this.imageUrl },
		  senderId: this.sender.id
		};
	
	
		this.plainText = true;
		this.chatService.sendMessage(params);
	
		this.chatService.saveMessage(params)
		  .subscribe((res: any) => {
			this.success = 'Done!';
		  },
		  (err: any) => {
			this.error = err;
	
			setTimeout(() => {
			  this.error = 'Error';
			}, 500);
		  });
	  }
	
	  public inviteToVideoChat() {
		this.isInitializer = true;
		this.showVideoChat = true;
	
	  }
	
	  // emoji
	  handleSelection(event: EmojiEvent) {
		this.content = this.content.slice(0, this._lastCaretEvent.caretOffset) + event.char + this.content.slice(this._lastCaretEvent.caretOffset);
		this.eventMock = JSON.stringify(event);
	  }
	
	  handleCurrentCaret(event: CaretEvent) {
		this._lastCaretEvent = event;
		this.eventPosMock = `{ caretOffset : ${event.caretOffset}, caretRange: Range{...}, textContent: ${event.textContent} }`;
	  }
	
	  upload() {
		this.uploader.uploadAll();
		this.plainText = true;
	  }
	
	  private changeMessage(message) {
		const urlRegex = /((https|http)?:\/\/[^\s]+)/g;
		return message.replace(urlRegex, function (url) {
		  return '<a href="' + url + '">' + url + '</a>';
		});
	  }
	
	  private onNavigate(url) {
		window.open(url, '_blank');
	  }
	
	  private handleEnterKey(e) {
		if (e.which === 13) {
		  e.preventDefault();
		  this.sendMessage();
		}
	  }
}
