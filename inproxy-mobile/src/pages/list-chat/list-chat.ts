import { Component } from '@angular/core';
import {Events, IonicPage, NavController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the ListChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-chat',
  templateUrl: 'list-chat.html',
})
export class ListChatPage {
  listConversation: any;

  constructor(private userService: UserServiceProvider, public navCtrl: NavController, public events: Events) {
    // console.log("ListChatPage constructor");
    this.listConversation = [];
    userService.getUserConversation().subscribe(success => {
        // console.log("ListChatPage getUserConversation success");
        // console.log(success);
      // TODO : boucler pr add le chattype STD
        this.listConversation = success;
      },
      error => {
        // console.log("ListChatPage getUserConversation error");
        // console.log(error);
      });

    events.subscribe('zone:push', (conversation) => {
      // TODO : add le type ROOM_CONVER
      this.listConversation.push(conversation);
    });

    events.subscribe('zone:pop', (conversationId) => {
      //this.listConversation.push(conversation);
    });
    // // TODO : a virer une fois quon a les init
    //this.listConversation = [{name: "David le poulet", members: [], id: ""}, {name: "La bande a bono", members: [], id: ""}];
  }

  lunchChatPage(id: string, chatType) {
    this.navCtrl.push('ChatPage', {chatType: chatType, conversationId: id});
  }

  public createConversation() {
    this.navCtrl.push('CreateConversationPage');
  }

}
