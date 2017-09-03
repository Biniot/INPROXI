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
  friendRequestList: Array<{name: string, message: string, idFriend: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private friendService: FriendServiceProvider, private userService: UserServiceProvider) {
    this.friendRequestList = [
      {name: 'Obi', message: 'Hello there !', idFriend: '123'},
      {name: 'Ani', message: "Don't under estimate my powers", idFriend: '123'},
      {name: 'Padme', message: 'Its a path I cant follow you on', idFriend: '123'},
      {name: 'Yoda', message: 'Party we must', idFriend: '123'},
      {name: 'Luke', message: 'This fight with father went out of hand', idFriend: '123'},
      {name: 'Han', message: 'I know', idFriend: '123'}
    ]
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
