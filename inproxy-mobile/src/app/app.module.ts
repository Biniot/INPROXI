import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

import { AuthServiceProvider } from '../providers/auth-service/auth-service'
import { HttpRequestProvider } from '../providers/http-request/http-request';
import { UserServiceProvider } from '../providers/user-service/user-service';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage'
import { NativeStorage } from "@ionic-native/native-storage";
import { FriendServiceProvider } from '../providers/friend-service/friend-service';
import { GoogleMaps } from "@ionic-native/google-maps";
import { Geolocation } from "@ionic-native/geolocation";
import { RoomServiceProvider } from '../providers/room-service/room-service';
import { IoServiceProvider } from '../providers/io-service/io-service';
import { PrivateMessageStorageProvider } from '../providers/custom-storage/private-message-storage';
import { GroupMessageStorageProvider } from "../providers/custom-storage/group-message-storage";
import { ConversationServiceProvider } from '../providers/conversation-service/conversation-service';
import { RoomMessageStorageProvider } from "../providers/custom-storage/room-message-storage";
import { GeofenceProvider } from '../providers/geofence/geofence';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
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
    PrivateMessageStorageProvider,
    GroupMessageStorageProvider,
    RoomMessageStorageProvider,
    ConversationServiceProvider,
    GeofenceProvider
  ]
})
export class AppModule {}
