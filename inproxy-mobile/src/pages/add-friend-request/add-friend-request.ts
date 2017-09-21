import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FriendServiceProvider} from "../../providers/friend-service/friend-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";

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
  friendRequestCredentials = {name : '', firstName: '', lastName: '', idFriend : '', message: ''};
  friendList: any;
  showList: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private friendRequestProvider: FriendServiceProvider, private userService: UserServiceProvider, private alertCtrl: AlertController) {
    this.showList = false;
  }

  public addFriend() {
    // TODO : avoir l'id friend a partir des friendRequestCredentials
    this.friendRequestProvider.addFriendRequest(this.friendRequestCredentials.idFriend, this.friendRequestCredentials.message).subscribe(success => {
        this.showPopup("Succes", "Succefully add request friend.");
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  public searchForIt(ev: any) {
    let value = ev.target.value;
    if (value.length >= 3) {
      let firstName = '';
      let lastName = null;
      if (value.search(' ') !== -1) {
        let tab = value.split(' ');
        firstName = tab[0];
        lastName = tab[1];
      } else {
        firstName = value;
      }
      this.userService.searchUser(firstName, lastName).subscribe(success => {
          this.friendList = JSON.parse(localStorage.getItem('searchList'));
          if (!this.showList) {
            this.showList = true;
          } else {
            // TODO : faire reload lui
          }
        },
        error => {
          this.showPopup("Error", error);
        });
    }
  }

  public updateForm(friendId: string) {
    for (let friend of this.friendList) {
      if (friend.id === friendId) {
        this.friendRequestCredentials.name = friend.first_name + ' ' + friend.last_name;
        this.friendRequestCredentials.firstName = friend.first_name;
        this.friendRequestCredentials.lastName = friend.last_name;
        this.friendRequestCredentials.idFriend = friend.id;
        this.friendRequestCredentials.message = "Salut c'est " + friend.first_name + ' ' + friend.last_name + ", viens discuter !";
        break;
      }
    }
    // TODO : reload le form
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
