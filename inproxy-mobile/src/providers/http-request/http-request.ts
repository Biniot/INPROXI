import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpRequestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class HttpRequestProvider {

  request : Http;
  data : any;
  private headers : Headers;

  constructor(public http:Http) {
    this.request = http;
  }

  public get(address : string, params : any = null) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.request
        .get(address)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    })
  }

  public post(address : string, params : any = null) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
      let option = new RequestOptions({headers : this.headers});
      let body = new URLSearchParams();
      body.set('first_name', params.first_name);
      body.set('last_name', params.last_name);
      body.set('email', params.email);
      body.set('password', params.password);

      this.request
        .post(address, body, option)
        .map((res : Response) => res.json())
        .subscribe(
          data => {
            this.data = data;
            resolve(this.data);
          },
          err => {
            resolve(err);
          });
    })
  }

  public put(address : string, params : any = null) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.request
        .put(address, params)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    })
  }

  public del(address : string, params : any = null) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.request
        .delete(address, params)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    })
  }
}
