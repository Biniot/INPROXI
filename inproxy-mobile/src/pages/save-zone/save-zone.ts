import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ILatLng } from "@ionic-native/google-maps";
// import {takeUntil} from "rxjs/operator/takeUntil";

/**
 * Generated class for the SaveZonePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-save-zone',
  templateUrl: 'save-zone.html'
})

export class SaveZonePage {
  coords: ILatLng[];
  name: String;
  admin_id: String;

  allData : {
    coords: ILatLng[],
    name: String,
    admin_id: String
  };

  constructor(private navParams: NavParams,
              private view: ViewController) {
  }

  ionViewWillLoad() {
    this.allData = this.navParams.get('zone');
    this.coords = this.allData.coords;
    this.name = this.allData.name;
    this.admin_id = this.allData.admin_id;
  }

  closeModal(){
    this.view.dismiss(this.allData).then(res => {
      console.log("closeModal: " + res);
      }, err => { console.error(err); });
  }

  public validateZone()
  {
    this.allData = {
      coords: this.coords,
      name: this.allData.name,
      admin_id: this.admin_id
    };
    this.closeModal();
  }
}
