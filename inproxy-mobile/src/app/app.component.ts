import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
      this.rootPage = 'MapsPage';
    else
      this.rootPage = 'LoginPage';

    this.pages = [
      { title: 'Maps', icon: 'map', component: 'MapsPage' },
      { title: 'Friends', icon: 'people', component: 'FriendsPage' },
      { title: 'User', icon: 'person', component: 'UserPage' },
      { title: 'Chats', icon: 'chatboxes', component: 'ListChatPage' }
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
    this.nav.setRoot('LoginPage');
  }
}
