import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {User, UserServiceProvider} from "../../providers/user-service/user-service";

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
  editUserSucces = false;
  imageSrc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private auth: AuthServiceProvider,
              private alertCtrl: AlertController, private userService: UserServiceProvider) {
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
    this.currentUser = this.auth.getCurrentUser();
    this.imageSrc = null;
  }

  public editUser() {
    if (this.imageSrc != null) {
      // TODO : save local a faire
      //this.currentUser.avatar_path = this.imageSrc;
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
          this.imageSrc = file_uri;
          // TODO : file_uri suffisant ?
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
