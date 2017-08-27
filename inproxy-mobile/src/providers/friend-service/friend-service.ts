import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequestProvider } from '../http-request/http-request';
import {API_ADDRESS, VERSION, AUTH_ENDPOINT, USERS_ENDPOINT, FRIENDREQUEST_ENDPOINT} from '../constants/constants';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
//import {UserServiceProvider} from "../user-service/user-service";

/*
  Generated class for the FriendServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
// TODO : renommer en friendRequestProvider
@Injectable()
export class FriendServiceProvider {
  //friendList: any;
  constructor(private request : HttpRequestProvider, private storage : Storage/*, private auth: AuthServiceProvider, private userService: UserServiceProvider*/) {
    //this.friendList = null;
  }

  public addFriendRequest(idFriend : string) {
    // return Observable.create(observer => {
    //     this.request.post(API_ADDRESS + VERSION + FRIENDREQUEST_ENDPOINT, {
    //       to : idFriend,
    //       from : this.auth.currentUser.id
    //     }).then(function (result) {
    //       if (result.ok) {
    //         this.userService.iSFriendLoad = false;
    //         observer.next(true);
    //         observer.complete();
    //       } else {
    //         return Observable.throw('Error with API');
    //       }
    //     });
    // });
  }

  // Repond a une demande damis 'accept' ou 'remove' status doit etre mis dans le body
  public answerFriendRequest(isAccepted : boolean, idFriendRequest: string) {
    return Observable.create(observer => {
      this.request.post(API_ADDRESS + VERSION + FRIENDREQUEST_ENDPOINT + idFriendRequest, {
        //idFriendRequest : idFriendRequest,
        status : isAccepted ? 'accept' : 'remove'
      }).then(function (result) {
        if (result.ok) {
          this.userService.iSFriendLoad = false;
          observer.next(true);
          observer.complete();
        } else {
          return Observable.throw('Error with API');
        }
      });
    });
  }

}
