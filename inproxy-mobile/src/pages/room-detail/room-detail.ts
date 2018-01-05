import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatType} from "../../model/ChatType";

/**
 * Generated class for the RoomDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-room-detail',
  templateUrl: 'room-detail.html',
})
export class RoomDetailPage {
  isLocalUserOwner: boolean;
  roomInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("idRoom :" + this.navParams.get("idRoom"));
    this.isLocalUserOwner = false;
    // TODO : recup from db
    this.roomInfo = {
      avatarRoom: "",
      idRoom: this.navParams.get("idRoom"),
      idOwner: "Patate",
      name: "Le coin des ecolos",
      status: true,
      expiration: true,
      expirationDate: new Date(2017, 10, 30),
      expirationNbDay: 0,
      nbUser: 0,
      users: [
        {fullName: "David lepoulet", userId: "David lepoulet", userAvatar: ""},
        {fullName: "Patate", userId: "Patate", userAvatar: ""}]
    };

    this.roomInfo.nbUser = this.roomInfo.users.length;
    //this.roomInfo.expirationNbDay = this.daydiff(this.parseDate(new Date()), this.parseDate(this.roomInfo.expirationDate));

  }

  public quitRoom(idRoom: string) {
    // TODO : quitter le room
    this.navCtrl.pop();
  }

  public showUserInfoPage(idUser: string) {
    this.navCtrl.push('UserPage', {userId: idUser});
  }

  lunchChatPage(id: string, name: string) {
    this.navCtrl.push('ChatPage', {chatType: ChatType.STD_CONVERSATION, id: id, pageTitle: name});
  }

  private parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
  }

  private daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
  }

}
