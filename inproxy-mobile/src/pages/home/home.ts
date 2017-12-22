import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  CameraPosition,
  LatLng,
  Marker,
  MarkerOptions,
  Polygon,
  PolygonOptions,
  ILatLng
  // MyLocation
} from '@ionic-native/google-maps';

import {Geolocation} from '@ionic-native/geolocation';
import {IoServiceProvider} from "../../providers/io-service/io-service";
import {PrivateMessageStorageProvider} from "../../providers/custom-storage/private-message-storage";
import {UserServiceProvider} from "../../providers/user-service/user-service";
//import {GeofenceProvider} from "../../providers/geofence/geofence";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  _loc: LatLng;

  constructor(public navCtrl: NavController,
              private _googleMaps: GoogleMaps,/* private _geofence: GeofenceProvider,*/
              private _geoLoc: Geolocation, private _ioService: IoServiceProvider, private _userService: UserServiceProvider) {
    if (!this._ioService.isConnected()) {
      this._ioService.connectSocket();
    }
    this._userService.getUserInfo().subscribe(success => {
        // console.log('HomePage getUserInfo functionSuccess');
        // console.log(success);
      },
      error => {
        // console.log('HomePage getUserInfo functionError');
        // console.log(error);
      });
  }

  ngAfterViewInit(){
    // this.initMap();
    // this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
    //   this.map.setMyLocationEnabled(true);
    //   this.map.getMyLocation().then( location => {
    //
    //     this._loc = location.latLng;
    //     this.moveCam(this._loc);
    //   }, err => {console.error(err);});
    // });

  }

  //Load the groupMap
  initMap(){
    let element = this.mapElement.nativeElement;
    this.map = this._googleMaps.create(element)
  }

  getLocation(){
    return this._geoLoc.getCurrentPosition();
  }

  moveCam(loc : LatLng){
    let options : CameraPosition<any> = {
      target: loc,
      zoom: 15,
      tilt: 10
    };
    this.map.moveCamera(options).then( res => {console.log(res);},
      err => {console.error(err);})
  }

  createMarker(loc: LatLng){
    let markerOptions: MarkerOptions = {
      position: loc,
      icon: 'magenta'
    };
    return  this.map.addMarker(markerOptions);
  }

  createPolygon(_mpts: ILatLng[]){
    let polygOptions: PolygonOptions = {
      points: _mpts,
      strokeColor: '#e60000',
      strokeWidth: 3,
      visible: true
    };

    this.map.addPolygon(polygOptions).then( (_polyg : Polygon) => {
      _polyg.setVisible(true);
      _polyg.setClickable(false);
    }, err => {console.error(err);});
  }

  centerMap()
  {
    this.getLocation().then( res => {
      this._loc = new LatLng(res.coords.latitude, res.coords.longitude);

      this.map.clear().then(res => {
        this.moveCam(this._loc);
        console.log(res);
        this.createMarker(this._loc).then((marker: Marker) => {
          marker.hideInfoWindow();
        }, err => { console.error(err); });
      }, err=> {console.error(err);});
    }, err => { console.error(err); });
  }
}
