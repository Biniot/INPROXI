import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { UserServiceProvider} from "../../providers/user-service/user-service";
import {User} from "../../model/userModel";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Base64} from "@ionic-native/base64";

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
  imageSrc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
              private alertCtrl: AlertController, private userService: UserServiceProvider, private auth: AuthServiceProvider,
              private base64: Base64) {
    this.currentUser = new User("", "", "", "");
    this.userService.getUserInfo().subscribe(success => {
        if (success) {
          this.currentUser = new User(localStorage.getItem('lastName'), localStorage.getItem('email'), localStorage.getItem('firstName'), localStorage.getItem('avatarPath'));
          console.log("this.currentUser");
          console.log(this.currentUser);
          // this.currentUser.firstName = localStorage.getItem('firstName');
          // this.currentUser.avatarPath = localStorage.getItem('avatarPath');
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
    this.showConfirmSave();
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

  openGallery(): void {
    this.camera.getPicture(this.cameraOptions)
      .then(file_uri =>
        {
          // console.log(file_uri);
          // TODO : Est-ce un path ou autre chose ? Si autre chose revoir pour recup un path sinon cest good
          // console.log("uri");
          // console.log(file_uri);
          this.base64.encodeFile(file_uri).then((base64File: string) => {
            // console.log("base64File");
            // console.log(base64File);

          this.currentUser.avatarPath = base64File;
          this.imageSrc = this.currentUser.avatarPath;
        }, (err) => {
          console.log(err);
        });
        },
        err => console.log(err));
  }

  showConfirmSave() {
    let alert = this.alertCtrl.create({
      title: 'Confirm change',
      message: 'Do you want to save those information?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: () => {
            this.userService.editUser(this.currentUser).subscribe(success => {
              if (success) {
                // if (this.imageSrc !== null) {
                //   localStorage.setItem('img', this.imageSrc);
                // }
                let alert = this.alertCtrl.create({
                  title: 'Save information',
                  subTitle: 'Information successfully change.',
                  buttons: [{
                    text: 'Ok',
                    role: 'cancel',
                    handler: () => {
                      this.navParams.get("parentPage").reloadUser();
                      this.navCtrl.pop();
                    }
                  }]
                });
                alert.present();
              } else {
                this.showPopup("Error", "Problem editing profile.");
              }
            }, error => {
              this.showPopup("Error", error);
            });
            // console.log('Save clicked');
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
          text: 'OK',
          // handler: () => {
          //   if (this.editUserSucces) {
          //     this.navCtrl.pop();
          //   }
          // }
        }
      ]
    });
    alert.present();
  }

}
