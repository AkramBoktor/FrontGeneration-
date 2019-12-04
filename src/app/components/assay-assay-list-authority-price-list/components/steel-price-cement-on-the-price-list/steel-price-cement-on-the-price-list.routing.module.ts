import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SteelPriceCementOnThePriceListGuard } from './shared/steel-price-cement-on-the-price-list.guard';
import { SteelPriceCementOnThePriceListNewComponent } from './steel-price-cement-on-the-price-list-new/steel-price-cement-on-the-price-list-new.component';
import { SteelPriceCementOnThePriceListEditComponent } from './steel-price-cement-on-the-price-list-edit/steel-price-cement-on-the-price-list-edit.component';
import { SteelPriceCementOnThePriceListListComponent } from './steel-price-cement-on-the-price-list-list/steel-price-cement-on-the-price-list-list.component';
import { SteelPriceCementOnThePriceListViewComponent } from './steel-price-cement-on-the-price-list-view/steel-price-cement-on-the-price-list-view.component';

const routes: Routes = [
  {
    path: '',
    component: SteelPriceCementOnThePriceListListComponent,
    canActivate: [SteelPriceCementOnThePriceListGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SteelPriceCementOnThePriceListNewComponent,
    canActivate: [SteelPriceCementOnThePriceListGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SteelPriceCementOnThePriceListEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SteelPriceCementOnThePriceListListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SteelPriceCementOnThePriceListViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SteelPriceCementOnThePriceListRoutingModule {
}
