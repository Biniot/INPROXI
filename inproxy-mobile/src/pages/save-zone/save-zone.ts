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
  polyPoints: ILatLng[];
  zoneName: String;
  isPublic: Boolean;
  zoneAdm: String;

  allData : {
    polyPoints: ILatLng[],
    zoneName: String,
    isPublic: Boolean,
    zoneAdm: String
  };

  constructor(private navParams: NavParams,
              private view: ViewController) {
  }

  ionViewWillLoad() {
    this.allData = this.navParams.get('zone');
    this.polyPoints = this.allData.polyPoints;
    this.zoneName = this.allData.zoneName;
    this.isPublic = this.allData.isPublic;
    this.zoneAdm = this.allData.zoneAdm;
  }

  closeModal(){
    this.view.dismiss(this.allData).then(res => {
      console.log("closeModal: " + res);
      }, err => { console.error(err); });
  }

  public validateZone()
  {
    this.allData = {
      polyPoints: this.polyPoints,
      zoneName: this.allData.zoneName,
      isPublic: this.isPublic,
      zoneAdm: this.zoneAdm
    };
    this.closeModal();
  }
}
