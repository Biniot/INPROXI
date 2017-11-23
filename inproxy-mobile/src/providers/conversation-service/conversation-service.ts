import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpRequestProvider} from "../http-request/http-request";
import {Observable} from "rxjs/Observable";
import {
  API_ADDRESS, CONVERSATION_ENDPOINT, MESSAGE_ENDPOINT, MESSAGES_ENDPOINT, VERSION,
  CONVERSATION_ENDPOINT_POST
} from "../constants/constants";

/*
  Generated class for the ConversationServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ConversationServiceProvider {

  constructor(private request : HttpRequestProvider) {
    console.log('Hello ConversationServiceProvider Provider');
  }

  public createConversation(members : string[]) {
    console.log("createConversation");
    console.log(members);
    /*return Observable.create(observer => {*/
    return new Observable(observer => {
      this.request.post(API_ADDRESS + VERSION + CONVERSATION_ENDPOINT, {
        members : members
      }).subscribe(
        result => {
          console.log("createConversation result");
          console.log(result);
          observer.next(result);
          observer.complete();
        }, err => {
          console.error("createConversation err");
          console.error(err);
          //observer.error(err.message);
        });
    });
    //});
  }

  public editConversation(conversationId: string, members: string[]) {
    //return Observable.create(observer => {
      this.request.put(API_ADDRESS + VERSION + CONVERSATION_ENDPOINT + conversationId, {
        members: members
      }).subscribe(
        result => {
          console.log("editConversation result");
          console.log(result);
          //localStorage.setItem('password', user.password);
          // observer.next(true);
          // observer.complete();
        }, err => {
          console.log("editConversation err");
          console.log(err);
          // observer.error(err.message)
        });
    // });
  }

  public getMessageConversation(conversationId: string) {
    console.log('getMessageConversation [' + conversationId + ']');
    return new Observable(observer => {
      this.request.get(API_ADDRESS + VERSION + CONVERSATION_ENDPOINT + conversationId + MESSAGES_ENDPOINT, {}).subscribe(
        result => {
          console.log("getMessageConversation result");
          console.log(result);
          observer.next(result);
          observer.complete();
        }, err => {
          console.log("getMessageConversation err");
          console.log(err);
          observer.error(err.message)
        });
    })
  }

  public addMessageConversation(message : string, conversationId: string) {
    /*return Observable.create(observer => {*/
    this.request.post(API_ADDRESS + VERSION + CONVERSATION_ENDPOINT + conversationId + MESSAGE_ENDPOINT, {
      content : message,
      author: localStorage.getItem('userId')
    }).subscribe(
      result => {
        console.log("addMessageConversation result");
        console.log(result);
        /*observer.next(true);
        observer.complete();*/
      }, err => {
        console.log("addMessageConversation err");
        console.log(err);
        //observer.error(err.message);
      });
    //});
  }

}
