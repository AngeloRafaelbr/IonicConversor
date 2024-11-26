import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultipleConversionPage } from './multiple-conversion.page';

const routes: Routes = [
  {
    path: '',
    component: MultipleConversionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultipleConversionPageRoutingModule {}
