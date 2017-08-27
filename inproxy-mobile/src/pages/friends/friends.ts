import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
//import {UserServiceProvider} from "../../providers/user-service/user-service";
//import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

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

  friendsList: Array<{name: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController/*, private userService: UserServiceProvider, private auth: AuthServiceProvider*/) {
    this.friendsList = [
      {name: 'Obi'},
      {name: 'Ani'},
      {name: 'Padme'},
      {name: 'Yoda'},
      {name: 'Luke'},
      {name: 'Han'}
    ]
    // userService.getFriends().subscribe(success => {
    //     if (success) {
    //       //let friendList = this.auth.currentUser.friends;
    //       for (let friend in this.auth.currentUser.friends) {
    //         var friendToList = {
    //           name : friend.firstName + ' ' + friend.lastName,
    //         }
    //         this.friendsList.push(friendToList);
    //       }
    //
    //     } else {
    //       this.showPopup("Error", "Problem retriving friends.");
    //     }
    //   },
    //   error => {
    //     this.showPopup("Error", error);
    //   });
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
