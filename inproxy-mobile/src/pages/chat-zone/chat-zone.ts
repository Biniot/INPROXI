import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatZonePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-zone',
  templateUrl: 'chat-zone.html',
})
export class ChatZonePage {
  currentRoom: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentRoom = this.navParams.get('room');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatZonePage');
  }

}
