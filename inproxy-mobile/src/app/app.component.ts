import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { GroupPage } from '../pages/group/group';
import { MapsPage } from '../pages/maps/maps';
import { FriendsPage } from '../pages/friends/friends';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title : string, icon : string, component : any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    if (localStorage.getItem('token') != null)
      this.rootPage = HomePage;
    else
      this.rootPage = LoginPage;

    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Group', icon: 'chatboxes', component: GroupPage },
      { title: 'Maps', icon: 'map', component: MapsPage },
      { title: 'Friends', icon: 'people', component: FriendsPage },
      { title: 'User', icon: 'person', component: 'UserPage' }
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
