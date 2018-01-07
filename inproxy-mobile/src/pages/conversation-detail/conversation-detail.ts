import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
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
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    // console.log("idRoom :" + this.navParams.get("idConversation"));
    this.currentConversation = {name: "Le coin des écolos", userList: [
      {fullName: "David lepoulet", userId: "David lepoulet", userAvatar: ""},
      {fullName: "Patate", userId: "Patate", userAvatar: ""}]};

    // this.presentLoadingText("Loading friends...");
    // this.loading.dismiss();
  }

  presentLoadingText(message: string) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: message
    });

    this.loading.present();
  }

  public showUserInfoPage(idUser: string) {
    this.navCtrl.push('UserPage', {userId: idUser});
  }

  lunchChatPage(id: string, name: string) {
    this.navCtrl.push('ChatPage', {chatType: ChatType.STD_CONVERSATION, id: id, pageTitle: name});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad groupDetailPage');
  }

}
