import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFriendRequestPage } from './add-friend-request';

@NgModule({
  declarations: [
    AddFriendRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFriendRequestPage),
  ],
  exports: [
    AddFriendRequestPage
  ]
})
export class AddFriendRequestPageModule {}
