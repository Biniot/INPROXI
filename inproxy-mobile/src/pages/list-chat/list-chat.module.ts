import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListChatPage } from './list-chat';

@NgModule({
  declarations: [
    ListChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ListChatPage),
  ],
  exports: [
    ListChatPage
  ]
})
export class ListChatPageModule {}
