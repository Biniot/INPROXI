import { Component } from '@angular/core';
import {AlertController, IonicPage} from 'ionic-angular';
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
  friendChoiceList: any;
  friendList: any;
  showList: boolean;

  constructor(private friendRequestProvider: FriendServiceProvider, private userService: UserServiceProvider, private alertCtrl: AlertController) {
    this.showList = false;
    this.userService.getUserInfo().subscribe(success => {
        if (success) {
        } else {
          this.showPopup("Error", "Problem retrieving user.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
    let tab = localStorage.getItem('friends');
    if (tab === 'undefined' || tab === null) {
      this.friendList = [
      ]
    } else {
      this.friendList = JSON.parse(tab);
    }
  }

  public addFriend() {
    console.log('addFriendRequest');
    let isCheat = false;
    if (this.friendChoiceList == null) {
      this.showPopup("Error", "You change the name after you select it, reselect your friend.");
      return;
    }
    this.friendChoiceList.forEach(elem => {
      if (elem.id.localeCompare(this.friendRequestCredentials.idFriend) == 0
        && (elem.first_name.localeCompare(this.friendRequestCredentials.firstName) !== 0
          || elem.last_name.localeCompare(this.friendRequestCredentials.lastName) !== 0)) {
        isCheat = true;
      }
    });

    if (!isCheat) {
      let isFind = false;
      this.friendList.forEach(elem => {
        console.log("friendList forEach");
        console.log(elem);
        if (this.friendRequestCredentials.idFriend.localeCompare(elem.id) == 0) {
          isFind = true;
          console.log("friendList forEach");
        }
      });
      if (this.friendRequestCredentials.idFriend.localeCompare(localStorage.getItem('userId')) == 0) {
        isFind = true;
        this.showPopup("Error", "You can't add yourself.");
        return;
      }
      if (!isFind) {
        this.friendRequestProvider.addFriendRequest(this.friendRequestCredentials.idFriend, this.friendRequestCredentials.message).subscribe(success => {
            this.showPopup("Succes", "Succefully add request friend.");
          },
          error => {
            this.showPopup("Error", error);
          });
      } else {
        this.showPopup("Error", "You already have this friend.");
      }
    } else {
      this.showPopup("Error", "You change the name after you select it, reselect your friend.");
      this.friendRequestCredentials = {name : '', firstName: '', lastName: '', idFriend : '', message: ''};
    }
  }

  public searchForIt(ev: any) {
    let value = ev.target.value;
    if (value.length >= 3) {
      let firstName = '';
      let lastName = '';
      if (value.search(' ') !== -1) {
        let tab = value.split(' ');
        firstName = tab[0];
        lastName = tab[1];
      } else {
        firstName = value;
      }
      // console.log('firstName '+ firstName);
      // console.log('lastName '+ lastName);
      this.userService.searchUser(firstName, lastName).subscribe(success => {
          this.friendChoiceList = JSON.parse(localStorage.getItem('searchList'));
          // console.log(this.friendChoiceList);
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
    for (let friend of this.friendChoiceList) {
      if (friend.id === friendId) {
        this.friendRequestCredentials.name = friend.first_name + ' ' + friend.last_name;
        this.friendRequestCredentials.firstName = friend.first_name;
        this.friendRequestCredentials.lastName = friend.last_name;
        this.friendRequestCredentials.idFriend = friend.id;
        this.friendRequestCredentials.message = "Salut c'est " + localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName') + ", viens discuter !";
        break;
      }
    }
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
