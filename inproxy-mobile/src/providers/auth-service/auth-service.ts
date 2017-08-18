import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequestProvider } from '../http-request/http-request';
import { API_ADDRESS, VERSION, AUTH_ENDPOINT, USERS_ENDPOINT } from '../constants/constants';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export class User {
  email: string;
  firstName: string;
  lastName: string;
  avatar_path: string;
  pseudo: string;
  password: string;

  constructor(lastName: string, email: string) {
    this.lastName = lastName;
    this.email = email;
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;
  isLoggedIn: boolean;
  isUserLoad: boolean;

  public login(credentials) {
    if (credentials.email === undefined || credentials.password === undefined) {
      return Observable.throw('Password and/or email required');
    } else {
      return Observable.create(observer => {
        this.request.post(API_ADDRESS + VERSION + AUTH_ENDPOINT, {
          email: credentials.email,
          password: credentials.password
        }).then(result => {
          this.isLoggedIn = result.token ? true : false;
          if (this.isLoggedIn) {
            this.storage.set("token", result.token).then(
              () => console.log('Success'),
              error =>  console.error('Error in storage', error)
            );
            observer.next(true);
          } else
            observer.next(JSON.parse(result._body));
          observer.complete();
        }).catch(error => {
          console.error('error in login : ' + error);
          observer.next(false);
          observer.complete();
        });
      })
    }
  }

  public register(credentials) {
    if (credentials.email === undefined || credentials.password === undefined ||
        credentials.firstName === undefined || credentials.lastName === undefined) {
      return Observable.throw('Password and/or email required');
    } else {
      return Observable.create(observer => {
        this.request.post(API_ADDRESS + VERSION + USERS_ENDPOINT, {
          first_name: credentials.firstName,
          last_name: credentials.lastName,
          email: credentials.email,
          password: credentials.password
        }).then(function (result) {
          if (result.ok) {
            observer.next(true);
            observer.complete();
          } else {
            return Observable.throw('Error with API');
          }
        });
      });
    }
  }

  public getCurrentUser() : User {
    return this.currentUser;
  }

  public getUserInfo() {
    return Observable.create(observer => {

      if (this.isUserLoad) {
        observer.next(true);
        observer.complete();
      }
      else {
        // TODO : mettre le bon chemin et arg
        this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT, {
          email: this.currentUser.email,
        }).then(function (result) {
          if (result.ok) {
            // TODO : A verifier ou son placer les donnees
            this.currentUser.firstName = result.user.firstName;
            this.currentUser.lastName = result.user.lastName;
            this.currentUser.pseudo = result.user.pseudo;
            this.currentUser.firstName = result.user.firstName;
            this.isUserLoad = true;
            // TODO : Return A verifier
            observer.next(true);
            observer.complete();
          } else {
            return Observable.throw('Error with API');
          }
        });
      }
    });
  }

  public editUser(user) {
    // TODO : A voir undefined ou null
    if (user.email === undefined && user.password === undefined
      && user.firstName === undefined && user.lastName === undefined
      && user.pseudo === undefined) {
      return Observable.throw('Password and/or email required');
    } else {
      return Observable.create(observer => {
        // TODO : mettre le bon chemin, update API pour stoquer les autres variables si elles ne sont pas null (forcement une non null)
        this.request.post(API_ADDRESS + VERSION + USERS_ENDPOINT, {
          first_name: user.first_name != null ? user.first_name : null,
          last_name: user.last_name != null ? user.last_name : null,
          email: user.email != null ? user.email : null,
          password: user.password != null ? user.password : null,
          pseudo: user.pseudo != null ? user.pseudo : null
        }).then(function (result) {
          if (result.ok) {
            observer.next(true);
            observer.complete();
          } else {
            return Observable.throw('Error with API');
          }
        });
      });
    }
  }

  public deleteUser() {
    // TODO : Check si user connecter
      return Observable.create(observer => {
        // TODO : mettre le bon chemin, Est-ce qu'on redemande le mdp sur le delete ?
        this.request.post(API_ADDRESS + VERSION + USERS_ENDPOINT, {
          email: this.currentUser.email != null ? this.currentUser.email : null/*,
          password: user.password != null ? user.password : null,*/
        }).then(function (result) {
          if (result.ok) {
            observer.next(true);
            observer.complete();
          } else {
            return Observable.throw('Error with API');
          }
        });
      });
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    })
  }

  constructor(private request : HttpRequestProvider, private storage : Storage) {
    this.isLoggedIn = false;
    this.isUserLoad = false;
    // TODO : A voir undefined ou null
    this.currentUser.password = null;
    this.currentUser.pseudo = null;
    // TODO : getLocal a faire
    //this.currentUser.avatar_path = ;
  }
}
