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
  token: string;
  password: string;
  id: any;

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
        }).then(result => {
          console.log(result);
          if (result.id) {
            observer.next(true);
          } else {
            observer.next(JSON.parse(result._body));
          }
          observer.complete();
        }).catch(err => {
          console.error('error in register : ' + err);
          observer.next = false;
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
        this.request.get(API_ADDRESS + VERSION + USERS_ENDPOINT, {
          id: this.currentUser.id,
        }).then(function (result) {
          if (result.ok) {
            this.currentUser.firstName = result.user.first_name;
            this.currentUser.lastName = result.user.last_name;
            //this.currentUser.pseudo = result.user.pseudo;
            this.currentUser.email = result.user.email;
            this.currentUser.token = result.user.token;
            this.isUserLoad = true;
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
    return Observable.create(observer => {
      this.request.put(API_ADDRESS + VERSION + USERS_ENDPOINT, {
        password: this.currentUser.password,
        id: this.currentUser.id,
        first_name: user.first_name != null ? user.first_name : null,
        last_name: user.last_name != null ? user.last_name : null,
        email: user.email != null ? user.email : null,
        newPassword: user.password != null ? user.password : null,
        //pseudo: user.pseudo != null ? user.pseudo : null
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

  public deleteUser() {
    // TODO : Check si user connecter
      return Observable.create(observer => {
        this.request.del(API_ADDRESS + VERSION + USERS_ENDPOINT, {
          id: this.currentUser.id,
          password: this.currentUser.password
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
    this.currentUser = new User("toto@g.m", "Toto Bouh");
    this.currentUser.avatar_path = null;
    this.currentUser.password = null;
    // TODO : getLocal a faire avatarpath token id password email
  }
}
