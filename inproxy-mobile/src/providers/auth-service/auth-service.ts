import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequestProvider } from '../http-request/http-request';
import {API_ADDRESS, VERSION, AUTH_ENDPOINT, USERS_ENDPOINT} from '../constants/constants';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;
  isLoggedIn: boolean;
  authToken: any;

  public login(credentials) {
    if (credentials.email === undefined || credentials.password === undefined) {
      return Observable.throw('Password and/or email required');
    } else {
      return Observable.create(observer => {
        this.request.post(API_ADDRESS + VERSION + AUTH_ENDPOINT, {
          email: credentials.email,
          password: credentials.password
        }).then(function (result) {
          console.log(result);
        });
        let access = (credentials.password == 'pass' && credentials.email == 'email');
        this.currentUser = new User('Obi', 'obi@jedi-order.crs');
        observer.next(access);
        observer.complete();
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

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    })
  }

  constructor(private request : HttpRequestProvider) {
    this.isLoggedIn = false;
    this.authToken = null;
  }

}
