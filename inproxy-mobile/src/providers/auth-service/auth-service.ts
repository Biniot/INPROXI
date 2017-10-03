import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequestProvider } from '../http-request/http-request';
import { API_ADDRESS, VERSION, AUTH_ENDPOINT, USERS_ENDPOINT } from '../constants/constants';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {
  isLoggedIn: boolean;

  public login(credentials) {
    if (credentials.email === undefined || credentials.password === undefined) {
      return Observable.throw('Password and/or email required');
    } else {
      return Observable.create(observer => {
        this.request.post(API_ADDRESS + VERSION + AUTH_ENDPOINT, {
          email: credentials.email,
          password: credentials.password
        }).subscribe(
          result => {
            console.log('login result');
            console.log(result);
            localStorage.setItem('token', result.token);
            localStorage.setItem('userId', result.user_id);
            localStorage.setItem('email', credentials.email);
            localStorage.setItem('password', credentials.password);
            observer.next(true);
            observer.complete();
          },
          err => observer.error(err.message)
        );
      })
    }
  }

  public anonymousLogin() {

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
        }).subscribe(
          result => {
            observer.next(true);
            observer.complete();
        }, err => {
          observer.error(err.message);
        });
      });
    }
  }

  public logout(isLogout: boolean) {
    return Observable.create(observer => {
      if (isLogout) {
        localStorage.removeItem('token');
      } else {
        localStorage.clear();
      }
      // TODO : Je pense que c'est mieux de faire le setRoot dans les pages qui utiliseront cette fonction
      // this.nav.setRoot(LoginPage);
      observer.next(true);
      observer.complete();
    })
  }

  constructor(private request : HttpRequestProvider) {
    this.isLoggedIn = false;
  }
}
