import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../model/userModel";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {PrivateMessageStorageProvider} from "../../providers/private-message-storage/private-message-storage";
import {IoServiceProvider} from "../../providers/io-service/io-service";

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
  currentFriend: User;
  messageList: any;
  friendId: string;
  messageToSend: string;
  haveMessage: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserServiceProvider,
              private alertCtrl: AlertController, private privateMessage: PrivateMessageStorageProvider,
              private ioService: IoServiceProvider) {
    this.currentFriend = new User("", "");
    this.friendId = navParams.get('idFriend');
    this.userService.getUserInfoById(this.friendId).subscribe(success => {
        console.log("ChatPage success");
        console.log(success);
        this.currentFriend = new User(success.last_name, success.email);
        this.currentFriend.firstName = success.first_name;
      },
      error => {
        this.showPopup("Error", error);
        this.navCtrl.pop();
      });
    this.loadMessageList();
    this.ioService.connectSocket();
    this.ioService.setPrivateMessageCallback(this.receiveMessage);
  }

  public receiveMessage(message: any) {
    this.privateMessage.addMessage({from: message.from, to: message.to, message: message.message});
    this.loadMessageList();
  }

  public sendMessage() {
    this.ioService.sendMessage(localStorage.getItem('userId'), this.friendId, this.messageToSend);
    this.privateMessage.addMessage({from: localStorage.getItem('userId'), to: this.friendId, message: this.messageToSend});
    this.messageToSend = null;
    this.loadMessageList();
  }

  public loadMessageList() {
    this.messageList = this.privateMessage.getListMessageByUserId(this.friendId);
    (this.messageList != null && this.messageList.length > 0) ? this.haveMessage = true : this.haveMessage = false;
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
