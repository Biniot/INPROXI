import {Injectable, NgZone} from '@angular/core';
import * as io from 'socket.io-client';
import {API_ADDRESS} from "../constants/constants";
import {ConversationRoomModel, MessageRoomModel} from "../../model/conversationRoomModel";

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
  mesasgeCallback: any;
  listConversationRoom: ConversationRoomModel[];

  constructor(public zone: NgZone) {
    this._isConnected = false;

    sock.on('connect', this.sendAuth);
    sock.on('disconnect', this.onDisconnect);
    sock.on('reconnect', this.sendAuth);
    this.mesasgeCallback = null;
    this.listConversationRoom = [];
    // console.log(sock);
  }

  public addConversation(room) {
    let tab = [];
    let isFind = false;
    if (this.listConversationRoom.length < 1) {
      this.receiveEventCallBack('room_message', data => {
        this.zone.run(() => {
          this.listConversationRoom.forEach(elem => {
            if (elem.id.localeCompare(data.conversation_id) == 0) {
              elem.message.push(new MessageRoomModel(data.content, data.author));
            } else {
              console.log("addConversation receiveEventCallBack fail for :");
              console.log(data);
            }
          });
        });
      });
    }
    this.listConversationRoom.forEach(elem => {
      if (elem.id.localeCompare(room.id) == 0) {
        isFind = true;
      }
    });
    if (!isFind) {
      this.listConversationRoom.push(new ConversationRoomModel(room.name, tab, room.id));
      this.joinRoom(room.id);
    }
  }

  public getConversationRoomById(idRoom: string) {
    let result = null;
    this.listConversationRoom.forEach(elem => {
      if (elem.id.localeCompare(idRoom) == 0) {
        result = elem;
      }
    });
    return result;
  }

  sendMessageToConversationRoom(idRoom: string, content: string, author: string) {
    sock.emit('room_message', {room_id: idRoom, author: author, content: content}, function(){console.log("emit room_message")})
  }

  public getList() {
    // console.log("IoServiceProvider getList");
    // console.log(this.listConversationRoom);
    return this.listConversationRoom;
  }


  /* Socket utiliy */
  sendAuth() {
    // console.log("sendAuth");
    // console.log(sock);
    this._isConnected = true;
    sock.emit('auth', {token: localStorage.getItem('token'), user_id: localStorage.getItem('userId')}, function(){console.log("sendAuth success")});
  }

  onDisconnect() {
    // console.log(sock);
    // console.log("disconnect");
    this._isConnected = false;
  }

  public isConnected() {
    return this._isConnected;
  }

  public connectSocket() {
    console.log("connectSocket");
    sock.open();
    this.sendAuth();
    // // TODO : A voir si ya besoin de reset les callback en cas de deco ou pas ?
    // if (this.mesasgeCallback !== null) {
    //   sock.on('conversation_message', this.privateMesasgeCallback);
    // }
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

  // public sendRoomMessage(idRoom: string, from: string, message: string, firstName: string, lastName: string) {
  //   sock.emit('room_message', {room_id: idRoom, from: from, message: message, first_name: firstName, last_name: lastName},
  //     function(){console.log("sendRoomMessage success")})
  // }
  //
  // public setRoomMessageCallback(functionRoomMessage: any) {
  //   sock.on('room_message', functionRoomMessage);
  // }

  /* PrivateMessage function */
  public setPrivateMessageCallback(functionPrivateMessage: any) {
    // console.log("setMessageCallback");
    if (this.mesasgeCallback == null) {
      this.mesasgeCallback = functionPrivateMessage;
      sock.on('conversation_message', functionPrivateMessage);
    }
  }

  public sendMessage(from: string, conversationId: string, message: string) {
    console.log("sendMessage IoService");
    console.log(sock);
    sock.emit('conversation_message', {author: from, conversation_id: conversationId, content: message}, () => {console.log("IoServiceProvider sendMessage success")});

    console.log(sock);
  }

  /* Generic event function */
  public emitEvent(event: string, data: any) {
    sock.emit(event, data, () => {console.log("emitEvent success [" + event + "]")});
  }

  public receiveEventCallBack(event: string, functionEventCallback: any) {
    sock.on(event, functionEventCallback);
  }
}
