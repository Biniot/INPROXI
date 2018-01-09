import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';
import { Modal, NavController, IonicPage, ModalController } from 'ionic-angular';
import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { API_ADDRESS, VERSION, ROOM_ENDPOINT_POST } from '../../providers/constants/constants';

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

import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from "rxjs/Observable";

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
  // polyPoints: ILatLng[];
  subsRec: any;
  currentZone: {
    coords: ILatLng[],
    name: String,
    admin_id: String
  };
  allZones: [{
    coords: ILatLng[],
    name: String,
    admin_id: String
  }];
  // allZones: any;
  // admin_id: String;
  //zoneName: String;

  constructor(public navCtrl: NavController,
              private modal: ModalController,
              private googleMaps: GoogleMaps,
              private geoLoc: Geolocation,
              private request : HttpRequestProvider) {
  }

  ngAfterViewInit(){
    let name : String;
    let points: ILatLng[];
    let adm:  String;

    name = "";
    points = [];
    adm = "";

    this.currentPolyg           = [];
    this.recordPolyg            = false;
    this.iconAddPolyg           = "add";

    this.currentZone = ({
      coords : points,
      name : name,
      admin_id : adm
    });

    this.allZones = [{
      coords: this.currentZone.coords,
      name: this.currentZone.name,
      admin_id: this.currentZone.admin_id
    }];
    //
    let element = this.mapElement.nativeElement;
    this.map = this.googleMaps.create(element);
    // this.initMap();
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.setMyLocationEnabled(true);
      this.map.getMyLocation().then(location => {
        this.loc = location.latLng;
        this.moveCam(this.loc);

        this.getView();
        // this.map.on(GoogleMapsEvent.CAMERA_MOVE).subscribe((e) => {
        //   this.getView();
        //   console.log(e);
        // }, err => {console.error(err);});

        // this.map.addEventListener('zoom_changed',this.visi=this.getView());
        // this.map.on(GoogleMapsEvent.MAP_ZO)
        //   {
        //   this.visi = this.getView();
        // }
        //   console.log(res);
        }, err => { console.error(err); });
      // button.addEventListener('click', function ()).then(res =>{
      //   isEnabled = !isEnabled;
      //   button.innerHTML = "<ion-icon name='remove'></ion-icon>";
      //   this.getClickPos(isEnabled);
      //   }, err => {console.error(err);});

    });
  }

  //Load the groupMap
  initMap(){
    let element = this.mapElement.nativeElement;
    this.map = this.googleMaps.create(element);
  }

  getLocation(){
    return this.geoLoc.getCurrentPosition();
  }

  getView()
  {
    let visible: VisibleRegion;
    visible = this.map.getVisibleRegion();
    // console.log(
    //   "NE lat "  + visible.northeast.lat  +
    //   " NE lng "  + visible.northeast.lng
    // );
    // console.log(
    //   "SW lat " + visible.southwest.lat  +
    //   " SW lng "  + visible.southwest.lng
    // );
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


  // Pour edition de polygone: creation des markers des angles qu'on peut ensuite drag, recuperer la nvl pos puis modifier polyg
  // createPolygMarkers(mpts: ILatLng[]){
  //   for (let i = 0; i < mpts.length; i++){
  //    let spt = new LatLng(mpts[i].lat, mpts[i].lng);
  //
  //     this.createMarker(spt).then((marker: Marker) => {
  //         marker.showInfoWindow();
  //       },err => { console.error(err); });
  //   }
  // }

  createPolygon(mpts: ILatLng[]){
    let strkcolor = '';
    this.map.getMyLocation().then(location => {
      this.loc = location.latLng;
      // position.lng = location.latLng.lng;
      }, err => { console.error(err);});

    let isUserIn = this.containsLocation(this.loc, mpts);
    (isUserIn === true) ? (strkcolor = '#0000FF') : (strkcolor = '#e60000');
    let polygOptions: PolygonOptions = {
      points: mpts,
      strokeColor: strkcolor,
      fillColor: 'rgba(0,0,0,0)',
      strokeWidth: 3,
      visible: true
    };
    this.map.addPolygon(polygOptions).then((polyg : Polygon) => {
      polyg.setVisible(true);
      polyg.setClickable(false);
    }, err => { console.error("addPolygon: " + err); });
  }

  createAllPolygons(allZones : [{ coords : ILatLng[],
    name : String,
    admin_id : String }])
  {
    // admin_id: createur de la zone, besoin de recuperer le nom (ou ID) de l'utilisateur

    // allZones : [{ polyPoints : ILatLng[],
    //   zoneName : String,
    //   isPublic : Boolean,
    //   admin_id : String }];
    // let polyn : String;
    // let polyg : ILatLng[];
    this.map.clear().then(res => {
      console.log("mapClear: " + res);
      for (let i = 1; i <= allZones.length; i++){
        let polyg: ILatLng[];
        polyg = allZones[i].coords;
        this.createPolygon(polyg);
      }
    },err => { console.error("mapClear: " + err); });
  }

  createZone()
  {
    // console.log("bloup pidi bloup bloup");
    // console.log("formerstate1 : " + this.recordPolyg);
    let formerState: Boolean;
    formerState = this.recordPolyg;
    // console.log("formerstate2: " + this.recordPolyg);
    this.recordPolyg = !formerState;
    // console.log("formerstate3: " + this.recordPolyg);
    if (formerState === false)
    {
      this.iconAddPolyg = "square";
      // console.log("formerstate: " + this.recordPolyg);
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
        this.createPolygon(mpts);
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

    saveZone.onDidDismiss((allData : {
      name : String,
      admin_id : String,
      coords : ILatLng[]
    }) => {
      return Observable.create(observer => {
        this.post.request.post(API_ADDRESS + VERSION + ROOM_ENDPOINT_POST, allData
        ).subscribe(res => {
          observer.next(true);
          observer.complete();
          }, err => {
          observer.error(err.message);
        });
      });
    });


      // this.allZones.push(allData);
    // this.createAllPolygons(this.allZones);
      // this.map.clear().then(res => {
      //   // console.log(this.allZones[i].polyPoints[0].toString());
      //   // this.createPolygon(this.allZones[i].polyPoints);
      //   // this.createAllPolygons(this.allZones);
      // },err => { console.error("mapClear: " + err); });
     // });
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
