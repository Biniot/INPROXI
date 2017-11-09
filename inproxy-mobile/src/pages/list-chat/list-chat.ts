import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
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

  constructor(private userService: UserServiceProvider/*public navCtrl: NavController, public navParams: NavParams*/) {
    console.log("ListChatPage constructor");
    userService.getUserConversation();
  }

}
