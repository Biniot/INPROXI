import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Modal, ModalOptions, NavController, IonicPage, ModalController } from 'ionic-angular';

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
  ILatLng,
  VisibleRegion
  // MyLocation
} from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation';

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
  polyPoints: ILatLng[];
  subsRec: any;
  currentZone: {
    polyPoints: ILatLng[],
    zoneName: String,
    isPublic: Boolean,
    zoneAdm: String
  };
  allZones: [{
    polyPoints: ILatLng[],
    zoneName: String,
    isPublic: Boolean,
    zoneAdm: String
  }];
  // allZones: any;
  // zoneAdm: String;
  zoneName: String;

  constructor(public navCtrl: NavController,
              private modal: ModalController,
              private googleMaps: GoogleMaps,
              private geoLoc: Geolocation) {

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
      polyPoints : points,
      zoneName : name,
      isPublic : true,
      zoneAdm : adm
    });

    // this.currentZone.polyPoints = [];
    // this.currentZone.zoneName   = "";
    // this.currentZone.isPublic   = true;
    // this.currentZone.zoneAdm    = "";

    // this.allZones[0].polyPoints = this.currentZone.polyPoints;
    // this.allZones[0].zoneName   = this.currentZone.zoneName;
    // this.allZones[0].isPublic   = this.currentZone.isPublic;
    // this.allZones[0].zoneAdm    = this.currentZone.zoneAdm;

    this.allZones = [{
      polyPoints: this.currentZone.polyPoints,
      zoneName: this.currentZone.zoneName,
      isPublic: this.currentZone.isPublic,
      zoneAdm: this.currentZone.zoneAdm
    }];
    //
    this.initMap();
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
    this.map = this.googleMaps.create(element)
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
    this.map.moveCamera(options).then(res => {console.log("move camera: " + res);},
      err => { console.error("move camera: " + err); })
  }

  createMarker(loc: LatLng){
    let markerOptions: MarkerOptions = {
      position: loc,
      icon: 'magenta'
    };
    return  this.map.addMarker(markerOptions);
  }

  createPolygMarkers(mpts: ILatLng[]){
    for (let i = 0; i < mpts.length; i++){
     let spt = new LatLng(mpts[i].lat, mpts[i].lng);

      this.createMarker(spt).then((marker: Marker) => {
          marker.showInfoWindow();
        },err => { console.error(err); });
    }
  }

  createPolygon(mpts: ILatLng[]){
    // if (mpts === []){
    //   return("empty polygon");
    // }
    let polygOptions: PolygonOptions = {
      points: mpts,
      strokeColor: '#e60000',
      fillColor: 'rgba(0,0,0,0)',
      strokeWidth: 3,
      visible: true
    };
    this.map.addPolygon(polygOptions).then((polyg : Polygon) => {
      polyg.setVisible(true);
      polyg.setClickable(false);
    }, err => { console.error("addPolygon: " + err); });
  }

  createAllPolygons(allZones : [{ polyPoints : ILatLng[],
    zoneName : String,
    isPublic : Boolean,
    zoneAdm : String }])
  {
    // allZones : [{ polyPoints : ILatLng[],
    //   zoneName : String,
    //   isPublic : Boolean,
    //   zoneAdm : String }];
    let polyn : String;
    // let polyg : ILatLng[];
    this.map.clear().then(res => {
      console.log("mapClear: " + res);
      for (let i = 1; i <= allZones.length; i++){
        let polyg: ILatLng[];
        polyg = allZones[i].polyPoints;
        this.createPolygon(polyg);
      }
    },err => { console.error("mapClear: " + err); });

  }

  // centerMap() {
  //   this.getLocation().then(res => {
  //     this.loc = new LatLng(res.coords.latitude, res.coords.longitude);
  //
  //     this.map.clear().then(res => {
  //       this.moveCam(this.loc);
  //       console.log(res);
  //       this.createMarker(this.loc).then((marker: Marker) => {
  //         marker.hideInfoWindow();
  //       }, err => { console.error(err); });
  //     }, err=> {console.error(err);});
  //   }, err => { console.error(err); });
  // }

  createZone()
  {
    let formerState: Boolean;
    formerState = this.recordPolyg;
    this.recordPolyg = !formerState;
    if (formerState === false)
    {
      this.iconAddPolyg = "square";
      this.getClickPos();
    }
    else
    {
      // this.recordPolyg = false;
      this.iconAddPolyg ="add";
      // envoyer sur le serveur
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

    this.currentZone.zoneName = "";
    this.subsRec = this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
      spt = new LatLng(e.lat, e.lng);
      mpts.push(spt);
      console.log("Lat: " + spt.lat + "Lng: " + spt.lng);
      this.map.clear().then(res => {
        if (mkr === true) {
          this.createMarker(spt).then(res => {
            if (res != null) { mkr = false; }
          }, err => { console.error("createMarker" + err); });
        }
        this.currentZone.polyPoints = mpts;
        this.currentPolyg = mpts;
        this.createPolygon(mpts);
        console.log("mapClear: " + mpts);
      },err => { console.error("mapClear: " + err); });
    },err => { console.error("getClickPos: " + err); });
  }

  saveZone()
  {
    // const saveZoneOptions: ModalOptions = {
    // };

    // let i: number;
    // i = this.allZones.length;
    //
    // let zoneData =
    //   {
    //   // this.currentZone;
    //     polyPoints: this.currentZone.polyPoints,
    //     zoneName: this.currentZone.zoneName,
    //     isPublic: this.currentZone.isPublic,
    //     zoneAdm: this.currentZone.zoneAdm
    //   };
    const data = {
          polyPoints: this.currentZone.polyPoints,
          zoneName: this.currentZone.zoneName,
          isPublic: this.currentZone.isPublic,
          zoneAdm: this.currentZone.zoneAdm
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
      polyPoints : ILatLng[],
      zoneName : String,
      isPublic : Boolean,
      zoneAdm : String
    }) => {
      let i = this.allZones.length;
      console.log('MODAL DATA', allData);
      console.log('data ' + allData.isPublic);
      this.allZones.push(allData);
      // this.allZones[i] = {
      //   polyPoints : allData.polyPoints,
      //   zoneName : allData.zoneName,
      //   isPublic : allData.isPublic,
      //   zoneAdm : allData.zoneAdm
      // };
      console.log('manip :' + this.allZones[i].zoneName);

        this.createAllPolygons(this.allZones);

      // this.map.clear().then(res => {
      //   // console.log(this.allZones[i].polyPoints[0].toString());
      //   // this.createPolygon(this.allZones[i].polyPoints);
      //   // this.createAllPolygons(this.allZones);
      // },err => { console.error("mapClear: " + err); });
     });
  }


}
