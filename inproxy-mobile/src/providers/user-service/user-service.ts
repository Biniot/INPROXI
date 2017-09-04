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

  // TODO : Si id est pas une string le convertir
  // Recupere une liste de demande damis emise ou recu par le user connecter
  // TODO : fonction pas claire dans l'API je ne sais pas ce qu'il faut mettre en from / to, le userId connecter ? Faut-il faire 2 requete un pour from un pr to ?
  public getFriendRequests() {
    return Observable.create(observer => {
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
            observer.error(err.message)
          });
    });
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
              // TODO : A réfléchir comment et quand stocker les amis
              //result.friends type : ArrayOf { User }
              // TODO : save dans le currentUser
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
}
