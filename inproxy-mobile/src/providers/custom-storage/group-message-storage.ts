import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the GroupStorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GroupMessageStorageProvider {
  // Hold idGroupKey
  keyList: any;
  // Hold message by idGroupKey
  messageMap: any;

  // LocalStorageKey
  keyMapLocalStorage: "keyMapGroupLocalStorage";
  keyListLocalStorage: "keyListGroupLocalStorage";

  // HtmlClass
  // isUserClass: "isUserClass";
  // isNotUserClass: "isNotUserClass";

  constructor() {
    // console.log("GroupMessageStorageProvider constructor");
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
  // {from, message, group_id, from_last_name, from_first_name}
  addElem(message:any) {
    let isAdd = false;

    console.log("addElem");
    console.log(message);
    // Recherche les id stocker pour ne pas en créer de doublon
    for (let key in this.keyList) {
      if (key.localeCompare(message.groud_id) === 0) {
        console.log("key === message.groud_id");
        if (message.from.localeCompare(localStorage.getItem('userId')) === 0) {
          this.addToMap(message, true, true);
          isAdd = true;
        } else {
          this.addToMap(message, false, true);
          isAdd = true;
        }
        break;
      }
    }
    // Si l'id n'existe pas on le créer
    if (!isAdd) {
      console.log("!isAdd");
      if (this.keyList === null) {
        this.keyList = [];
      }
      this.keyList.push(message.group_id);
      if (message.from.localeCompare(localStorage.getItem('userId')) === 0) {
        console.log("from user");
        console.log('addElem keyList');
        console.log(this.keyList);
        console.log('addElem message');
        console.log(message);
        this.addToMap(message, true, false);
      } else {
        console.log("not from user");
        this.addToMap(message, false, false);
      }
    }

    console.log("addElem End list");
    console.log(this.keyList);
    console.log("addElem End messageMap");
    console.log(this.messageMap);
  }

  addToMap(message:any, isUser: boolean, isExist: boolean) {
    console.log("addToMap");
    console.log("message [" + message + "] isUser [" + isUser + "] isExist [" + isExist + "]");
    if (this.messageMap === null) {
      console.log("this.messageMap === null");
      this.messageMap = {};
    }
    let elem;
    if (isExist) {
      elem = this.messageMap[message.group_id];
      if (isUser) {
        elem[elem.length] =  {message: message.message, htmlClass: "isUserClass", from: message.from, name: message.from_first_name + " " + message.from_last_name};
      } else {
        elem[elem.length] =  {message: message.message, htmlClass: "isNotUserClass", from: message.from, name: message.from_first_name + " " + message.from_last_name};
      }
      this.messageMap[message.group_id] = elem;
      console.log("addToMap new elem");
      console.log(elem);
    } else {
      elem = [];
      if (isUser) {
        elem[elem.length] =  {message: message.message, htmlClass: "isUserClass", from: message.from, name: message.from_first_name + " " + message.from_last_name};
      } else {
        elem[elem.length] =  {message: message.message, htmlClass: "isNotUserClass", from: message.from, name: message.from_first_name + " " + message.from_last_name};
      }
      this.messageMap[message.group_id] = elem;
      console.log("addToMap new elem");
      console.log(elem);
    }
    localStorage.setItem(this.keyListLocalStorage, JSON.stringify(this.keyList));
    localStorage.setItem(this.keyMapLocalStorage, JSON.stringify(this.messageMap));
  }

  // return [{message: string, htmlClass: string, from: string, name: string}, ...]
  public getListMessageByGroupId(groupId: string) {
    for (let key in this.keyList) {
      if (key.localeCompare(groupId) === 0) {
        return (this.messageMap[groupId]);
      }
    }
    return null;
  }

  public getGroupsId() {
    return this.keyList;
  }

  public eraseAllData() {
    this.keyList = null;
    this.messageMap = null;
    localStorage.removeItem(this.keyMapLocalStorage);
    localStorage.removeItem(this.keyListLocalStorage);
  }

}
