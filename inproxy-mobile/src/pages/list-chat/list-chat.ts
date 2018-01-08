import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {ChatType} from "../../model/ChatType";
import {ConversationServiceProvider} from "../../providers/conversation-service/conversation-service";

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
  loading: any;

  constructor(private userService: UserServiceProvider, public navCtrl: NavController, public events: Events,
              public loadingCtrl: LoadingController, public conversationService: ConversationServiceProvider) {
    // console.log("ListChatPage constructor");
    this.listConversation = [];
    this.presentLoadingText("Loading conversation...");
    userService.getUserConversation().subscribe(success => {
        // console.log("ListChatPage getUserConversation success");
        // console.log(success);
      success.forEach((element) => {
        let newConversation = {
          name: element.conversation.name,
          id: element.conversation.id,
          members: element.conversation.members,
          last_message: element.conversation.last_message,
          chatType: ChatType.STD_CONVERSATION
        };
        this.listConversation.push(newConversation);
      });
        this.loading.dismiss();
      },
      error => {
        this.loading.dismiss();
        // console.log("ListChatPage getUserConversation error");
        // console.log(error);
      });

    events.subscribe('zone:push', (conversationId) => {
      this.conversationService.getConversationById(conversationId).subscribe((success:any) => {
        let newConversation = {
          name: success.name,
          id: success.id,
          members: success.members,
          last_message: success.last_message,
          chatType: ChatType.ROOM_CONVERSATION
        };
        this.listConversation.push(newConversation);
      }, error => {
        console.log("ListChatPage constructor getConversationById");
        console.log(error);
      });
    });

    events.subscribe('zone:pop', (conversationId) => {
      this.listConversation = this.remove(this.listConversation, conversationId);
    });
    // // TODO : a virer une fois quon a les init
    //this.listConversation = [{name: "David le poulet", members: [], id: ""}, {name: "La bande a bono", members: [], id: ""}];
  }

  remove(arrOriginal, conversationId: string){
    return arrOriginal.filter(function(el){return el.id !== conversationId});
  }

  presentLoadingText(message: string) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: message
    });

    this.loading.present();
  }

  public showInfoPage(idConversation: string) {
    this.navCtrl.push('ConversationDetailPage', {idConversation: idConversation});
  }

  lunchChatPage(id: string, chatType) {
    this.navCtrl.push('ChatPage', {chatType: chatType, conversationId: id});
  }

  public createConversation() {
    this.navCtrl.push('CreateConversationPage');
  }

}
