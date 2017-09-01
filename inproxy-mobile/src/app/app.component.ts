import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { RoomsPage } from '../pages/rooms/rooms';
import { UserPage } from '../pages/user/user';
import { FriendsPage } from '../pages/friends/friends';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    if (localStorage.getItem('token') != null)
      this.rootPage = HomePage;
    else
      this.rootPage = LoginPage;

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Rooms', component: RoomsPage },
      { title: 'Friends', component: FriendsPage },
      { title: 'User', component: UserPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    localStorage.removeItem('token');
    this.nav.setRoot(LoginPage);
  }
}
