import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

import { AuthServiceProvider } from '../providers/auth-service/auth-service'
import { HttpRequestProvider } from '../providers/http-request/http-request';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RoomsPage } from '../pages/rooms/rooms';
import { UserPage } from '../pages/user/user';
import { FriendsPage } from '../pages/friends/friends';
import { LoginPage } from '../pages/login/login';
import {EditUserPage} from "../pages/edit-user/edit-user";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserPage,
    RoomsPage,
    FriendsPage,
    LoginPage,
    EditUserPage
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
    UserPage,
    RoomsPage,
    FriendsPage,
    LoginPage,
    EditUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
<<<<<<< HEAD
    Camera,
    HttpRequestProvider,
    NativeStorage
=======
    HttpRequestProvider
>>>>>>> 2f2674afc083a4a10d4339fad4cc07ba64c5784c
  ]
})
export class AppModule {}
