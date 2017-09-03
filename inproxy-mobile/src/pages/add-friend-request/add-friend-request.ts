import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FriendServiceProvider} from "../../providers/friend-service/friend-service";

/**
 * Generated class for the AddFriendRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-friend-request',
  templateUrl: 'add-friend-request.html',
})
export class AddFriendRequestPage {
  friendRequestCredentials = {email : '', firstName: '', lastName: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private friendRequestProvider: FriendServiceProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFriendRequestPage');
  }

  public addFriend() {
    // TODO : avoir l'id friend a partir des friendRequestCredentials
    this.friendRequestProvider.addFriendRequest('').subscribe(success => {
        this.showPopup("Succes", "Succefully add request friend.");
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
