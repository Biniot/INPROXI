import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from "../../providers/user-service/user-service";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  loading: Loading;
  registerCredentials = {email : '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController, private userService: UserServiceProvider) {
  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(
      allowed => {
        this.userService.refreshProvider();
        this.navCtrl.setRoot('MapsPage');
        },
      error => this.showError(error));
  }

  public anonymousLogin() {
    this.showLoading();
    this.auth.anonymousLogin();
    this.navCtrl.setRoot('MapsPage');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Login Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
