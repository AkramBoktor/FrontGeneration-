
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayAssayListAuthorityPriceListComponent } from './assay-assay-list-authority-price-list.component';


const routes: Routes = [
  {
    path: '',
    component: AssayAssayListAuthorityPriceListComponent,
  },
  
{
    path: 'assay-items-price', loadChildren: './components/assay-items-price/assay-items-price.module#AssayItemsPriceModule',
    data: {
      moduleName: 'AssayItemsPrice'
    },
},

{
    path: 'steel-price-cement-on-the-price-list', loadChildren: './components/steel-price-cement-on-the-price-list/steel-price-cement-on-the-price-list.module#SteelPriceCementOnThePriceListModule',
    data: {
      moduleName: 'SteelPriceCementOnThePriceList'
    },
},

{
    path: 'assay-item', loadChildren: './components/assay-item/assay-item.module#AssayItemModule',
    data: {
      moduleName: 'AssayItem'
    },
},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayAssayListAuthorityPriceListRoutingModule {
}

