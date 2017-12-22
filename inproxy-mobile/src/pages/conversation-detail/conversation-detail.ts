import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatType} from "../../model/ChatType";

/**
 * Generated class for the groupDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-conversation-detail',
  templateUrl: 'conversation-detail.html',
})
export class ConversationDetailPage {
  currentConversation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // console.log("idRoom :" + this.navParams.get("idRoom"));
    this.currentConversation = {name: "Le coin des écolos", userList: [
      {fullName: "David lepoulet", userId: "David lepoulet", userAvatar: ""},
      {fullName: "Patate", userId: "Patate", userAvatar: ""}]};
  }

  public showUserInfoPage(idUser: string) {
    this.navCtrl.push('UserPage', {userId: idUser});
  }

  lunchChatPage(id: string, name: string) {
    this.navCtrl.push('ChatPage', {chatType: ChatType.PRIVATE, id: id, pageTitle: name});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad groupDetailPage');
  }

}
