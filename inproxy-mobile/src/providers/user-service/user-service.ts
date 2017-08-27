import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequestProvider } from '../http-request/http-request';
import { API_ADDRESS, VERSION, AUTH_ENDPOINT, USERS_ENDPOINT, GET_FRIENDREQUEST_ENDPOINT, FRIEND_ENDPOINT } from '../constants/constants';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
//import {AuthServiceProvider} from "../auth-service/auth-service";
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export class User {
  email: string;
  firstName: string;
  lastName: string;
  avatar_path: string;
  //pseudo: string;
  token: string;
  password: string;
  id: any;
  friends: {User};
  friendRequests: Array<{name: string, message: string, id: string}>;

  constructor(lastName: string, email: string) {
    this.lastName = lastName;
    this.email = email;
  }
}

@Injectable()
export class UserServiceProvider {
  isUserLoad: boolean;
  iSFriendLoad: boolean;

  constructor(private request : HttpRequestProvider, private storage : Storage/*, private auth: AuthServiceProvider*/) {
    // TODO : utiliser le storage pour load avatar_path et autre a voir token id ???
    // TODO : Refactoriser les providers
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
        /*this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + this.auth.currentUser.id, {
          //id: this.auth.currentUser.id
        }).then(function (result) {
          if (result.ok) {
            this.currentUser.firstName = result.user.first_name;
            this.currentUser.lastName = result.user.last_name;
            //this.currentUser.pseudo = result.user.pseudo;
            this.currentUser.email = result.user.email;
            this.currentUser.token = result.user.token;
            this.isUserLoad = true;
            // TODO : faut-il load ici les amis ou lors de l'accès à la page amis ?
            observer.next(true);
            observer.complete();
          } else {
            return Observable.throw('Error with API');
          }
        });*/
      }
    });
  }
  /* Potentiellement useless
  // Recupere un user a partir dun idUser
  public getUserInfoById(id) {
    return Observable.create(observer => {
        this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT, {
          id: id,
        }).then(function (result) {
          if (result.ok) {
            // TODO : A réfléchir comment et quand stocker les amis
            //result.user type : User
            observer.next(true);
            observer.complete();
          } else {
            return Observable.throw('Error with API');
          }
        });
    });
  }  */

  // TODO : Si id est pas une string le convertir
  // Recupere une liste de demande damis emise ou recu par le user connecter
  // fonction pas claire dans l'API
  public getFriendRequests() {
    /*return Observable.create(observer => {
        this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + this.auth.currentUser.id + GET_FRIENDREQUEST_ENDPOINT, {
        //from: this.auth.currentUser.id,
        //to: this.auth.currentUser.id
        }).then(function (result) {
          if (result.ok) {
            //result.frs.message ClassOf frs {message: string, from: Inconu(id), to: Inconu(id) }
            // TODO : save dans le currentUser
            observer.next(true);
            observer.complete();
          } else {
            return Observable.throw('Error with API');
          }
        });
    });*/
  }

  // TODO : Si id est pas une string le convertir
  // Recupere une liste damis a partir de lid du user connecter
  public getFriends() {
    return Observable.create(observer => {
      if (this.iSFriendLoad) {
        observer.next(true);
        observer.complete();
      }
      else {
        //
        //     this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT + this.auth.currentUser.id + FRIEND_ENDPOINT, {
        //     }).then(function (result) {
        //       if (result.ok) {
        //         // TODO : A réfléchir comment et quand stocker les amis
        //         //result.friends type : ArrayOf { User }
        //          // TODO : save dans le currentUser
        //         this.iSFriendLoad = true;
        //         observer.next(true);
        //         observer.complete();
        //       } else {
        //         return Observable.throw('Error with API');
        //       }
        //     });
      }});
  }

  // Edit les informations du user connecter
  public editUser(user) {
    /*return Observable.create(observer => {
      this.request.put(API_ADDRESS + VERSION + USERS_ENDPOINT + this.auth.currentUser.id, {
        password: this.auth.currentUser.password,
        //id: this.auth.currentUser.id,
        first_name: user.first_name != null ? user.first_name : null,
        last_name: user.last_name != null ? user.last_name : null,
        email: user.email != null ? user.email : null,
        newPassword: user.password != null ? user.password : null,
        //pseudo: user.pseudo != null ? user.pseudo : null
      }).then(function (result) {
        if (result.ok) {
        // // TODO : save dans le currentUser
          observer.next(true);
          observer.complete();
        } else {
          return Observable.throw('Error with API');
        }
      });
    });*/
  }

  // Supprime le user connecter
  public deleteUser() {
    /*return Observable.create(observer => {
      this.request.del(API_ADDRESS + VERSION + USERS_ENDPOINT + this.auth.currentUser.id, {
        //id: this.auth.currentUser.id,
        password: this.auth.currentUser.password
      }).then(function (result) {
        if (result.ok) {
          observer.next(true);
          observer.complete();
        } else {
          return Observable.throw('Error with API');
        }
      });
    });*/
  }
}
