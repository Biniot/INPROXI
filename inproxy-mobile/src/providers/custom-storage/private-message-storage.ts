import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {isUndefined} from "util";

/*
  Generated class for the PrivateMessageStorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PrivateMessageStorageProvider {
  // Hold idFriendKey
  keyList: any;
  // Hold message by idFriendKey
  messageMap: any;

  // LocalStorageKey
  keyMapLocalStorage: "keyMapPrivateMessageLocalStorage";
  keyListLocalStorage: "keyListPrivateMessageLocalStorage";

  constructor() {
    // console.log("PrivateMessageStorageProvider constructor");
    this.messageMap = JSON.parse(localStorage.getItem(this.keyMapLocalStorage));
    this.keyList = JSON.parse(localStorage.getItem(this.keyListLocalStorage));
    // console.log(this.keyList === null);
    if (this.keyList === null) {
      localStorage.removeItem(this.keyMapLocalStorage);
      localStorage.removeItem(this.keyListLocalStorage);
      this.keyList = [];
      this.messageMap = {};
    }
    console.log("keyList");
    console.log(this.keyList);
    console.log("messageMap");
    console.log(this.messageMap);
  }

  // Model attendu
  // let localContent = {
  //   content: localStorage.getItem('userId'),
  //   id: this.navParams.get('group_id'),
  //   message: this.messageToSend,
  //   author: {first_name: this.currentFriend.firstName, last_name: this.currentFriend.lastName, id: this.currentFriend.userId}
  // };
  addElem(message:any) {
    let isAdd = false;
    if (!isUndefined(message.id) && !isUndefined(message.content) && !isUndefined(message.author) && !isUndefined(message.from)
      && !isUndefined(message.author.first_name) && !isUndefined(message.author.last_name) && !isUndefined(message.author.id)) {
      console.log("addElem");
      console.log(message);
      // Recherche les id stocker pour ne pas en créer de doublon
      let i = 0;
      while (i < this.keyList.length) {
        // console.log(this.keyList[i]);
        if (this.keyList[i].localeCompare(message.id) == 0) {
          // console.log("localeCompare(message.id) === 0");
          this.addToMap(message, true);
          isAdd = true;
          break;
        }
        i++;
      }
      // Si l'id n'existe pas on le créer
      if (!isAdd) {
        // console.log("!isAdd");
        this.addToMap(message, false);
        // console.log('addElem keyList');
        // console.log(this.keyList);
        // console.log('addElem message');
        // console.log(message);
      }

      console.log("addElem End list");
      console.log(this.keyList);
      console.log("addElem End messageMap");
      console.log(this.messageMap);

      localStorage.setItem(this.keyListLocalStorage, JSON.stringify(this.keyList));
      localStorage.setItem(this.keyMapLocalStorage, JSON.stringify(this.messageMap));
    }
  }

  private addToMap(message:any, isExist: boolean) {
     console.log("addToMap");
     console.log("message [" + message + "] isExist [" + isExist + "]");
    if (this.messageMap == null) {
      // console.log("this.messageMap === null");
      this.messageMap = {};
    }
    let elem;
    if (isExist) {
      // console.log("isExist");
      elem = this.messageMap[message.id];
    } else {
      // console.log("!isExist");
      elem = [];
      if (this.keyList === null || isUndefined(this.keyList)) {
        this.keyList = [];
      }
      console.log("ici");
      console.log(this.keyList);
      this.keyList.push(message.id);
    }
    elem[elem.length] =  {content: message.content, id: message.id, author: message.author, from: message.from};
    this.messageMap[message.id] = elem;
    // console.log("addToMap new elem");
    // console.log(elem);
  }

  // return [{content: message.content, id: message.id, author: message.author, from: message.from}]
  public getListMessageById(id: string) {
    // console.log("getListMessageByUserId ");
    let i = 0;
    while (i < this.keyList.length) {
      if (this.keyList[i].localeCompare(id) == 0) {
        // console.log(this.groupMap[friendId]);
        return (this.messageMap[id]);
      }
      i++;
    }
    // console.log("getListMessageByUserId null");
    return null;
  }

  public getIds() {
    return this.keyList;
  }

  public eraseAllData() {
    this.keyList = null;
    this.messageMap = null;
    localStorage.removeItem(this.keyMapLocalStorage);
    localStorage.removeItem(this.keyListLocalStorage);
  }
}
