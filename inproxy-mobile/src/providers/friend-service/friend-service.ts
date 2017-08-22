import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequestProvider } from '../http-request/http-request';
import {API_ADDRESS, VERSION, AUTH_ENDPOINT, USERS_ENDPOINT, FRIENDREQUEST_ENDPOINT} from '../constants/constants';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the FriendServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
export class Friend {

}

@Injectable()
export class FriendServiceProvider {
  friendList: any;
  constructor(private request : HttpRequestProvider, private storage : Storage, /*private auth: AuthServiceProvider*/) {
    this.friendList = null;
  }

  public getFriendList() {
    return Observable.create(observer => {
      if (this.friendList != null) {
        observer.next(true);
        observer.complete();
      }
      else {
        this.request.get(API_ADDRESS + VERSION + FRIENDREQUEST_ENDPOINT, {
          /*id: this.auth.currentUser.id,*/
        }).then(function (result) {
          if (result.ok) {
            // TODO : remplir la liste d'amis
            observer.next(true);
            observer.complete();
          } else {
            return Observable.throw('Error with API');
          }
        });
      }
    });
  }

}
