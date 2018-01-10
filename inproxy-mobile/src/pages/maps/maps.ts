import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';
import {
  Modal, NavController, IonicPage, ModalController, AlertController, LoadingController,
  Events
} from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { API_ADDRESS, VERSION, ROOM_ENDPOINT_POST } from '../../providers/constants/constants';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from "rxjs/Observable";
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

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})

export class MapsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  loc: LatLng;
  visi: VisibleRegion;
  recordPolyg: Boolean;
  iconAddPolyg: String;
  currentPolyg: ILatLng[];
  post: HttpRequestProvider;
  currentUser: User;
  subsRec: any;
  currentZone: {
    coords: ILatLng[],
    name: String,
    admin_id: String
  };
  allZones: Room[];
  loading: any;

  constructor(public navCtrl: NavController, private modal: ModalController, private googleMaps: GoogleMaps,
              private geoLoc: Geolocation, private request : HttpRequestProvider, private roomService : RoomServiceProvider,
              private alertCtrl: AlertController, public loadingCtrl: LoadingController, public events: Events,
              private _userService: UserServiceProvider, private ioService: IoServiceProvider) {
    this._userService.getUserInfo().subscribe(success => {
        // console.log('HomePage getUserInfo functionSuccess');
        // console.log(success);
      },
      error => {
        // console.log('HomePage getUserInfo functionError');
        // console.log(error);
      });
  }

  presentLoadingText(message: string) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: message
    });

    this.loading.present();
  }

  ionViewWillEnter() {
    this.presentLoadingText("Downloading areas...");
    let name : String;
    let points: ILatLng[];
    let adm:  String;
    this.currentUser = new User(localStorage.getItem('lastName'), localStorage.getItem('email'), localStorage.getItem('firstName'), localStorage.getItem('avatarPath'));
    this.currentUser.userId = localStorage.getItem('userId');

    name = "";
    points = [];
    adm = this.currentUser.userId;

    console.log("CURRENT USER: " + this.currentUser.userId);

    this.currentPolyg           = [];
    this.recordPolyg            = false;
    this.iconAddPolyg           = "add";

    this.currentZone = ({
      coords : points,
      name : name,
      admin_id : adm
    });

    this.allZones = [];
    //
    let element = this.mapElement.nativeElement;
    this.map = this.googleMaps.create(element);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.setMyLocationEnabled(true);
      this.map.getMyLocation().then(location => {
        this.loc = location.latLng;
        this.moveCam(this.loc);

        this.getView();
      }, err => { console.error(err); });
    });
    this.roomService.getRoom().subscribe(success => {
        if (success) {
          console.log('getRoom if (success)');
          this.allZones = [];
          success.forEach(elem => {
            console.log('getRoom forEach');
            console.log(elem);
            let newElem = new Room();
            newElem.admin_id = elem.admin_id;
            newElem.name = elem.name;
            newElem.id = elem.id;
            newElem.coords = [];
            let tabCoords = elem.coords[0].split(',');
            for (let i = 0; i < tabCoords.length; i++) {
              newElem.coords.push(new LatLng(parseFloat(tabCoords[i]), parseFloat(tabCoords[i + 1])));
              i++;
            }
            this.allZones.push(newElem);
            console.log('getRoom push(elem)');
          });
          this.createAllPolygons();
        } else {
          this.showPopup("Error", "Problem downloading areas.");
        }
        this.loading.dismiss();
      },
      error => {
        this.showPopup("Error", error);
        this.loading.dismiss();
      });
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
    this.map.moveCamera(options).then(res => {console.log("move camera bloup: " + res);},
      err => { console.error("move camera: " + err); })
  }

  createMarker(loc: LatLng){
    let markerOptions: MarkerOptions = {
      position: loc,
      icon: 'magenta'
    };
    return  this.map.addMarker(markerOptions);
  }

  createPolygon(mpts: ILatLng[], room : any, needPush: boolean){
    let strkcolor = '';
    console.log("createPolygon 1 ");
    this.map.getMyLocation().then(location => {
      this.loc = location.latLng;
      }, err => { console.error(err);});

    console.log("createPolygon 2 ");
    let isUserIn = this.containsLocation(this.loc, mpts);
    if (/*isUserIn && */needPush) {
      console.log("createPolygon emit ");
      this.ioService.addConversation(room);
    }
    (isUserIn === true) ? (strkcolor = '#0000FF') : (strkcolor = '#e60000');
    console.log("createPolygon 3 ");
    let polygOptions: PolygonOptions = {
      points: mpts,
      strokeColor: strkcolor,
      fillColor: 'rgba(0,0,0,0)',
      strokeWidth: 3,
      visible: true
    };
    console.log("createPolygon 4 ");
    this.map.addPolygon(polygOptions).then((polyg : Polygon) => {
      polyg.setVisible(true);
      polyg.setClickable(false);
    }, err => { console.error("addPolygon: " + err); });
    console.log("createPolygon 5 ");
  }

  createAllPolygons()
  {
    this.map.clear().then(res => {
      console.log("mapClear: " + res);
      this.allZones.forEach(elem => {
        console.log(elem.toString());
        this.createPolygon(elem.coords, elem, true);
      });
    },err => { console.error("mapClear: " + err); });
  }

  createZone()
  {
    // console.log("bloup pidi bloup bloup");
    console.log("formerstate1 : " + this.recordPolyg);
    let formerState: Boolean;
    formerState = this.recordPolyg;
    console.log("formerstate2 : " + this.recordPolyg);
    this.recordPolyg = !formerState;
    console.log("formerstate3 : " + this.recordPolyg);
    if (formerState === false)
    {
      this.iconAddPolyg = "square";
      console.log("formerstate : " + this.recordPolyg);
      this.getClickPos();
    }
    else
    {
      // this.recordPolyg = false;
      this.iconAddPolyg ="add";
      this.subsRec.unsubscribe();
      this.saveZone();
    }
  }

  getClickPos()
  {
    let mpts: ILatLng[];
    let spt : LatLng;
    let mkr = true;
    mpts = [];

    this.currentZone.name = "";
    this.subsRec = this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
      spt = new LatLng(e.lat, e.lng);
      mpts.push(spt);
      console.log("Lat: " + spt.lat + "Lng: " + spt.lng);
      this.map.clear().then(res => {
        console.debug(res);
        if (mkr === true) {
          this.createMarker(spt).then(res => {
            if (res != null) { mkr = false; }
          }, err => { console.error("createMarker" + err); });
        }
        this.currentZone.coords = mpts;
        this.currentPolyg = mpts;
        this.createPolygon(mpts, null, false);
        console.log("mapClear: " + mpts);
      },err => { console.error("mapClear: " + err); });
    },err => { console.error("getClickPos: " + err); });
  }

  saveZone()
  {
    const data = {
          coords: this.currentZone.coords,
          name: this.currentZone.name,
          admin_id: this.currentZone.admin_id
    };

    let saveZone: Modal = this.modal.create(
      'SaveZonePage',
      { zone: data }
      // ,saveZoneOptions
    );

    saveZone.present().then(res =>{
      console.log(res);
    }, err => { console.error(err) });

    saveZone.onDidDismiss((allData : any) => {
      this.presentLoadingText("Uploading new area...");
      this.roomService.addRoom(allData).subscribe(success => {
          if (success) {
            console.log('onDidDismiss addRoom');
            console.log(success);
            console.log(success.coords[0]);
            this.allZones.push(success);
            this.createAllPolygons();
          } else {
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


}
