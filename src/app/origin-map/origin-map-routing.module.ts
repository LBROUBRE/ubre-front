import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OriginMapPage } from './origin-map.page';

const routes: Routes = [
  {
    path: '',
    component: OriginMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OriginMapPageRoutingModule {}
