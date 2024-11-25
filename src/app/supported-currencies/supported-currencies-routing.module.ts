import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportedCurrenciesPage } from './supported-currencies.page';

const routes: Routes = [
  {
    path: '',
    component: SupportedCurrenciesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportedCurrenciesPageRoutingModule {}
