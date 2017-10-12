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
  //autoConnect: false
  //query : {token: localStorage.getItem('token')},
});

@Injectable()
export class IoServiceProvider {
  socket:any;

  constructor() {
    // TODO : je sais pas trop si ca suffit pour nos histoire de token
    // this.
    //   socket = io(API_ADDRESS, {
    //   reconnection: true,
    //   //autoConnect: false
    //   //query : {token: localStorage.getItem('token')},
    // });
    sock.emit('auth', localStorage.getItem('token'));

    sock.on('connect', this.sendAuth);
    sock.on('disconnect', () => {
      console.log("disconnect");
      //sock
    });
    //sock.on('reconnect', this.sendAuth);
    console.log(sock);
  }

  sendAuth() {
    console.log(sock);
    sock.emit('auth', localStorage.getItem('token'));
  }

  public setPrivateMessageCallback(functionPrivateMessage: any) {
    sock.on('private_message', functionPrivateMessage);
  }

  public sendMessage(from: string, to: string, message: string) {
    sock.emit('private_message', {from: from, to: to, message: message});
  }

  public connectSocket() {
    sock.open();
  }

  public disconnectSocket() {
    sock.close();
  }

}
