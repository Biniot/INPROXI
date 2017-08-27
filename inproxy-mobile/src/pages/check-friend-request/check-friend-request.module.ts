import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckFriendRequestPage } from './check-friend-request';

@NgModule({
  declarations: [
    CheckFriendRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckFriendRequestPage),
  ],
  exports: [
    CheckFriendRequestPage
  ]
})
export class CheckFriendRequestPageModule {}
