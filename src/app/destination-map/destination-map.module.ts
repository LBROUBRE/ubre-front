import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DestinationMapPageRoutingModule } from './destination-map-routing.module';

import { DestinationMapPage } from './destination-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestinationMapPageRoutingModule
  ],
  declarations: [DestinationMapPage]
})
export class DestinationMapPageModule {}
