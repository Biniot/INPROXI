import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequestProvider } from '../http-request/http-request';
import {API_ADDRESS, VERSION, FRIENDREQUEST_ENDPOINT} from '../constants/constants';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the FriendServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
// TODO : renommer en friendRequestProvider
@Injectable()
export class FriendServiceProvider {
  constructor(private request : HttpRequestProvider) {
  }

  public addFriendRequest(idFriend : string) {
    return Observable.create(observer => {
        this.request.post(API_ADDRESS + VERSION + FRIENDREQUEST_ENDPOINT, {
          to : idFriend,
          from : localStorage.getItem('userId')
        }).subscribe(
          result => {
            observer.next(true);
            observer.complete();
          }, err => {
            observer.error(err.message)
          });
    });
  }

  // Repond a une demande damis 'accept' ou 'remove' status doit etre mis dans le body
  public answerFriendRequest(isAccepted : boolean, idFriendRequest: string) {
    return Observable.create(observer => {
      this.request.put(API_ADDRESS + VERSION + FRIENDREQUEST_ENDPOINT + idFriendRequest, {
        //idFriendRequest : idFriendRequest,
        status : isAccepted ? 'accept' : 'remove'
      }).subscribe(
        result => {
          observer.next(true);
          observer.complete();
        }, err => {
          observer.error(err.message)
        });
    });
  }

}
