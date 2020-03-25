import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OriginPage } from './origin.page';

const routes: Routes = [
  {
    path: '',
    component: OriginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OriginPageRoutingModule {}
