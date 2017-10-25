import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {API_ADDRESS, ROOMS_ENDPOINT, VERSION} from "../constants/constants";
import {Observable} from "rxjs/Observable";
import {HttpRequestProvider} from "../http-request/http-request";

/*
  Generated class for the RoomServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RoomServiceProvider {
  private isRoomLoad: boolean;

  constructor(private request : HttpRequestProvider) {
    console.log('Hello RoomServiceProvider Provider');
    this.isRoomLoad = false;
  }

  // public getRoom(idRoom: string) {
  //   return Observable.create(observer => {
  //     if (this.isRoomLoad) {
  //       observer.next(true);
  //       observer.complete();
  //     } else {
  //       this.request.get(API_ADDRESS + VERSION + ROOMS_ENDPOINT + idRoom, {
  //       }).subscribe(
  //         result => {
  //           console.log(result);
  //           //this.isRoomLoad = true;
  //           observer.next(true);
  //           observer.complete();
  //         }, err => {
  //           observer.error(err.message)
  //         });
  //     }
  //   });
  // }
  //
  // public postRoom(name: string, owner: string) {
  //   return Observable.create(observer => {
  //     this.request.post(API_ADDRESS + VERSION + ROOMS_ENDPOINT + localStorage.getItem('userId'), {
  //       name: name,
  //       owner: owner
  //     }).subscribe(
  //       result => {
  //         console.log('postRoom result');
  //         console.log(result);
  //         observer.next(true);
  //         observer.complete();
  //       }, err => {
  //         observer.error(err.message)
  //       });
  //   });
  // }

}
