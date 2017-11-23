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
  privateMesasgeCallback: any;
  groupMesasgeCallback: any;
  roomMesasgeCallback: any;

  constructor() {
    this._isConnected = false;

    sock.on('connect', this.sendAuth);
    sock.on('disconnect', this.onDisconnect);
    sock.on('reconnect', this.sendAuth);
    this.privateMesasgeCallback = null;
    this.groupMesasgeCallback = null;
    this.roomMesasgeCallback = null;
    console.log(sock);
  }

  /* Socket utiliy */
  sendAuth() {
    console.log("sendAuth");
    console.log(sock);
    this._isConnected = true;
    sock.emit('auth', {token: localStorage.getItem('token'), user_id: localStorage.getItem('userId')}, function(){console.log("sendAuth success")});
  }

  onDisconnect() {
    console.log(sock);
    console.log("disconnect");
    this._isConnected = false;
  }

  public isConnected() {
    return this._isConnected;
  }

  public connectSocket() {
    console.log("connectSocket");
    sock.open();
    this.sendAuth();
    // TODO : A voir si ya besoin de reset les callback en cas de deco ou pas ?
    if (this.privateMesasgeCallback !== null) {
      sock.on('private_message', this.privateMesasgeCallback);
    }
  }

  public disconnectSocket() {
    sock.close();
  }

  /* Room function */
  public joinRoom(idRoom: string) {
    sock.emit('join_room', {room_id: idRoom}, function(){console.log("joinRoom success")});
  }

  public leaveRoom(idRoom: string) {
    sock.emit('leave_room', {room_id: idRoom}, function(){console.log("leaveRoom success")})
  }

  public sendRoomMessage(idRoom: string, from: string, message: string, firstName: string, lastName: string) {
    sock.emit('room_message', {room_id: idRoom, from: from, message: message, first_name: firstName, last_name: lastName},
      function(){console.log("sendRoomMessage success")})
  }

  public setRoomMessageCallback(functionRoomMessage: any) {
    sock.on('room_message', functionRoomMessage);
  }

  /* PrivateMessage function */
  public setPrivateMessageCallback(functionPrivateMessage: any) {
    console.log("setPrivateMessageCallback");
    this.privateMesasgeCallback = functionPrivateMessage;
    sock.on('private_message', functionPrivateMessage);
  }

  public sendMessage(from: string, group_id: string, message: string) {
    console.log("sendMessage");
    sock.emit('private_message', {from: from, group_id: group_id, message: message}, () => {console.log("sendMessage success")});
  }

  /* Generic event function */
  public emitEvent(event: string, data: any) {
    sock.emit(event, data, function(){console.log("emitEvent success [" + event + "]")});
  }

  public receiveEventCallBack(event: string, functionEventCallback: any) {
    sock.on(event, functionEventCallback);
  }
}
