import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequestProvider } from '../http-request/http-request';
import { Storage } from '@ionic/storage';
import {
  API_ADDRESS, VERSION, USERS_ENDPOINT, GET_FRIENDREQUEST_ENDPOINT, FRIEND_ENDPOINT,
  SEARCH_USER_ENDPOINT
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

  constructor(private request : HttpRequestProvider, private storage : Storage) {
    this.isUserLoad = false;
    this.iSFriendLoad = false;
    this.isFriendRequestLoad = false;
  }

  // Recupere les information de lutilisateur connecter
  public getUserInfo() {
    return Observable.create(observer => {
      if (this.isUserLoad) {
        observer.next(true);
        observer.complete();
      } else {
        this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId'), {
          //id: this.auth.currentUser.id
        }).subscribe(
          result => {
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
      }
    });
  }

  // Recupere un user a partir dun idUser
  public getUserInfoById(id) {
    return Observable.create(observer => {
      this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + id, {
      }).subscribe(
        result => {
          observer.next(result.user);
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
        observer.next(true);
        observer.complete();
      }
      else {
        this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId') + GET_FRIENDREQUEST_ENDPOINT, {
        }).subscribe(
          result => {
            if (result.length >= 1) {
              localStorage.setItem('friendRequests', JSON.stringify(result));
            }
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
      if (this.iSFriendLoad) {
        observer.next(true);
        observer.complete();
      }
      else {
          this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId') + FRIEND_ENDPOINT, {
          }).subscribe(
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
      }});
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
          //localStorage.setItem('password', user.password);
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
    localStorage.removeItem('searchList');
    return Observable.create(observer => {
      this.request.get(API_ADDRESS + VERSION + SEARCH_USER_ENDPOINT, {
        first_name: firstName,
        last_name: lastName
      }).subscribe(
        result => {
          console.log(result);
          if (result.length >= 1) {
            console.log('searchList');
            console.log(JSON.stringify(result));
            localStorage.setItem('searchList', JSON.stringify(result));
          }
          observer.next(true);
          observer.complete();
        }, err => {
          observer.error(err.message)
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
            observer.error(err.message)
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
