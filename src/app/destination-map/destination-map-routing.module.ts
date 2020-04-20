import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestinationMapPage } from './destination-map.page';

const routes: Routes = [
  {
    path: '',
    component: DestinationMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestinationMapPageRoutingModule {}
