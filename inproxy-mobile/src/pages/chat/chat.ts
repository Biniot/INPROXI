import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../model/userModel";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {PrivateMessageStorageProvider} from "../../providers/custom-storage/private-message-storage";
import {IoServiceProvider} from "../../providers/io-service/io-service";
import {ChatType} from "../../model/ChatType";
import { ConversationServiceProvider } from '../../providers/conversation-service/conversation-service';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  // General
  pageTitle: string;
  messageList: any;
  messageToSend: string;
  haveMessage: boolean;
  chatType: any;
  conversationId: string;

  // Private Chat
  currentFriend: User;

  // Group Chat
  currentGroup: any;

  // Room Chat
  currentRoom: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserServiceProvider,
              private alertCtrl: AlertController, private privateMessage: PrivateMessageStorageProvider,
              private ioService: IoServiceProvider, private conversationService: ConversationServiceProvider) {

    if (!this.ioService.isConnected()) {
      this.ioService.connectSocket();
      let self = this;
      let onPrivateMessage = (message: any) => {
        console.log("onPrivateMessage");
        console.log(message);
        if (self.chatType == ChatType.PRIVATE) {
          self.privateMessage.addElem(message);
          self.loadMessageList();
        } else if (self.chatType == ChatType.GROUP) {

        } else if (self.chatType == ChatType.ROOM) {

        }};
      this.ioService.setPrivateMessageCallback(onPrivateMessage);
    }
    this.chatType = navParams.get('chatType');
    this.pageTitle = navParams.get('pageTitle');
    this.conversationId = navParams.get('group_id');

    if (this.chatType == ChatType.PRIVATE) {
      this.userService.getUserInfoById(navParams.get('id')).subscribe(success => {
          console.log("ChatPage success");
          console.log(success);
          this.currentFriend = new User(success.last_name, success.email);
          this.currentFriend.firstName = success.first_name;
          this.currentFriend.userId = navParams.get('id');
          this.loadMessageList();
          //this.pageTitle = success.first_name + " " + success.last_name;
        },
        error => {
          this.showPopup("Error", error);
          this.navCtrl.pop();
        });
    } else if (this.chatType == ChatType.GROUP) {

    } else if (this.chatType == ChatType.ROOM) {

    }
  }

  public sendMessage() {
    console.log("sendMessage");
    if (!this.ioService.isConnected()) {
      this.ioService.connectSocket();
    }
    if (this.chatType == ChatType.PRIVATE) {
      console.log(this.messageToSend);
      let content = {
        from: localStorage.getItem('userId'),
        group_id: this.navParams.get('group_id'),
        message: this.messageToSend
      };
      this.privateMessage.addElem(content);
      this.ioService.sendMessage(content.from, content.group_id, content.message);
      this.messageToSend = null;
      this.loadMessageList();
    } else if (this.chatType == ChatType.GROUP) {

    } else if (this.chatType == ChatType.ROOM) {

    }
    try {
    } catch (exception) {
      console.log(exception);
    }
  }

  public loadMessageList() {
    this.privateMessage.getListMessageByUserId()
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }

}
