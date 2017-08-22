import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequestProvider } from '../http-request/http-request';
import { API_ADDRESS, VERSION, AUTH_ENDPOINT, USERS_ENDPOINT } from '../constants/constants';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {User} from "../user-service/user-service";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {
  currentUser: User;
  isLoggedIn: boolean;

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
          observer.complete();
        });
      });
    }
  }

  public getCurrentUser() : User {
    return this.currentUser;
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
    this.currentUser = new User("toto@g.m", "Toto Bouh");
    // TODO : getLocal a faire avatarpath token id password email
  }
}
