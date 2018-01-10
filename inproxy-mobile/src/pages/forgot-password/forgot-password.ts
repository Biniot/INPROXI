import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {isUndefined} from "util";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthServiceProvider,
              private alertCtrl: AlertController) {
    this.email = this.navParams.get('email');
    if (isUndefined(this.email) || this.email == null) {
      this.email = "";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  askNewPassword() {
    this.auth.askNewPassword(this.email).subscribe(success => {
        console.log('ForgotPasswordPage askNewPassword success');
        if (success) {
          console.log('FriendsPage askNewPassword if (success)');
          this.showPopup("Succes", "New password send.");
        } else {
          this.showPopup("Error", "Problem reseting your password.");
        }
      },
      error => {
        console.log('ForgotPasswordPage askNewPassword error');
        console.log(error);
        //this.showPopup("Error", error);
      });
    this.navCtrl.pop();
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
