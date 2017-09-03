import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { UserServiceProvider} from "../../providers/user-service/user-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { EditUserPage } from '../edit-user/edit-user';
import {User} from "../../model/userModel";

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

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController,
              private userService: UserServiceProvider, private navParams: NavParams) {
    this.deleteUserSucces = false;
    // if (navParams.get('userId') === localStorage.getItem('userId')) {
    //   this.isUser = true;
    //   this.userService.getUserInfo().subscribe(success => {
    //       if (success) {
    //         this.currentUser = new User(localStorage.getItem('lastName'), localStorage.getItem('email'));
    //         this.currentUser.firstName = localStorage.getItem('firstName');
    //         this.currentUser.avatarPath = localStorage.getItem('avatarPath');
    //         this.showPopup("Succes", "Succefully retrieve user.");
    //       } else {
    //         this.showPopup("Error", "Problem retrieving user.");
    //       }
    //     },
    //     error => {
    //       this.showPopup("Error", error);
    //     });
    // } else {
    //   this.isUser = false;
    //   this.userService.getUserInfoById(navParams.get('userId')).subscribe(success => {
    //       // TODO : voir comment on recupere lavatar du user depuis lapi a repercuter dans la view
    //       this.currentUser = new User(success.last_name, success.email);
    //       this.currentUser.firstName = success.first_name;
    //       //this.currentUser.avatarPath = localStorage.getItem('avatarPath');
    //       this.showPopup("Succes", "Succefully retrieve user.");
    //     },
    //     error => {
    //       this.showPopup("Error", error);
    //   });
    // }
  }

  public editUserNav() {
    this.navCtrl.push('EditUserPage');
  }

  public deleteUser(){
    // TODO : pop-up de confirmation  avec mdp
    // this.userService.deleteUser().subscribe(success => {
    //     if (success) {
    //       this.deleteUserSucces = true;
    //       this.currentUser = null;
    //       localStorage.clear();
    //       this.showPopup("Succes", "Succefully delete user.");
    //     } else {
    //       this.showPopup("Error", "Problem deleting user.");
    //     }
    //   },
    //   error => {
    //     this.showPopup("Error", error);
    //   });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (this.deleteUserSucces) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
