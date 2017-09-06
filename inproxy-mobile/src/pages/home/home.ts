import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpRequestProvider } from '../../providers/http-request/http-request';
import { API_ADDRESS, VERSION, USERS_ENDPOINT } from '../../providers/constants/constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public testRequest() {

    this.request.del(API_ADDRESS + VERSION + USERS_ENDPOINT + localStorage.getItem('userId'), {password: 'lol2'})
      .subscribe(
        result => {
          console.log('Success');
          console.log(result);
        },
        err => {
          console.log('Error');
          console.error(err);
        });
  }

  constructor(public navCtrl: NavController, private request : HttpRequestProvider) {
  }
}
