import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FriendServiceProvider} from "../../providers/friend-service/friend-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the CheckFriendRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-check-friend-request',
  templateUrl: 'check-friend-request.html',
})
export class CheckFriendRequestPage {
  friendRequestList: Array<{id: string, from: string, to: string, message: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private friendService: FriendServiceProvider, private userService: UserServiceProvider) {

    this.userService.getFriendRequests().subscribe(success => {
        if (success) {
          let stringRequest = localStorage.getItem('friendRequests');
          if (stringRequest === 'undefined') {
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Problem retrieving friend request.',
              buttons: [{
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  this.userService.refreshFriendRequests();
                  this.navCtrl.pop();
                }
              }]
            });
            alert.present();
          } else {
            this.friendRequestList = JSON.parse(localStorage.getItem('friendRequests'));
          }
        } else {
          this.showPopup("Error", "Problem retriving friend request.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
    userService.getFriendRequests().subscribe(success => {
        if (success) {

        } else {
          this.showPopup("Error", "Problem retriving friend's request.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  public manageFriendRequest(idFriendRequest: string, isAccepted: boolean) {
    this.friendService.answerFriendRequest(isAccepted, idFriendRequest).subscribe(
      success => {
          if (success) {
            // TODO : Reload la list
            this.showPopup("Succes", "Succefully respond request.");
          } else {
            this.showPopup("Error", "Problem responding request.");
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
          // handler: () => {
          // }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckFriendRequestPage');
  }

}
