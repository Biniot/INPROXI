import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

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

  // HtmlClass
  // isUserClass: "isUserClass";
  // isNotUserClass: "isNotUserClass";

  constructor() {
    // console.log("PrivateMessageStorageProvider constructor");
    this.messageMap = JSON.parse(localStorage.getItem(this.keyMapLocalStorage));
    this.keyList = JSON.parse(localStorage.getItem(this.keyListLocalStorage));
    // console.log(this.keyList === null);
    if (this.keyList === null) {
      localStorage.removeItem(this.keyMapLocalStorage);
      localStorage.removeItem(this.keyListLocalStorage);
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

    console.log("addElem");
    console.log(message);
    // Recherche les id stocker pour ne pas en créer de doublon
    for (let key in this.keyList) {
      if (key.localeCompare(message.id) === 0) {
        this.addToMap(message, true);
        isAdd = true;
        break;
      }
    }
    // Si l'id n'existe pas on le créer
    if (!isAdd) {
      console.log("!isAdd");
      this.addToMap(message, false);
      if (this.keyList === null) {
        this.keyList = [];
      }
      console.log('addElem keyList');
      console.log(this.keyList);
      console.log('addElem message');
      console.log(message);
      this.keyList.push(message.id);
    }

    console.log("addElem End list");
    console.log(this.keyList);
    console.log("addElem End messageMap");
    console.log(this.messageMap);
    localStorage.setItem(this.keyListLocalStorage, JSON.stringify(this.keyList));
    localStorage.setItem(this.keyMapLocalStorage, JSON.stringify(this.messageMap));
  }

  addToMap(message:any, isExist: boolean) {
    console.log("addToMap");
    console.log("message [" + message + "] isExist [" + isExist + "]");
    if (this.messageMap === null) {
      console.log("this.messageMap === null");
      this.messageMap = {};
    }
    let elem;
    if (isExist) {
      elem = this.messageMap[message.id];
    } else {
      elem = [];
    }
    elem[elem.length] =  {content: message.content, id: message.id, author: message.author, from: message.from};
    this.messageMap[message.id] = elem;
    console.log("addToMap new elem");
    console.log(elem);
  }

  // return [{content: message.content, id: message.id, author: message.author, from: message.from}]
  public getListMessageByUserId(id: string) {
    // console.log("getListMessageByUserId ");
    for (let key in this.keyList) {
      if (key.localeCompare(id) === 0) {
        // console.log(this.groupMap[friendId]);
        return (this.messageMap[id]);
      }
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
