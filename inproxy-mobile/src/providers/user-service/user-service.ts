import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequestProvider } from '../http-request/http-request';
import { Storage } from '@ionic/storage';
import { API_ADDRESS, VERSION, AUTH_ENDPOINT, USERS_ENDPOINT, GET_FRIENDREQUEST_ENDPOINT, FRIEND_ENDPOINT } from '../constants/constants';
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

  constructor(private request : HttpRequestProvider, private storage : Storage) {
    this.isUserLoad = false;
    this.iSFriendLoad = false;
  }

  // Recupere les information de lutilisateur connecter
  public getUserInfo() {
    /*return Observable.create(observer => {
      if (this.isUserLoad) {
        observer.next(true);
        observer.complete();
      } else {
        this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId'), {
          //id: this.auth.currentUser.id
        }).subscribe(
          result => {
            localStorage.setItem('firstName', result.user.firstName);
            localStorage.setItem('lastName', result.user.lastName);
            localStorage.setItem('email', result.user.email);
            localStorage.setItem('token', result.user.token);
            this.isUserLoad = true;
            observer.next(true);
            observer.complete();
          }, err => {
            return Observable.throw('Error with API');
          });
      }
    });*/
  }

  // Recupere un user a partir dun idUser
  public getUserInfoById(id) {
    /*return Observable.create(observer => {
      this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + id, {
      }).subscribe(
        result => {
          observer.next(result.user);
          observer.complete();
        }, err => {
          return Observable.throw('Error with API');
        });
    });*/
  }

  // TODO : Si id est pas une string le convertir
  // Recupere une liste de demande damis emise ou recu par le user connecter
  // TODO : fonction pas claire dans l'API je ne sais pas ce qu'il faut mettre en from / to, le userId connecter ? Faut-il faire 2 requete un pour from un pr to ?
  public getFriendRequests() {
    /*return Observable.create(observer => {
        this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId') + GET_FRIENDREQUEST_ENDPOINT, {
        //from: localStorage.getItem('userId'),
        //to: localStorage.getItem('userId')
        }).subscribe(
          result => {
            //result.frs.message ClassOf frs {message: string, from: string(id), to: string(id) }
            // TODO : a traiter
            observer.next(true);
            observer.complete();
          }, err => {
            return Observable.throw('Error with API');
          });
    });*/
  }

  // Recupere une liste damis a partir de lid du user connecter
  public getFriends() {
    /*return Observable.create(observer => {
      if (this.iSFriendLoad) {
        observer.next(true);
        observer.complete();
      }
      else {
          this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId') + FRIEND_ENDPOINT, {
          }).subscribe(
            result => {
              // TODO : A réfléchir comment et quand stocker les amis
              //result.friends type : ArrayOf { User }
              // TODO : save dans le currentUser
              this.iSFriendLoad = true;
              observer.next(true);
              observer.complete();
            }, err => {
              return Observable.throw('Error with API');
            });
      }});*/
  }

  // Edit les informations du user connecter
  public editUser(user) {
    /*return Observable.create(observer => {
      this.request.put(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId'), {
        password: localStorage.getItem('password'),
        //id: this.auth.currentUser.id,
        first_name: user.firstName != null ? user.firstName : null,
        last_name: user.lastName != null ? user.lastName : null,
        email: user.email != null ? user.email : null,
        newPassword: user.password != null ? user.password : null,
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
          return Observable.throw('Error with API');
        });
    });*/
  }

  // Supprime le user connecter
  public deleteUser() {
    /*return Observable.create(observer => {
      this.request.del(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId'), {
        password: localStorage.getItem('password')
      }).subscribe(
          result => {
            observer.next(true);
            observer.complete();
          }, err => {
            return Observable.throw('Error with API');
          });
    });*/
  }
}
