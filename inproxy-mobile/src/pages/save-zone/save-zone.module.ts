import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaveZonePage } from './save-zone';

@NgModule({
  declarations: [
    SaveZonePage,
  ],
  imports: [
    IonicPageModule.forChild(SaveZonePage),
  ],
  exports: [
    SaveZonePage
  ]
})
export class SaveZonePageModule {}
