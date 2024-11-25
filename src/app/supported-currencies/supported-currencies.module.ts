import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportedCurrenciesPageRoutingModule } from './supported-currencies-routing.module';

import { SupportedCurrenciesPage } from './supported-currencies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportedCurrenciesPageRoutingModule
  ],
  declarations: [SupportedCurrenciesPage]
})
export class SupportedCurrenciesPageModule {}
