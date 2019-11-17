
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayAssayListAuthorityPriceListComponent } from './assay-assay-list-authority-price-list.component';


const routes: Routes = [
  {
    path: '',
    component: AssayAssayListAuthorityPriceListComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayAssayListAuthorityPriceListRoutingModule {
}

