import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FriendServiceProvider} from "../../providers/friend-service/friend-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";

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
  tempoList: Array<{id: string, from: string, to: string, message: string}>;
  friendRequestList: Array<{id: string, from: string, to: string, message: string}>;
  //userRequestList: Array<{id: string, from: string, to: string, message: string}>;
  //haveUserRequest: boolean;
  haveFriendRequest: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private friendService: FriendServiceProvider, private userService: UserServiceProvider) {

    this.haveFriendRequest = false;
    // TODO : trier la liste en deux et remettre la vu qui est commenter
    //this.haveUserRequest = false;
    //this.userRequestList = [];
    this.loadList();
  }

  checkIt(id1: string, id2: string) {
    console.log("ID1 : " + id1 + "; ID2 : " + id2);
    if (id1 === id2) {
      return true;
    }
    return false;
  }

  public manageFriendRequest(idFriendRequest: string, isAccepted: boolean) {
    this.friendService.answerFriendRequest(isAccepted, idFriendRequest).subscribe(
      success => {
          if (success) {
            this.showPopup("Succes", "Succefully respond request.");
            this.loadList();
          } else {
            this.showPopup("Error", "Problem responding request.");
          }
        },
        error => {
          this.showPopup("Error", error);
        });
  }

  loadList() {
    this.userService.refreshProvider();
    this.userService.getFriendRequests().subscribe(
      success => {
        if (success) {
          let stringRequest = localStorage.getItem('friendRequests');
          if (stringRequest === 'undefined') {
            // TODO : TIPS TA PAS DAMIS
          } else {
            // TODO : trier la liste en deux et remettre la vu qui est commenter
            this.friendRequestList = JSON.parse(localStorage.getItem('friendRequests'));
            console.log(this.friendRequestList);
            this.haveFriendRequest = true;
          }
        } else {
          this.showPopup("Error", "Problem retriving friend request.");
        }},
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

}
