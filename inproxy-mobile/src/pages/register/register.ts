import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
  createSuccess = false;
  registerCredentials = { fistName: '', lastName: '', email: '', password: '' };

  constructor(private navCtrl: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController) { }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(
      success => {
        if (success === true) {
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", success);
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
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
