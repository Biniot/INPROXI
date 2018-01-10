import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ConversationRoomModel} from "../../model/conversationRoomModel";

/*
  Generated class for the RoomMessageServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RoomMessageServiceProvider {
  constructor(public http: Http) {
    console.log('Hello RoomMessageServiceProvider Provider');
  }



}
