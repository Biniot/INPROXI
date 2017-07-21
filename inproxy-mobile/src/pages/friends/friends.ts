import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  friendsList: Array<{name: string, message: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.friendsList = [
      {name: 'Obi', message: 'Hello there !'},
      {name: 'Ani', message: "Don't under estimate my powers"},
      {name: 'Padme', message: 'Its a path I cant follow you on'},
      {name: 'Yoda', message: 'Party we must'},
      {name: 'Luke', message: 'This fight with father went out of hand'},
      {name: 'Han', message: 'I know'}
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }



}
