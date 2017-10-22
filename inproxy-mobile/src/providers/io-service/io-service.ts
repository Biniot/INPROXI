import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {API_ADDRESS} from "../constants/constants";

/*
  Generated class for the IoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var sock = io(API_ADDRESS, {
  reconnection: true,
  autoConnect: false
  //query : {token: localStorage.getItem('token')},
});

@Injectable()
export class IoServiceProvider {
  _isConnected: boolean;

  constructor() {
    this._isConnected = false;
    // this.
    //   socket = io(API_ADDRESS, {
    //   reconnection: true,
    //   //autoConnect: false
    //   //query : {token: localStorage.getItem('token')},
    // });
    sock.emit('auth', localStorage.getItem('token'));

    sock.on('connect', this.sendAuth);
    sock.on('disconnect', this.onDisconnect);
    //sock.on('reconnect', this.sendAuth);
    console.log(sock);
  }

  sendAuth() {
    console.log(sock);
    this._isConnected = true;
    sock.emit('auth', localStorage.getItem('token'));
  }

  onDisconnect() {
    console.log(sock);
    console.log("disconnect");
    this._isConnected = false;
  }

  public isConnected() {
    return this._isConnected;
  }

  public emitEvent(event: string, data: any) {
    sock.emit(event, data);
  }

  public receiveEventCallBack(event: string, functionEventCallback: any) {
    sock.on(event, functionEventCallback);
  }

  public setPrivateMessageCallback(functionPrivateMessage: any) {
    sock.on('private_message', functionPrivateMessage);
  }

  public sendMessage(from: string, to: string, message: string) {
    sock.emit('private_message', {from: from, to: to, message: message});
  }

  public connectSocket() {
    sock.open();
    this.sendAuth();
  }

  public disconnectSocket() {
    sock.close();
  }

}
