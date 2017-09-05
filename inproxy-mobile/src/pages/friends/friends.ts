import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {FriendServiceProvider} from "../../providers/friend-service/friend-service";
import {isUndefined} from "util";

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
  friendsList: Array<{name: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private userService: UserServiceProvider, private friendRequestService: FriendServiceProvider) {
    this.friendsList = [
      {name: 'Obi'},
      {name: 'Ani'},
      {name: 'Padme'},
      {name: 'Yoda'},
      {name: 'Luke'},
      {name: 'Han'}
    ]
    this.haveRequest = false;
    // userService.getFriends().subscribe(success => {
    //     if (success) {
    //       let tab = JSON.parse(localStorage.getItem('friends'));
    //       console.log(tab);
    //       // TODO : link friendsList et tab
    //     } else {
    //       this.showPopup("Error", "Problem retriving friends.");
    //     }
    //   },
    //   error => {
    //     this.showPopup("Error", error);
    //   });
    userService.getFriendRequests().subscribe(success => {
        if (success) {
          let stringRequest = localStorage.getItem('friendRequests');
          if (stringRequest === 'undefined') {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

}
