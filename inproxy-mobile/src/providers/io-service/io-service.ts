import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {API_ADDRESS} from "../constants/constants";
import {isUndefined} from "ionic-angular/util/util";

/*
  Generated class for the IoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IoServiceProvider {

  socket:any;

  // Vous trouverez les prototypes des callback au dessus des fonctions correspondante
  // Normalement la connection est automatique lors de lappel du constructeur utiliser uniquement disconnect
  // les argument sur le .on pour le premier c'est un nom d'event.
  constructor() {
    // TODO : je sais pas trop si ca suffit pour nos histoire de token
    this.socket = io(API_ADDRESS, {
      path: '',
      reconnection: true,
      autoConnect: false
      //query : {token: localStorage.getItem('token')},
    });
    this.socket.on('connect', this.sendAuth);
    this.socket.on('reconnect', this.sendAuth);
    //this.socket.on('private_message', this.receiveMessage);
  }

  sendAuth() {
    this.socket.emit('auth', localStorage.getItem('token'));
  }

  receiveMessage(data: any) {
    // TODO : provider sqlite mis en place dune map
  }

  // function(){}
  public setDisconnectCallback(functionDisconnect: any) {
    this.socket.on('disconnect', functionDisconnect);
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
