import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  CameraPosition,
  LatLng,
  GoogleMapsEvent,
  Marker,
  MarkerOptions,
  Polygon,
  PolygonOptions,
  ILatLng } from '@ionic-native/google-maps';

import {Geolocation} from '@ionic-native/geolocation';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})

export class MapsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  _loc: LatLng;
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

        this.createMarker(this._loc).then((marker: Marker) => {
          marker.showInfoWindow();
          },err => {console.log(err);});
      }, err => {console.log(err);});
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
        zoom: 30,
        tilt: 10
      };
    this.map.moveCamera(options).then( res => {console.log(res);},
        err => {console.log(err);})
  }

  createMarker(loc: LatLng){
    let markerOptions: MarkerOptions = {
      position: loc,
      icon: 'magenta'
    };
    return  this.map.addMarker(markerOptions);
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
        }, err => { console.log(err); });
      }, err=> {console.log(err);});
    }, err => { console.log(err); });
  }

  getClickPos()
  {
    let _mpts: ILatLng[];
    let _spt : LatLng;
    let _counter = 0;
    _mpts = [];


    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
      _spt = new LatLng(e.lat, e.lng);
      _mpts.push(_spt);
      console.log("Lat: " + _spt.lat);
      console.log("Lng: " + _spt.lng);

      // this.createMarker(_spt).then((marker: Marker) => {
      //   marker.hideInfoWindow();
      // },err => { console.log(err); });

      if (_counter > 1)
      {
        let polygOptions: PolygonOptions = {
          points: _mpts,
          strokeColor: '#e60000',
          strokeWidth: 3,
          visible: true
        };

        this.map.addPolygon(polygOptions).then( (_polyg : Polygon) => {
          _polyg.setVisible(true);
          _polyg.setClickable(false);
        }, err => {console.log(err);});
      }
      _counter++;
      console.log(_counter);
    },err => { console.log(err); });
    console.log("test");
  }
}

