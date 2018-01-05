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
              public userService: UserServiceProvider, /*private friendRequestService: FriendServiceProvider,*/
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
  }

  ionViewWillEnter() {
    this.userService.getFriends().subscribe(success => {
        if (success) {
          let tab = localStorage.getItem('friends');
          if (tab === 'undefined' || tab === null) {
            this.friendsList = [
            ]
          } else {
            this.friendsList = JSON.parse(tab);
            this.haveFriend = true;
            // console.log('FriendListLoad');
          }
        } else {
          this.showPopup("Error", "Problem retriving friends.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
    this.userService.getFriendRequests().subscribe(success => {
        if (success) {
          let stringRequest = localStorage.getItem('friendRequests');
          this.haveRequest = !(stringRequest === 'undefined' || stringRequest === null);
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

  public friendChat(idFriend: string) {
    console.log("FriendsPage friendChat idFriend");
    console.log(idFriend);
    let findConversation = false;
    this.userService.getUserConversation().subscribe(success => {
        console.log("FriendsPage friendChat getUserConversation");
        console.log(success);
        success.forEach((result) => {
          result.conversation.members.forEach((member) => {
            if (member.id.localeCompare(idFriend) == 0 && result.conversation.members.length == 2) {
              if (!findConversation) {
                this.navCtrl.push('ChatPage', {chatType: ChatType.STD_CONVERSATION, conversationId: result.conversation.id});
              }
              console.log("FriendsPage friendChat findConversation");
              findConversation = true;
            }
          });
        });
        if (!findConversation) {
           console.log("FriendsPage friendChat !findConversation");
          this.friendsList.forEach((element) => {
             console.log("FriendsPage friendChat this.friendsList.forEach");
             console.log(element);
            if (element.id.localeCompare(idFriend) == 0) {
              let members = [localStorage.getItem('userId'), idFriend];
               console.log("FriendsPage friendChat element.id.localeCompare(idFriend) == 0");
              this.conversationService.createConversation(members, localStorage.getItem('firstName') + " " +
                localStorage.getItem('lastName') + ", " + element.first_name + " " + element.last_name).subscribe((result: any) => {
                  this.navCtrl.push('ChatPage', {chatType: ChatType.STD_CONVERSATION, conversationId: result.id});
                },
                error => {
                  this.showPopup("Error", error);
                });
            }
          });
        }
      },
      error => {
        this.showPopup("Error", error);
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
