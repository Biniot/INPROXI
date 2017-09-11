import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GoogleMaps,
         GoogleMap,
         CameraPosition,
         LatLng,
         GoogleMapsEvent,
         Marker,
         MarkerOptions } from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation'

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  _loc: LatLng
  constructor(public navCtrl: NavController,
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

        this.createMarker(this._loc, "COUCOU!").then((marker: Marker) => {
          marker.showInfoWindow();
        }).catch(err => {
          console.log(err);
        });
      }).catch( err => {
        console.log(err);
      });

    });
  }

  //Load the map
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

  createMarker(loc: LatLng, title: string){
    let markerOptions: MarkerOptions = {
      position: loc,
      title: title
    };
    return  this.map.addMarker(markerOptions);
  }

  centerMap()
  {
    this.moveCam(this._loc);
  }
}
