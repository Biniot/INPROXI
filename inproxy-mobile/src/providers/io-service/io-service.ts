import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {API_ADDRESS} from "../constants/constants";

/*
  Generated class for the IoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IoServiceProvider {
  socket:any;

  constructor() {
    // TODO : je sais pas trop si ca suffit pour nos histoire de token
    this.socket = io(API_ADDRESS, {
      reconnection: true,
      //autoConnect: false
      //query : {token: localStorage.getItem('token')},
    });
    this.socket.emit('auth', localStorage.getItem('token'));

    this.socket.on('connect', this.sendAuth);
    this.socket.on('disconnect', () => {
      console.log("disconnect");
    });
    //this.socket.on('reconnect', this.sendAuth);
    console.log(this.socket);
  }

  sendAuth() {
    console.log(this.socket);
    //this.socket.emit('auth', localStorage.getItem('token'));
  }

  public setPrivateMessageCallback(functionPrivateMessage: any) {
    this.socket.on('private_message', functionPrivateMessage);
  }

  public sendMessage(from: string, to: string, message: string) {
    this.socket.emit('private_message', {from: from, to: to, message: message});
  }

  public connectSocket() {
    this.socket.open();
  }

  public disconnectSocket() {
    this.socket.close();
  }

}
