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
  ILatLng
  // MyLocation
} from '@ionic-native/google-maps';

import {Geolocation} from '@ionic-native/geolocation';

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})

export class MapsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  _loc: LatLng;
  _record: Boolean;
  _icon: String;

  constructor(public navCtrl: NavController,
              private _googleMaps: GoogleMaps,
              private _geoLoc: Geolocation) {
  }

  ngAfterViewInit() {
    this._record = false;
    this._icon = "add";

    this.initMap();
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.setMyLocationEnabled(true);
      this.map.getMyLocation().then( location => {

        this._loc = location.latLng;
        this.moveCam(this._loc);
      }, err => {console.error(err);});
    });
  }

  //Load the map
  initMap() {
    let element = this.mapElement.nativeElement;
    this.map = this._googleMaps.create(element)
  }

  getLocation() {
    return this._geoLoc.getCurrentPosition();
  }

  moveCam(loc : LatLng) {
    let options : CameraPosition<any> = {
      target: loc,
      zoom: 15,
      tilt: 10
    };
    this.map.moveCamera(options).then( () => {}, err => {console.error(err);})
  }

  createMarker(loc: LatLng) {
    let markerOptions: MarkerOptions = {
      position: loc,
      icon: 'magenta'
    };
    return  this.map.addMarker(markerOptions);
  }

  createPolygMarkers(_mpts: ILatLng[]) {
    for (let i = 0; i < _mpts.length; i++) {
     let _spt = new LatLng(_mpts[i].lat, _mpts[i].lng);

      this.createMarker(_spt).then((marker: Marker) => {
          marker.showInfoWindow();
        },err => { console.error(err); });
    }
  }

  createPolygon(_mpts: ILatLng[]) {
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

  // centerMap()
  // {
  //   this.getLocation().then( res => {
  //     this._loc = new LatLng(res.coords.latitude, res.coords.longitude);
  //
  //     this.map.clear().then(() => {
  //       this.moveCam(this._loc);
  //       this.createMarker(this._loc).then((marker: Marker) => {
  //         marker.hideInfoWindow();
  //       }, err => { console.error(err); });
  //     }, err=> {console.error(err);});
  //   }, err => { console.error(err); });
  // }

  getClickPos(_rec: Boolean)
  {
    let _mpts: ILatLng[];
    let _spt : LatLng;

    let _counter = 0;
    _mpts = [];
    this._record = !_rec;

    if (this._record == true) {
      this._icon = "square";
    }
    else {
      this._icon ="add";
    }

    let _sub = this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
      if (this._record == false) {
        // _counter = 0;
        // _mpts = [];
        //TODO: push _mpts in an array of IlatLng
        _sub.unsubscribe();
      }

      if (this._record == true) {
        _spt = new LatLng(e.lat, e.lng);
        _mpts.push(_spt);
        this.createPolygMarkers(_mpts);

        if (_counter > 0) {
          this.map.clear().then(() => {
            this.createPolygMarkers(_mpts);
            this.createPolygon(_mpts);
            }, err => { console.error(err); });
        }

        _counter++;
        console.log(_counter);
      }
    },err => { console.error(err); });
  }

}
