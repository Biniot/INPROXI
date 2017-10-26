import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RoomsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {
  private groupList: any;

  constructor(private navCtrl: NavController) {
    this.groupList = [{name: "ABC", idGroup: "ABC"}, {name: "DEF", idGroup: "DEF"}, {name: "IJK", idGroup: "IJK"}, {name: "LMN", idGroup: "LMN"}];
  }

  public toDetail(idGroup: string) {
    this.navCtrl.push('GroupDetailPage', {"idGroup": idGroup});
  }

}
