import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { API_ADDRESS, VERSION, USERS_ENDPOINT } from '../../providers/constants/constants';

import { GoogleMaps,
  GoogleMap,
  CameraPosition,
  LatLng,
  GoogleMapsEvent,
  Marker,
  MarkerOptions } from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  _loc: LatLng;

  constructor(public navCtrl: NavController,
              private request : HttpRequestProvider,
              private _googleMaps: GoogleMaps,
              private _geoLoc: Geolocation) {
  }

  ngAfterViewInit(){
    // let loc: LatLng;
    this.initMap();

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.getLocation().then( res => {
        this._loc = new LatLng(res.coords.latitude, res.coords.longitude);
        this.moveCam(this._loc);

        this.createMarker(this._loc, "blue").then((marker: Marker) => {
          marker.showInfoWindow();
        }).catch(err => {
          console.log(err);
        });
      }).catch( err => {
        console.log(err);
      });

    });
  }

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
    // this.map.setCameraTarget(loc);
    this.map.moveCamera(options).then( res => {}, err => {})
  }

  createMarker(loc: LatLng, icn: string){
    let markerOptions: MarkerOptions = {
      position: loc,
      icon: icn
    };
    return  this.map.addMarker(markerOptions);
  }

  centerMap()
  {
    this.moveCam(this._loc);
  }

  // public testRequest() {
  //
  //   this.request.del(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId'), {password: 'lol2'})
  //     .subscribe(
  //       result => {
  //         console.log('Success');
  //         console.log(result);
  //       },
  //       err => {
  //         console.log('Error');
  //         console.error(err);
  //       });
  // }


}
