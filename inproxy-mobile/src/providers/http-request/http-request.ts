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
  private headers : Headers;
  private searchParams : URLSearchParams;

  constructor(public http : Http) {
    this.request = http;
  }

  private createHeader() {
    let token = localStorage.getItem('token');
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    if (token != null)
      this.headers.append('Authorization', token);
  }

  private createSearchParams (params : any) {
    this.searchParams = new URLSearchParams();
    for (let key in params) {
      this.searchParams.set(key, params[key]);
    }
  }

  public get(address : string, params : any = null) {
    if (params != null)
      this.createSearchParams(params);
    this.createHeader();
    let option = new RequestOptions({headers : this.headers, search: this.searchParams});

    return this.request
      .get(address, option)
      .map((res : Response) => res.json())
      .toPromise();
  }

  public post(address : string, params : any = null) {
    this.createHeader();
    if (params != null)
      this.createSearchParams(params);
    let option = new RequestOptions({headers : this.headers});

    return this.request
      .post(address, this.searchParams, option)
      .map((res : Response) => res.json())
      .toPromise();
  }

  public put(address : string, params : any = null) {
    this.createHeader();
    if (params != null)
      this.createSearchParams(params);
    let option = new RequestOptions({headers : this.headers});

    return this.request
      .put(address, this.searchParams, option)
      // .map((res : Response) => res.json())
      .toPromise();
  }

  public del(address : string, params : any = null) {
    this.createHeader();
    if (params != null)
      this.createSearchParams(params);
    let option = new RequestOptions({headers : this.headers, body: this.searchParams});

    return this.request
      .delete(address, option)
      // .map((res : Response) => res.json())
      .toPromise();
  }
}
