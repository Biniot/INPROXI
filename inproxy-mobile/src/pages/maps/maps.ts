import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GoogleMaps,
         GoogleMap,
        CameraPosition,
         LatLng,
         GoogleMapsEvent,
         GoogleMapOptions,
         Marker,
         MarkerOptions
        } from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation'

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;

  constructor(public navCtrl: NavController,
              private _googleMaps: GoogleMaps,
              private _geoLoc: Geolocation) {}

  ionViewDidLoad()
  {
    let loc: LatLng;
    this.loadMap();
  }

  loadMap() {
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 15,
        tilt: 0
      }
    };

    this.map = this._googleMaps.create(this.mapElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() =>
      {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker(
          {
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position:
              {
                lat: 43.0741904,
                lng: -89.3809802
              }
          })
          .then(marker =>
          {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() =>
              {
                alert('clicked');
              });
          });

      });
  }
//
//   ngAfterViewInit(){
//     let loc: LatLng;
//     this.loadMap();
//
//     loadMap() {
//       this.mapElement = document.getElementById('map');
//
//       let mapOptions: GoogleMapOptions = {
//         camera: {
//           target: {
//             lat: this.,
//             lng: -89.3809802
//           },
//           zoom: 15,
//           tilt: 0
//         }
//       };
//
//     //once the map is ready move
//     //camera into position
//   //   this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
//   //       //Get User location
//   //     this.getLocation().then( res => {
//   //     //Once location is gotten, we set the location on the camera.
//   //       loc = new LatLng(res.coords.latitude, res.coords.longitude);
//   //       this.moveCamera(loc);
//   //
//   //       this.createMarker(loc, "COUCOU! je suis ici").then((marker: Marker) => {
//   //         marker.showInfoWindow();
//   //       }).catch(err => {
//   //         console.log(err);
//   //       });
//   //
//   //     }).catch( err => {
//   //       console.log(err);
//   //     });
//   //
//   //   });
//   // }
//   //
//   // //Load the map
//   // initMap(){
//   //   let element = this.mapElement.nativeElement;
//   //   this.map = this._googleMaps.create(element)
//   // }
//   //
//   // //Get current user location
//   // //Returns promise
//   // getLocation(){
//   //   return this._geoLoc.getCurrentPosition();
//   // }
//   //
//
// //Moves the camera to any location
//   moveCamera(loc : LatLng){
//      // let options : CameraPosition = {
//      //    //specify center of map
//      //    target: loc,
//      //    zoom: 15,
//      //    tilt: 10
//      //  };
//      //  this.map.moveCamera(options)
//   }
//
//   //Adds a marker to the map
//   createMarker(loc: LatLng, title: string){
//     let markerOptions: MarkerOptions = {
//       position: loc,
//       title: title
//     };
//
//     return  this.map.addMarker(markerOptions);
//   }
//

}
