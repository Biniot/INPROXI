import { Component, NgZone } from '@angular/core';
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
  currentConversation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private ioService: IoServiceProvider, private conversationService: ConversationServiceProvider, private _ngZone: NgZone,
              private userService: UserServiceProvider) {

    let onPrivateMessage = (message: any) => {
      _ngZone.run(() => {
        console.log("onPrivateMessage");
        console.log(message);
        if (message.author.id.localeCompare(localStorage.getItem('userId')) != 0) {
          this.messageList.push(message);
        }
      });};
    this.ioService.setPrivateMessageCallback(onPrivateMessage);
    this.userService.getUserInfo().subscribe(success => {
        console.log('HomePage getUserInfo functionSuccess');
        console.log(success);
      },
      error => {
        console.log('HomePage getUserInfo functionError');
        console.log(error);
      });
  }

  ionViewWillEnter() {
    if (!this.ioService.isConnected()) {
      this.ioService.connectSocket();
    }
    this.conversationService.getConversationById(this.navParams.get('conversationId')).subscribe(success => {
        console.log("ChatPage getConversationById success");
        console.log(success);
        this.currentConversation = success;
        this.pageTitle = this.currentConversation.name;
      },
      error => {
        this.showPopup("Error", error);
        this.navCtrl.pop();
      });

    this.conversationService.getMessageConversation(this.navParams.get('conversationId')).subscribe((success: any) => {
        console.log("ChatPage getMessageConversation success");
        console.log(success);
        if (success.length > 0) {
          this.haveMessage = true;
          this.messageList = success;
        }
        //this.showPopup("onMessageReceive", "Size of the data receive : " + this.messageList.length);
      },
      error => {
        this.showPopup("Error", error);
        this.navCtrl.pop();
      });
  }

  public sendMessage() {
    console.log("sendMessage");
    if (!this.ioService.isConnected()) {
      this.ioService.connectSocket();
    }
    console.log(this.messageToSend);
    let newMessage = {
      createdAt: new Date().toDateString,
      content: this.messageToSend,
      author : {
        first_name: localStorage.getItem("firstName"),
        last_name: localStorage.getItem("lastName"),
        id: localStorage.getItem('userId')
      },
      id: ""
    };
    this.ioService.sendMessage(newMessage.author, this.currentConversation.id, this.messageToSend);
    this.messageToSend = null;
    this.messageList.push(newMessage);
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
