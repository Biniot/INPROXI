import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RoomDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-room-detail',
  templateUrl: 'room-detail.html',
})
export class RoomDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("idRoom :" + this.navParams.get("idRoom"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomDetailPage');
  }

}
