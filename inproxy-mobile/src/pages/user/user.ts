import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { UserServiceProvider} from "../../providers/user-service/user-service";
import { EditUserPage } from '../edit-user/edit-user';
import {User} from "../../model/userModel";
import {isUndefined} from "util";
import {LoginPage} from "../login/login";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {FriendServiceProvider} from "../../providers/friend-service/friend-service";

/**
 * Generated class for the UserPage page.
 * C:\Program Files\MongoDB\Server\3.4\bin
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  currentUser: User;
  deleteUserSucces: boolean;
  isUser: boolean;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
              private userService: UserServiceProvider, private navParams: NavParams, private auth: AuthServiceProvider,
              private friendRequestService: FriendServiceProvider) {
    this.deleteUserSucces = false;
    if (!isUndefined(navParams.get('userId')) && navParams.get('userId') !== localStorage.getItem('userId')) {
      this.isUser = false;
      this.userService.getUserInfoById(navParams.get('userId')).subscribe(success => {
          // TODO : voir comment on recupere lavatar du user depuis lapi a repercuter dans la view
          this.reloadUser();
          //this.currentUser.avatarPath = localStorage.getItem('avatarPath');
          //this.showPopup("Succes", "Succefully retrieve user.");
        },
        error => {
          this.showPopup("Error", error);
        });
    } else {
      this.isUser = true;
      this.userService.getUserInfo().subscribe(success => {
          if (success) {
            this.reloadUser();
            //this.showPopup("Succes", "Succefully retrieve user.");
          } else {
            this.showPopup("Error", "Problem retrieving user.");
          }
        },
        error => {
          this.showPopup("Error", error);
        });
    }

    // TODO : Gestion d'erreur fouaitter
    if (this.currentUser === undefined) {
      this.currentUser = new User("undefined", "undefined");
    }
  }

  public editUserNav() {
    if (localStorage.getItem('userId') !== '59d3c7c88fc60f1c0cf620ec') {
      this.friendRequestService.addFriendRequest('59d3c7c88fc60f1c0cf620ec', "c'est moi !!" + localStorage.getItem('firstName')).subscribe(succes => {
        this.showPopup('Titre', "friend request");
      }, error => {
        this.showPopup(error, "friend request fail");
      });
    } else {
      this.userService.refreshProvider();
      this.userService.getUserInfo();
    }
    this.navCtrl.push('EditUserPage', { "parentPage": this });
  }

  public reloadUser() {
    this.currentUser = new User(localStorage.getItem('lastName'), localStorage.getItem('email'));
    this.currentUser.firstName = localStorage.getItem('firstName');
    this.currentUser.avatarPath = localStorage.getItem('avatarPath');
  }

  public deleteUser(){
    this.userService.deleteUser().subscribe(success => {
        if (success) {
          this.deleteUserSucces = true;
          this.currentUser = null;
        } else {
          this.showPopup("Error", "Problem deleting user.");
        }
      },
      error => {
      // TODO : je ne sais pas pourquoi c'est error qui est retourner sur le subscribe mais lapi renvoie ok
        // console.log('deleteUser error');
        // console.log(error);
        // this.showPopup("Error", error);
      });
    // TODO : retirer le ! quand le TODO du dessus est fix
    if (!this.deleteUserSucces) {
      this.showConfirmDelete();
    }
  }

  showConfirmDelete() {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete this account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.auth.logout(false).subscribe(success => {
              let alert = this.alertCtrl.create({
                title: 'User delete',
                subTitle: 'User successfully delete.',
                buttons: [{
                  text: 'Ok',
                  role: 'cancel',
                  handler: () => {
                    this.navCtrl.setRoot(LoginPage);
                    console.log('Ok clicked');
                  }
                }]
              });
              alert.present();
            }, error => {
              this.showPopup("Error", "Error cleaning account");
            });
            console.log('Delete clicked');
          }
        }
      ]
    });
    alert.present();
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }
}
