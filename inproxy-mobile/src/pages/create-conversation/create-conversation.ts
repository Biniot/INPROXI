import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {ConversationServiceProvider} from "../../providers/conversation-service/conversation-service";
import {isUndefined} from "util";
import {ChatType} from "../../model/ChatType";

/**
 * Generated class for the CreateConversationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-conversation',
  templateUrl: 'create-conversation.html',
})
export class CreateConversationPage {
  newConversation: {name: string, members: string[]};
  haveFriend: boolean;
  friendsList: Array<{id: string, first_name: string, last_name: string}>;

  constructor(public navCtrl: NavController, private userService: UserServiceProvider, private conversationService: ConversationServiceProvider,
              private alertCtrl: AlertController) {
    this.haveFriend = false;
    this.newConversation = {name:"", members:[]};
    userService.getFriends().subscribe(success => {
        if (success) {
          let tab = localStorage.getItem('friends');
          if (tab === 'undefined' || tab === null) {
            this.friendsList = []
          } else {
            this.friendsList = JSON.parse(tab);
            this.haveFriend = true;
            // console.log('FriendListLoad');
            // let members = [localStorage.getItem('userId'), this.friendsList[0].id];
            // console.log(members);
            // conversationService.createConversation(members);
          }
        } else {
          this.showPopup("Error", "Problem retriving friends.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  updateMembersList(friendId: string, event: boolean, index: number) {
    // console.log("updateMembersList");
    // console.log(this.newConversation.members);
    // console.log(index);
    // console.log(this.friendsList[index]);
    // console.log(friendId);
    // console.log(event);
    if (event) {
      if (!isUndefined(this.newConversation.members) && this.newConversation.members !== null && this.newConversation.members.length > 0) {
        let findIt = false;
        let i = 0;
        while (i < this.newConversation.members.length) {
          console.log(this.newConversation.members[i]);
          if (this.newConversation.members[i].localeCompare(friendId) === 0) {
            console.log("findIt event true ");
            findIt = true;
          }
          i++;
        }
        if (!findIt) {
          this.newConversation.members.push(friendId);
        }
      } else {
        this.newConversation.members = [];
        this.newConversation.members.push(friendId);
      }
    } else {
      this.newConversation.members = this.newConversation.members.filter(obj => obj!== friendId);
    }
    console.log(this.newConversation.members);
  }

  createConversation() {
    this.newConversation.members.push(localStorage.getItem('userId'));
    this.conversationService.createConversation(this.newConversation.members, this.newConversation.name).subscribe((result: any) => {
      this.navCtrl.pop();
      if (this.newConversation.members.length == 2) {
        this.navCtrl.push('ChatPage', {chatType: ChatType.PRIVATE, conversationId: result.id});
      } else {
        this.navCtrl.push('ChatPage', {chatType: ChatType.GROUP, conversationId: result.id});
      }
    });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // if (this.deleteUserSucces) {
            //   this.navCtrl.popToRoot();
            // }
          }
        }
      ]
    });
    alert.present();
  }

}
