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
  keyMapLocalStorage: "keyMapLocalStorage";
  keyListLocalStorage: "keyListLocalStorage";

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

  addMessage(message:any) {
    let isAdd = false;
    // console.log("addMessage");
    // console.log(message);
    for (let key in this.keyList) {
      if (key.localeCompare(message.from) === 0) {
        // console.log("key === message.from");
        this.addToMap(message, false, true);
        isAdd = true;
        break;
      } else if (key.localeCompare(message.to) === 0) {
        // console.log("key === message.to");
        this.addToMap(message, true, true);
        isAdd = true;
        break;
      }
    }
    if (!isAdd) {
      console.log("!isAdd");
      if (message.from.localeCompare(localStorage.getItem('userId')) === 0) {
        // console.log("from user");
        this.addToMap(message, true, false);
        if (this.keyList === null) {
          this.keyList = [];
        }
        this.keyList.push(message.to);
      } else {
        // console.log("not from user");
        if (this.keyList === null) {
          this.keyList = [];
        }
        this.keyList.push(message.from);
        this.addToMap(message, false, false);
      }
    }

    // console.log("addMessage End list");
    // console.log(this.keyList);
    // console.log("addMessage End messageMap");
    // console.log(this.messageMap);
  }

  addToMap(message:any, isUser: boolean, isExist: boolean) {
    if (this.messageMap === null) {
      this.messageMap = {};
    }
    let elem;
    if (isUser) {
      elem = this.messageMap[message.to];
    } else {
      elem = this.messageMap[message.from];
    }
    // console.log("addToMap elem");
    // console.log(elem);
    if (isExist) {
      if (isUser) {
        elem[elem.length] =  {message: message.message, htmlClass: "isUserClass"};
        this.messageMap[message.to] = elem;
      } else {
        elem[elem.length] =  {message: message.message, htmlClass: "isNotUserClass"};
        this.messageMap[message.from] = elem;
      }
      // console.log("addToMap new elem");
      // console.log(elem);
    } else {
      elem = [];
      if (isUser) {
        elem[elem.length] =  {message: message.message, htmlClass: "isUserClass"};
        this.messageMap[message.to] = elem;
      } else {
        elem[elem.length] =  {message: message.message, htmlClass: "isNotUserClass"};
        this.messageMap[message.from] = elem;
      }
      // console.log("addToMap new elem");
      // console.log(elem);
    }
    localStorage.setItem(this.keyListLocalStorage, JSON.stringify(this.keyList));
    localStorage.setItem(this.keyMapLocalStorage, JSON.stringify(this.messageMap));
  }

  // return [{message: string, htmlClass:string}]
  public getListMessageByUserId(friendId: string) {
    // console.log("getListMessageByUserId ");
    for (let key in this.keyList) {
      if (key.localeCompare(friendId) === 0) {
        // console.log(this.messageMap[friendId]);
        return (this.messageMap[friendId]);
      }
    }
    // console.log("getListMessageByUserId null");
    return null;
  }

  public eraseAllData() {
    this.keyList = null;
    this.messageMap = null;
    localStorage.removeItem(this.keyMapLocalStorage);
    localStorage.removeItem(this.keyListLocalStorage);
  }

}
