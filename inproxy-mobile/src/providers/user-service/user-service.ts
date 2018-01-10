import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequestProvider } from '../http-request/http-request';

import {
  API_ADDRESS, VERSION, USERS_ENDPOINT, GET_FRIENDREQUEST_ENDPOINT, FRIEND_ENDPOINT,
  SEARCH_USER_ENDPOINT, GET_USER_CONVERSATION
} from '../constants/constants';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
//import {AuthServiceProvider} from "../auth-service/auth-service";
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class UserServiceProvider {
  isUserLoad: boolean;
  iSFriendLoad: boolean;
  isFriendRequestLoad: boolean;
  isConversationtLoad: boolean;

  constructor(private request : HttpRequestProvider) {
    this.isUserLoad = false;
    this.iSFriendLoad = false;
    this.isFriendRequestLoad = false;
    this.isConversationtLoad = false;
  }

  // Recupere les information de lutilisateur connecter
  public getUserInfo() {
    return Observable.create(observer => {
      // if (this.isUserLoad) {
      //   observer.next(true);
      //   observer.complete();
      // } else {
        this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId'), {
          //id: this.auth.currentUser.id
        }).subscribe(
          result => {
            console.log("UserServiceProvider getUserInfo");
            console.log(result);
            localStorage.setItem('firstName', result.first_name);
            localStorage.setItem('lastName', result.last_name);
            localStorage.setItem('email', result.email);
            this.isUserLoad = true;
            observer.next(true);
            observer.complete();
          }, err => {
            observer.error(err.message)
          });
      // }
    });
  }

  // Recupere les information de lutilisateur connecter
  public getUserConversation() {
    console.log("getUserConversation");
    //this.isConversationtLoad = false;
    return Observable.create(observer => {
      /*if (this.isConversationtLoad) {
        observer.next(true);
        observer.complete();
      } else {*/
        this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId') + GET_USER_CONVERSATION, {}).subscribe(
          result => {
            console.log("getUserConversation result");
            console.log(result);
            //this.isConversationtLoad = true;
            observer.next(result);
            observer.complete();
          }, err => {
            console.log("getUserConversation result");
            console.log(err);
            observer.error(err.message)
          });
      //}
    });
  }

  // Recupere un user a partir dun idUser
  public getUserInfoById(id) {
    console.log('getUserInfoById [' + id + ']');
    return Observable.create(observer => {
      this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + id, {
      }).subscribe(
        result => {
          console.log(result);
          observer.next(result);
          observer.complete();
        }, err => {
          observer.error(err.message)
        });
    });
  }

  // Recupere une liste de demande damis emise ou recu par le user connecter
  public getFriendRequests() {
    return Observable.create(observer => {
      if (this.isFriendRequestLoad) {
        console.log('getFriendRequests already load');
        observer.next(true);
        observer.complete();
      } else {
        this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId') + GET_FRIENDREQUEST_ENDPOINT, {
        }).subscribe(
          result => {
            if (result.length >= 1) {
              console.log('getFriendRequests got sth');
              console.log(result);
              localStorage.setItem('friendRequests', JSON.stringify(result));
            }
            console.log('getFriendRequests outside');
            this.isFriendRequestLoad = true;
            observer.next(true);
            observer.complete();},
          err => {
            observer.error(err.message)
          });
      }});
  }

  // Recupere une liste damis a partir de lid du user connecter
  public getFriends() {
    return Observable.create(observer => {
      // if (this.iSFriendLoad) {
      //   observer.next(true);
      //   observer.complete();
      // }
      // else {
      this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId') + FRIEND_ENDPOINT, {}).subscribe(
        result => {
          console.log(result);
          if (result.length >= 1) {
            console.log('saved friends');
            console.log(JSON.stringify(result));
            localStorage.setItem('friends', JSON.stringify(result));
          }
          this.iSFriendLoad = true;
          observer.next(true);
          observer.complete();
        }, err => {
          observer.error(err.message)
        });
    });
  }

  // Edit les informations du user connecter
  public editUser(user) {
    return Observable.create(observer => {
      this.request.put(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId'), {
        password: localStorage.getItem('password'),
        first_name: user.firstName != null ? user.firstName : null,
        last_name: user.lastName != null ? user.lastName : null,
        email: user.email != null ? user.email : null,
        new_password: user.password != null ? user.password : null,
        //pseudo: user.pseudo != null ? user.pseudo : null
      }).subscribe(
        result => {
          localStorage.setItem('password', user.password);
          localStorage.setItem('firstName', user.firstName);
          localStorage.setItem('lastName', user.lastName);
          localStorage.setItem('email', user.email);
          observer.next(true);
          observer.complete();
        }, err => {
          observer.error(err.message)
        });
    });
  }

  public searchUser(firstName: string, lastName: string) {
    return Observable.create(observer => {
      this.request.get(API_ADDRESS + VERSION + SEARCH_USER_ENDPOINT, {
        first_name: firstName,
        last_name: lastName
      }).subscribe(
        result => {
          localStorage.removeItem('searchList');
          console.log('Result search_user');
          console.log(result);
          if (result.length >= 1) {
            console.log('searchList');
            console.log(JSON.stringify(result));
            localStorage.setItem('searchList', JSON.stringify(result));
          }
          observer.next(true);
          observer.complete();
        }, err => {
          observer.error(err.message);
        });
    });
  }

  // Supprime le user connecter
  public deleteUser() {
    return Observable.create(observer => {
      this.request.del(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId'), {
        password: localStorage.getItem('password')
      }).subscribe(
          result => {
            observer.next(true);
            observer.complete();
          }, err => {
            observer.error(err.message);
          });
    });
  }

  public refreshFriend() {
    this.iSFriendLoad = false;
  }

  public refreshUser() {
    this.isUserLoad = false;
  }

  public refreshFriendRequests() {
    this.isFriendRequestLoad = false;
  }

  public refreshProvider() {
    this.isUserLoad = false;
    this.iSFriendLoad = false;
    this.isFriendRequestLoad = false;
    localStorage.removeItem('friends');
    localStorage.removeItem('friendRequests');
  }
}
