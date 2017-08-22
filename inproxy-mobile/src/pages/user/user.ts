import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {User, UserServiceProvider} from "../../providers/user-service/user-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { EditUserPage } from '../edit-user/edit-user';

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
  deleteUserSucces = false;

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController,
              private userService: UserServiceProvider) {
    // TODO : Check si c'est le user connecter; Si pas le user (le user regarde un profile d'amis).; Si pas le user retirer les btn de la view pour gerer le viez friend
    // this.userService.getUserInfo().subscribe(success => {
    //     if (success) {
    //       this.currentUser = this.auth.getCurrentUser();
    //     } else {
    //       this.showPopup("Error", "Problem retriving all profile's information.");
    //     }
    //   },
    //   error => {
    //     this.showPopup("Error", error);
    //   });
    this.currentUser = auth.getCurrentUser();
  }

  public editUserNav() {
    this.navCtrl.push('EditUserPage');
  }

  public deleteUser(){
    // TODO : pop-up de confirmation
    this.userService.deleteUser().subscribe(success => {
        if (success) {
          this.deleteUserSucces = true;
          // TODO : Clear local data
          this.showPopup("Succes", "Succefully delete user.");
        } else {
          this.showPopup("Error", "Problem deleting user.");
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
