import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { UserServiceProvider} from "../../providers/user-service/user-service";
import {User} from "../../model/userModel";

/**
 * Generated class for the EditUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-user',
  providers: [Camera],
  templateUrl: 'edit-user.html',
})

export class EditUserPage {
  currentUser: User;
  editUserSucces: boolean;
  imageSrc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
              private alertCtrl: AlertController, private userService: UserServiceProvider) {
    this.editUserSucces = false;
    this.userService.getUserInfo().subscribe(success => {
        if (success) {
          this.currentUser = new User(localStorage.getItem('lastName'), localStorage.getItem('email'));
          this.currentUser.firstName = localStorage.getItem('firstName');
          this.currentUser.avatarPath = localStorage.getItem('avatarPath');
        } else {
          this.showPopup("Error", "Problem retriving all profile's information.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
    this.imageSrc = null;
  }

  public editUser() {
    if (this.imageSrc != null) {
      localStorage.setItem('avatarPath', this.imageSrc);
    }
    this.userService.editUser(this.currentUser).subscribe(success => {
        if (success) {
          this.editUserSucces = true;
          this.showPopup("Success", "Profile edited.");
        } else {
          this.showPopup("Error", "Problem editing profile.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  cameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    quality: 100,
    targetWidth: 1000,
    targetHeight: 1000,
    encodingType: this.camera.EncodingType.JPEG,
    correctOrientation: true
  }

  private openGallery(): void {
    this.camera.getPicture(this.cameraOptions)
      .then(file_uri =>
        {
          // TODO : Est-ce un path ou autre chose ? Si autre chose revoir pour recup un path sinon cest good
          this.imageSrc = file_uri;
        },
        err => console.log(err));
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (this.editUserSucces) {
              this.navCtrl.pop();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
