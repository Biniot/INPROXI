import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GroupDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-detail',
  templateUrl: 'group-detail.html',
})
export class GroupDetailPage {
  isLocalUserOwner: boolean;
  groupInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("idGroup :" + this.navParams.get("idGroup"));
    this.isLocalUserOwner = false;
    // TODO : recup from db
    this.groupInfo = {
      avatarGroup: "",
      idGroup: this.navParams.get("idGroup"),
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

    this.groupInfo.nbUser = this.groupInfo.users.length;
    this.groupInfo.expirationNbDay = this.daydiff(this.parseDate(new Date()), this.parseDate(this.groupInfo.expirationDate));

  }

  public quitGroup(idGroup: string) {
    // TODO : quitter le group
    this.navCtrl.pop();
  }

  public toUserDetail(idUser: string) {
    this.navCtrl.push('UserPage', {userId: idUser});
  }

  private parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
  }

  private daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
  }

}
