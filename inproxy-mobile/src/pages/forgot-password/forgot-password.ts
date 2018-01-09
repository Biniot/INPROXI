import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {isUndefined} from "util";
import {UserServiceProvider} from "../../providers/user-service/user-service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {
    this.email = this.navParams.get('email');
    if (isUndefined(this.email) || this.email == null) {
      this.email = "";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  askNewPassword() {
    // this.userService.askNewPassword(this.email).subscribe(success => {
    //     console.log('ForgotPasswordPage askNewPassword success');
    //     if (success) {
    //       console.log('FriendsPage askNewPassword if (success)');
    //       this.showPopup("Succes", "New password send.");
    //     } else {
    //       this.showPopup("Error", "Problem reseting your password.");
    //     }
    //   },
    //   error => {
    //     console.log('ForgotPasswordPage askNewPassword error');
    //     console.log(error);
    //     //this.showPopup("Error", error);
    //   });
    this.navCtrl.pop();
  }

}
