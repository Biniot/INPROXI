import {Component, ViewChild, ElementRef, Injectable, NgZone} from '@angular/core';
import {
  Modal, NavController, IonicPage, ModalController, AlertController, LoadingController,
  Events
} from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { Geolocation } from '@ionic-native/geolocation';
import { User } from "../../model/userModel";

import {
GoogleMaps,
GoogleMap,
CameraPosition,
LatLng,
MarkerOptions,
Polygon,
PolygonOptions,
ILatLng,
VisibleRegion,
LatLngBounds,
BaseArrayClass,
GoogleMapsEvent
} from '@ionic-native/google-maps';
import {RoomServiceProvider} from "../../providers/room-service/room-service";
import {Room} from "../../model/roomModel";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {IoServiceProvider} from "../../providers/io-service/io-service";
import {Observable} from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})

export class MapsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  loc: any;
  visi: VisibleRegion;
  iconAddPolyg: String;
  currentUser: User;

  coordNewArea:any;
  allZones: Room[];
  loading: any;
  isMapLoad: boolean;
  isAddingArea: boolean;

  constructor(public navCtrl: NavController, private modal: ModalController, private googleMaps: GoogleMaps,
              private geoLoc: Geolocation, private roomService : RoomServiceProvider,
              private alertCtrl: AlertController, public loadingCtrl: LoadingController,
              private _userService: UserServiceProvider, private ioService: IoServiceProvider, public zone: NgZone) {
    this._userService.getUserInfo().subscribe(success => {
        // console.log('HomePage getUserInfo functionSuccess');
        // console.log(success);
      },
      error => {
        // console.log('HomePage getUserInfo functionError');
        // console.log(error);
      });
    this.isMapLoad = false;
    this.isAddingArea = false;
    this.coordNewArea = [];
    this.allZones = [];
    this.iconAddPolyg = "add";

    this.roomService.getRoom().subscribe(success => {
        if (success) {
          console.log('roomService.getRoom success');
          console.log(success);
          success.forEach(elem => {
            let newElem = new Room();
            newElem.admin_id = elem.admin_id;
            newElem.name = elem.name;
            newElem.id = elem.id;
            // newElem.coords = [];
            newElem.coords = JSON.parse(elem.coords[0]);
            console.log(newElem.coords);
            console.log(newElem.coords[0]);
            // let tabCoords = elem.coords[0].split(',');
            // for (let i = 0; i < tabCoords.length; i++) {
            //   newElem.coords.push(new LatLng(parseFloat(tabCoords[i]), parseFloat(tabCoords[i + 1])));
            //   i++;
            // }
            console.log(JSON.stringify(newElem));
            this.allZones.push(newElem);
            this.updateAreas();
            // this.ioService.addConversation(newElem);
          });
        } else {
          this.showPopup("Error", "Problem downloading areas.");
        }
        // this.loading.dismiss();
      },
      error => {
        this.showPopup("Error", error);
        // this.loading.dismiss();
      });
  }

  checkCoordClean(coord: any) {
    try {
      coord.forEach(elem => {
        if (elem.lat == null || elem.lng == null) {
          return false;
        }
      });
    } catch (Ex) {
      return false;
    }
    return true;
  }

  addMarkerToMap(latLng: any) {
    this.zone.run(() => {
      console.log("addMarkerToMap");
      if (this.isAddingArea) {
        console.log("this.isAddingArea");
        this.map.clear().then(res => {
          console.log("map.clear().then");
          let lat = parseFloat(latLng.toString().split(" ")[1].split(",")[0]);
          let lng = parseFloat(latLng.toString().split(" ")[3].split("}")[0]);
          this.coordNewArea.push({lat: lat, lng: lng});
          if (this.coordNewArea.length == 1) {
            console.log("print marker");
            this.map.addMarker({
              'position': {lat: lat, lng: lng},
              'icon': 'magenta'
            }).then((data) => {
                console.log("addMarker success");
                console.log(JSON.stringify(data));
              },
              (err) => {
                console.log("addMarker err");
                console.log(err);
              });
          } else  {
            console.log("print area");
            if (this.containsLocation(this.loc, this.coordNewArea)) {
              console.log("print area in");
              this.map.addPolygon({
                'points': this.coordNewArea,
                'strokeColor' : '#0000FF',
                'strokeWidth': 3,
                'fillColor' : 'rgba(0,0,0,0)',
                'visible': true
              });
            } else {
              console.log("print area out");
              this.map.addPolygon({
                'points': this.coordNewArea,
                'strokeColor' : '#e60000',
                'strokeWidth': 3,
                'fillColor' : 'rgba(0,0,0,0)',
                'visible': true
              });
            }
          }
        },err => { console.error("mapClear err: " + err); });
      }
    });
  }

  createArea() {
    if (!this.isAddingArea) {
      this.iconAddPolyg = "square";
    } else {
      this.iconAddPolyg ="add";
      // TODO : re init si lenght < 3
      if (this.coordNewArea.length < 3) {
        this.isAddingArea = !this.isAddingArea;
      } else {
        this.saveZone();
      }
    }
    this.isAddingArea = !this.isAddingArea;
  }

  updateAreas() {
    console.log("updateAreas");
    console.log(JSON.stringify(this.allZones));
    if (this.isMapLoad) {
      this.map.clear().then(res => {
        console.log("updateAreas map.clear().then");
        this.allZones.forEach(elem => {
          console.log(JSON.stringify(elem));
          // if (this.containsLocation(this.loc, elem.coords)) {
            this.ioService.addConversation(elem);
            this.map.addPolygon({
              'points': elem.coords,
              'strokeColor': '#0000FF',
              'strokeWidth': 3,
              'fillColor': 'rgba(0,0,0,0)',
              'visible': true
            });
          // } else {
          //   // TODO : removeConversation
          //   this.ioService.userOut(elem);
          //   this.map.addPolygon({
          //     'points': elem.coords,
          //     'strokeColor': '#e60000',
          //     'strokeWidth': 3,
          //     'fillColor': 'rgba(0,0,0,0)',
          //     'visible': true
          //   });
          // }
        });
      }, err => {
        console.error("mapClear err: " + err);
      });
    } else {
      console.log("updateAreas will not update map not ready");
    }
  }

  centerView() {
    if (this.isMapLoad) {
      this.map.setMyLocationEnabled(true);
      this.map.getMyLocation().then(location => {
        this.loc = location.latLng;
        this.moveCam(this.loc);

        this.getView();
      }, err => {
        console.error("centerView err");
        console.error(err);
      });
    }
  }

  ionViewWillEnter() {
    //this.presentLoadingText("Downloading areas...");
    if (!this.isMapLoad) {
      let element = this.mapElement.nativeElement;
      this.map = this.googleMaps.create(element);
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.isMapLoad = true;
        console.log("this.isMapLoad = true;");
        this.map.setMyLocationEnabled(true);
        this.map.getMyLocation().then(location => {
          this.loc = location.latLng;
          this.moveCam(this.loc);
          this.addMarkerToMap(location);
          this.getView();
          this.updateAreas();
          this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((latLng: any) => {
            this.addMarkerToMap(latLng);
          },err => { console.error("getClickPos err: " + err); });
        }, err => { console.error("getMyLocation err");console.error(err); });
      });
    } else {
      this.updateAreas();
      this.centerView();
    }

  }
  // //Load the groupMap
  // initMap(){
  //   let element = this.mapElement.nativeElement;
  //   this.map = this.googleMaps.create(element);
  // }

  getLocation(){
    return this.geoLoc.getCurrentPosition();
  }

  getView()
  {
    let visible: VisibleRegion;
    visible = this.map.getVisibleRegion();
    this.visi = visible;
  }

  moveCam(loc : LatLng){
    let options : CameraPosition<any> = {
      target: loc,
      zoom: 15,
      tilt: 10
    };
    this.map.moveCamera(options).then(res => {console.log("move camera success: " + res);},
      err => { console.error("move camera err: " + err); })
  }

  saveZone()
  {
    const data = {
          coords: this.coordNewArea,
          name: "",
          admin_id: localStorage.getItem('userId')
    };

    let saveZone: Modal = this.modal.create(
      'SaveZonePage',
      { zone: data }
    );

    saveZone.present().then(res =>{
      console.log(res);
    }, err => { console.error(err) });

    saveZone.onDidDismiss((allData : any) => {
      console.log('saveZone.onDidDismiss');
      console.log(JSON.stringify(allData));
      allData.coords = JSON.stringify(allData.coords);
      console.log('alldata: ' + allData.coords);
      this.coordNewArea = [];
      this.presentLoadingText("Uploading new area...");
      this.roomService.addRoom(allData).subscribe(success => {
          if (success) {
            console.log('onDidDismiss addRoom success');
            success.coords = JSON.parse(success.coords);
            //this.ioService.addConversation(success);
            this.allZones.push(success);
            this.updateAreas();
          } else {console.log(JSON.stringify(success));
            this.showPopup("Error", "Problem uploading new area.");
          }
          this.loading.dismiss();
        },
        error => {
          this.showPopup("Error", error);
          this.loading.dismiss();
        });
    });
  }

  containsLocation(position : ILatLng, path: ILatLng[])
  {
    let pos = new LatLng(position.lat, position.lng);
    if (pos === null) {
      return false;
    }
    if (path instanceof BaseArrayClass) {
      path = path.getArray();
    }
    let points = JSON.parse(JSON.stringify(path));

    let first = points[0],
      last = points[points.length - 1];
    if (first.lat !== last.lat || first.lng !== last.lng) {
      points.push({
        lat: first.lat,
        lng: first.lng
      });
    }
    let point = {
      lat: pos.lat,
      lng: pos.lng
    };
    let wn = 0,
      bounds = new LatLngBounds(points),
      sw = bounds.southwest,
      ne = bounds.northeast,
      offsetLng360 = sw.lng <= 0 && ne.lng >= 0 && sw.lng < ne.lng ? 360 : 0;
    sw.lng += offsetLng360;
    point.lng += offsetLng360;
    points = points.map(function(vertex) {
      vertex.lng += +offsetLng360;
      return vertex;
    });
    let vt, a, b;
    for (let i = 0; i < points.length - 1; i++) {
      a = points[i];
      b = points[i + 1];

      if ((a.lat <= point.lat) && (b.lat > point.lat)) {
        vt = (point.lat - a.lat) / (b.lat - a.lat);
        if (point.lng < (a.lng + (vt * (b.lng - a.lng)))) {
          wn++;
        }
      } else if ((a.lat > point.lat) && (b.lat <= point.lat)) {
        vt = (point.lat - a.lat) / (b.lat - a.lat);
        if (point.lng < (a.lng + (vt * (b.lng - a.lng)))) {
          wn--;
        }
      }
    }
    return (wn !== 0);
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // if (this.deleteUserSucces) {
            //   this.navCtrl.popToRoot();
            // }
          }
        }
      ]
    });
    alert.present();
  }

  presentLoadingText(message: string) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: message
    });

    this.loading.present();
  }

}
