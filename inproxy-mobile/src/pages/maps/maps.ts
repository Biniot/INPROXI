import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, IonicPage, ModalController } from 'ionic-angular';

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
  subsRec: any;

  // cncl: HTMLElement;


  constructor(public navCtrl: NavController,
              private modal: ModalController,
              private googleMaps: GoogleMaps,
              private geoLoc: Geolocation) {
  }

  ngAfterViewInit(){
    // let div = document.getElementById("groupMap");
    // let button = div.getElementsByTagName('btnPolygon')[0];
    // let isEnabled = true;
    this.recordPolyg = false;
    this.iconAddPolyg= "add";

    this.initMap();
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.setMyLocationEnabled(true);
      this.map.getMyLocation().then( location => {
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
        }, err => {console.error(err);});
      // button.addEventListener('click', function () ).then(res =>{
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

    console.log(
      "NE lat "  + visible.northeast.lat  +
      " NE lng "  + visible.northeast.lng
    );
    console.log(
      "SW lat " + visible.southwest.lat  +
      " SW lng "  + visible.southwest.lng
    );
   this.visi = visible;
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

  createPolygMarkers(mpts: ILatLng[]){
    for (let i = 0; i < mpts.length; i++){
     let spt = new LatLng(mpts[i].lat, mpts[i].lng);

      this.createMarker(spt).then((marker: Marker) => {
          marker.showInfoWindow();
        },err => {console.error(err);});
    }
  }

  createPolygon(mpts: ILatLng[]){
    let polygOptions: PolygonOptions = {
      points: mpts,
      strokeColor: '#e60000',
      fillColor: 'rgba(0,0,0,0)',
      strokeWidth: 3,
      visible: true
    };

    this.map.addPolygon(polygOptions).then( (polyg : Polygon) => {
      polyg.setVisible(true);
      polyg.setClickable(false);
    }, err => {console.error(err);});
  }

  // centerMap() {
  //   this.getLocation().then( res => {
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
    if (formerState == false)
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
      this.openModal();
    }
  }

  getClickPos()
  {
    let mpts: ILatLng[];
    let spt : LatLng;
    let mkr = true;
    mpts = [];

    this.subsRec = this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
      spt = new LatLng(e.lat, e.lng);
      mpts.push(spt);
      console.log("Lat: " + spt.lat);
      console.log("Lng: " + spt.lng);

        this.map.clear().then(res => {
          if (mkr == true) {
            this.createMarker(spt).then(res => {
              if (res != null) {mkr = false;}
              }, err => {console.error(err);});
          }
          this.currentPolyg = mpts;
          this.createPolygon(mpts);
          console.log(res);
        },err => {console.error(err);});
    },err => { console.error(err); });
  }

  openModal()
  {
    const saveZone = this.modal.create('SaveZonePage');

    saveZone.present().then(res =>{
      console.log(res);
    }, err => {console.error(err)});
  }
}
