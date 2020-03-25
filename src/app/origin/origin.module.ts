import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OriginPageRoutingModule } from './origin-routing.module';

import { OriginPage } from './origin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OriginPageRoutingModule
  ],
  declarations: [OriginPage]
})
export class OriginPageModule {}
