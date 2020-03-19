import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OriginMapPageRoutingModule } from './origin-map-routing.module';

import { OriginMapPage } from './origin-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OriginMapPageRoutingModule
  ],
  declarations: [OriginMapPage]
})
export class OriginMapPageModule {}
