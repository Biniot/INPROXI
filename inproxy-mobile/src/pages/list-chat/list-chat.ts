import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {PrivateMessageStorageProvider} from "../../providers/custom-storage/private-message-storage";
import {ChatType} from "../../model/ChatType";

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
  listPrivateChat: any;
  listGroupChat: any;
  listRoomChat: any;

  constructor(private userService: UserServiceProvider, private messageStorage: PrivateMessageStorageProvider, public navCtrl: NavController) {
    console.log("ListChatPage constructor");
    //userService.getUserConversation();
    this.listPrivateChat = [];
    this.listGroupChat = [];
    this.listRoomChat = [];

    // // TODO : a virer une fois quon a les init
    // this.listPrivateChat = [{friendName: "David le poulet", friendId: ""}, {friendName: "Gandalf le Blanc", friendId: ""}];
    // this.listGroupChat = [{groupName: "La bande a bono", groupId: ""}, {groupName: "La bande a toto", groupId: ""}];
    // this.listRoomChat = [{roomName: "Epitech Parmentier", roomId: ""}, {roomName: "Epitech Kremlin", roomId: ""}];

    // for (let userId in messageStorage.getIds()) {
    //   // TODO : get historique puis l'add to storage
    //   userService.getUserInfoById(userId).subscribe(success => {
    //       this.listPrivateChat.push({friendName: success.first_name + " " + success.last_name, friendId: success.id});
    //     },
    //     error => {
    //     console.log(error);
    //       // this.showPopup("Error", error);
    //       // this.navCtrl.pop();
    //     });
    // }

    // TODO : charger les listes de group et room
  }

  lunchChatPage(chatType: any, id: string, name: string) {
    this.navCtrl.push('ChatPage', {chatType: chatType, id: id, pageTitle: name});
  }

  public addFriendRequest() {
    this.navCtrl.push('AddFriendRequestPage');
  }

  public createConversation() {
    this.navCtrl.push('CreateConversationPage');
  }

  public createRoom() {
    this.navCtrl.push('CreateRoomPage');
  }

  showInfoPage(chatType: any, id: string) {
    if (chatType == ChatType.PRIVATE) {
      this.navCtrl.push('UserPage', {userId: id});
    } else if (chatType == ChatType.GROUP) {
      this.navCtrl.push('GroupDetailPage', {"idGroup": id});
    } else if (chatType == ChatType.ROOM) {
      this.navCtrl.push('RoomDetailPage', {idRoom: id});
    }
  }

}
