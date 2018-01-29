import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MessageRoomModel} from "../../model/conversationRoomModel";
import {IoServiceProvider} from "../../providers/io-service/io-service";
import {Observable} from "rxjs/Observable";
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the ChatZonePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-zone',
  templateUrl: 'chat-zone.html',
})
export class ChatZonePage {
  currentRoom: any;
  haveMessage: boolean;
  messageToSend: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ioService: IoServiceProvider, private _userService: UserServiceProvider) {
    this.currentRoom = this.navParams.get('room');
    Observable.interval(500).takeWhile(() => true).subscribe(() => this.updateMessage());
    this._userService.getUserInfo().subscribe(success => {
        // console.log('HomePage getUserInfo functionSuccess');
        // console.log(success);
      },
      error => {
        // console.log('HomePage getUserInfo functionError');
        // console.log(error);
      });
  }

  updateMessage() {
    this.currentRoom = this.ioService.getConversationRoomById(this.currentRoom.id);
    if (this.currentRoom.message.length > 0) {
      this.haveMessage = true;
    }
  }

  sendMessage() {
    this.ioService.sendMessageToConversationRoom(this.currentRoom.id, this.messageToSend, localStorage.getItem('firstName') + " " + localStorage.getItem('lastName'))
    this.messageToSend = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatZonePage');
  }

}
