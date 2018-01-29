import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpRequestProvider} from "../http-request/http-request";
import {Observable} from "rxjs/Observable";
import {API_ADDRESS, ROOM_ENDPOINT, VERSION} from "../constants/constants";

/*
  Generated class for the RoomServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RoomServiceProvider {

  constructor(private request : HttpRequestProvider) {
    console.log('Hello RoomServiceProvider Provider');
  }

  public addRoom(room) {
    console.log("addRoom(room)");
    console.log(JSON.stringify(room.coords));
    console.log(room.coords);
    return Observable.create(observer => {
      this.request.post(API_ADDRESS + VERSION + ROOM_ENDPOINT, {
        name : room.name,
        admin_id : localStorage.getItem('userId'),
        coords : room.coords
      }).subscribe(
        result => {
          console.log('addRoom result');
          console.log(JSON.stringify(result));
          observer.next(result);
          observer.complete();
        }, err => {
          observer.error(err.message);
        });
    });
  }

  public editRoom(room) {
    return Observable.create(observer => {
      this.request.put(API_ADDRESS + VERSION + ROOM_ENDPOINT + room.id, {
        name : room.name,
        coords: room.coords
      }).subscribe(
        result => {
          console.log('editRoom result');
          console.log(JSON.stringify(result));
          observer.next(result);
          observer.complete();
        }, err => {
          observer.error(err.message)
        });
    });
  }

  public getRoom() {
    return Observable.create(observer => {
      this.request.get(API_ADDRESS + VERSION + ROOM_ENDPOINT, {
      }).subscribe(
        result => {
          console.log('getRoom result');
          console.log(JSON.stringify(result));
          observer.next(result);
          observer.complete();
        }, err => {
          observer.error(err.message);
        });
    });
  }

  public deleteRoom(idRoom: string) {
    return Observable.create(observer => {
      this.request.del(API_ADDRESS + VERSION + ROOM_ENDPOINT + idRoom, {}).subscribe(
        result => {
          observer.next(true);
          observer.complete();
        }, err => {
          observer.error(err.message);
        });
    });
  }

}
