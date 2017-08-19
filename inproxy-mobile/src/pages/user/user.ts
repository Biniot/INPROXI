import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider, User} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the UserPage page.
 *
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
  // check home pour avatar_path
  constructor(public navCtrl: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController) {
    // TODO : Check si c'est le user connecter; Si pas le user (le user regarde un profile d'amis).; Si pas le user retirer les btn de la view pour gerer le viez friend
    // this.auth.getUserInfo().subscribe(success => {
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
    this.auth.deleteUser().subscribe(success => {
        if (success) {
          this.deleteUserSucces = true;
          // TODO : Clear currentUser ?
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
              // TODO : verifier retour qu debut de lapp
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
