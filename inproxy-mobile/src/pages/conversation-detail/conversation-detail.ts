import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ChatType} from "../../model/ChatType";
import {ConversationServiceProvider} from "../../providers/conversation-service/conversation-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              private alertCtrl: AlertController, private conversationService: ConversationServiceProvider, private userService: UserServiceProvider) {
    // console.log("idConversation :" + this.navParams.get("idConversation"));
    this.currentConversation = {name: "", members: [], id: ""};

    this.presentLoadingText("Loading conversation detail...");
    this.conversationService.getConversationById(this.navParams.get('idConversation')).subscribe((success: any) => {
        console.log("ConversationDetailPage getConversationById success");
        console.log(success);
        this.currentConversation = success;
        let members = [];
        success.members.forEach(elem => {
          this.userService.getUserInfoById(elem).subscribe(success => {
              // console.log(success);
              let member = {last_name: success.last_name, first_name: success.first_name, id: success.id};
              members.push(member);
            },
            error => {
              this.showPopup("Error", error);
            });
        });
        this.currentConversation.members = members;
        this.loading.dismiss();
      },
      error => {
        this.showPopup("Error", error);
        this.loading.dismiss();
        this.navCtrl.pop();
      });
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
    this.navCtrl.push('ChatPage', {chatType: ChatType.STD_CONVERSATION, conversationId: id, pageTitle: name});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad groupDetailPage');
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
