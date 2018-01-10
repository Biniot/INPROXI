import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatZonePage } from './chat-zone';

@NgModule({
  declarations: [
    ChatZonePage,
  ],
  imports: [
    IonicPageModule.forChild(ChatZonePage),
  ],
  exports: [
    ChatZonePage
  ]
})
export class ChatZonePageModule {}
