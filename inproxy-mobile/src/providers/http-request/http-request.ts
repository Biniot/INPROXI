import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

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
  test = false;

  constructor(public http : Http) {
    this.request = http;
  }

  public get(address : string, params : any = null) {

    return this.request
      .get(address)
      .map(res => res.json())
      .toPromise();
  }

  public post(address : string, params : any = null) {

    this.headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
    let option = new RequestOptions({headers : this.headers});
    let body = new URLSearchParams();
    body.set('first_name', params.first_name);
    body.set('last_name', params.last_name);
    body.set('email', params.email);
    body.set('password', params.password);

    return this.request
      .post(address, body, option)
      .map((res : Response) => res.json())
      .toPromise();
  }

  public put(address : string, params : any = null) {

    return this.request
      .put(address, params)
      .map(res => res.json())
      .toPromise();
  }

  public del(address : string, params : any = null) {
    return this.request
      .delete(address, params)
      .map(res => res.json())
      .toPromise();
  }
}
