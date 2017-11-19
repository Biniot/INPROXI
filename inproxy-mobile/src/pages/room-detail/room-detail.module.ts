import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomDetailPage } from './room-detail';

@NgModule({
  declarations: [
    RoomDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomDetailPage),
  ],
  exports: [
    RoomDetailPage
  ]
})
export class RoomDetailPageModule {}
