import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
//import {FriendServiceProvider} from "../../providers/friend-service/friend-service";
import { UserPage } from '../user/user';
import {ConversationServiceProvider} from "../../providers/conversation-service/conversation-service";
import {ChatType} from "../../model/ChatType";

/**
 * Generated class for the FriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  haveRequest: boolean;
  haveFriend: boolean;
  friendsList: Array<{id: string, first_name: string, last_name: string}>;

  constructor(public navCtrl: NavController, /*public navParams: NavParams,*/ private alertCtrl: AlertController,
              private userService: UserServiceProvider, /*private friendRequestService: FriendServiceProvider,*/
              private conversationService: ConversationServiceProvider) {
    // this.friendsList = [
    //   {name: 'Obi'},
    //   {name: 'Ani'},
    //   {name: 'Padme'},
    //   {name: 'Yoda'},
    //   {name: 'Luke'},
    //   {name: 'Han'}
    // ]
    this.haveRequest = false;
    this.haveFriend = false;
    userService.getFriends().subscribe(success => {
        if (success) {
          let tab = localStorage.getItem('friends');
          if (tab === 'undefined' || tab === null) {
            this.friendsList = [
            ]
          } else {
            this.friendsList = JSON.parse(tab);
            this.haveFriend = true;
            console.log('FriendListLoad');
            let members = [localStorage.getItem('userId'), this.friendsList[0].id];
            console.log(members);
            conversationService.createConversation(members);
          }
        } else {
          this.showPopup("Error", "Problem retriving friends.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
    userService.getFriendRequests().subscribe(success => {
        if (success) {
          let stringRequest = localStorage.getItem('friendRequests');
          if (stringRequest === 'undefined' || stringRequest === null) {
            this.haveRequest = false;
          } else {
            this.haveRequest = true;
          }
        } else {
          this.showPopup("Error", "Problem retriving friend request.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  public addFriendRequest() {
    this.navCtrl.push('AddFriendRequestPage');
  }

  public checkFriendRequest() {
    this.navCtrl.push('CheckFriendRequestPage');
  }

  public friendInfo(idFriend: string) {
    this.navCtrl.push('UserPage', {userId: idFriend});
  }

  public friendChat(idFriend: string, name: string) {
    this.navCtrl.push('ChatPage', {id: idFriend, chatType: ChatType.PRIVATE, pageTitle: name});
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
