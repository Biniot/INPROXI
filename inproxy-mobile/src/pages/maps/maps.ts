import {Component, ViewChild, ElementRef} from '@angular/core';
import {Button, NavController} from 'ionic-angular';

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
  _recordPolyg: Boolean;
  _recordEdit: Boolean;
  _iconAddPolyg: String;
  _iconEditPolyg: String;
  _polyg: ILatLng[];
  _cncl: HTMLElement;

  constructor(public navCtrl: NavController,
              private _googleMaps: GoogleMaps,
              private _geoLoc: Geolocation) {
  }


  ngAfterViewInit() {
    this._recordPolyg = false;
    this._recordEdit = false;
    this._iconAddPolyg = "add";
    this._iconEditPolyg = "construct";
    this._polyg = [];
    this._cncl = document.getElementById("cancelEdit");
    this._cncl.style.display = "none";

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
      flat: true,
      icon: 'magenta'
    };

    return  this.map.addMarker(markerOptions);
  }


  createPolygMarkers(_mpts: ILatLng[]) {
    for (let i = 0; i < _mpts.length; i++) {
     let _spt = new LatLng(_mpts[i].lat, _mpts[i].lng);

      this.createMarker(_spt).then((marker: Marker) => {
          // marker.showInfoWindow();
          this._recordEdit == true ? marker.setDraggable(true): marker.setDraggable(false);


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



  addPolyPoints(_rec: Boolean) {
    let _mpts: ILatLng[];
    let _spt : LatLng;

    this._recordPolyg = !_rec;
    let _counter = 0;
    _mpts = [];

    if (!_rec == true) {
      this._iconAddPolyg = "square";
    }
    else {
      this._iconAddPolyg ="add";
    }

    let _sub = this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
      if (this._recordPolyg == false) {
        // _counter = 0;
        // _mpts = [];
        this._polyg = _mpts;
        //TODO: push _mpts in an array of IlatLng
        _sub.unsubscribe();
      }

      if (this._recordPolyg == true) {
        _spt = new LatLng(e.lat, e.lng);
        _mpts.push(_spt);
        this.createPolygMarkers(_mpts);

        if (_counter > 0) {
          this.map.clear().then(() => {
            this.createPolygMarkers(_mpts);
            this.createPolygon(_mpts);
            this._polyg = _mpts;
            }, err => { console.error(err); });
        }
        _counter++;
        console.log(_counter);
      }
    },err => { console.error(err); });

  }

  editPolyPoints(_rec: Boolean) {
    let _oldpts = this._polyg;

    this._recordEdit = !_rec;

    if (!_rec == true) {
      this._iconEditPolyg = "checkmark-circle";
      // let _cncl = document.getElementById("cancelEdit");
      this._cncl.style.display = "block";
    }
    else {
      this._iconEditPolyg ="construct";
      // let _cncl = document.getElementById("cancelEdit");
      this._cncl.style.display = "none"
    }

    this.map.clear().then(() => {
      this.createPolygMarkers(_oldpts);
      this.createPolygon(_oldpts);
      // this._polyg = _oldpts;
    }, err => { console.error(err); });

  }


}
