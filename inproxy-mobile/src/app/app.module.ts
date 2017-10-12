import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

import { AuthServiceProvider } from '../providers/auth-service/auth-service'
import { HttpRequestProvider } from '../providers/http-request/http-request';
import { UserServiceProvider } from '../providers/user-service/user-service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RoomsPage } from '../pages/rooms/rooms';
import { MapsPage } from '../pages/maps/maps';
import { UserPage } from '../pages/user/user';
import { FriendsPage } from '../pages/friends/friends';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage'
import {NativeStorage} from "@ionic-native/native-storage";
import { FriendServiceProvider } from '../providers/friend-service/friend-service';
import { GoogleMaps } from "@ionic-native/google-maps";
import { Geolocation } from "@ionic-native/geolocation";
import { RoomServiceProvider } from '../providers/room-service/room-service';
import { IoServiceProvider } from '../providers/io-service/io-service';
import { PrivateMessageStorageProvider } from '../providers/private-message-storage/private-message-storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RoomsPage,
    MapsPage,
    FriendsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RoomsPage,
    MapsPage,
    FriendsPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Camera,
    HttpRequestProvider,
    NativeStorage,
    UserServiceProvider,
    Geolocation,
    GoogleMaps,
    FriendServiceProvider,
    RoomServiceProvider,
    IoServiceProvider,
    PrivateMessageStorageProvider
  ]
})
export class AppModule {}
