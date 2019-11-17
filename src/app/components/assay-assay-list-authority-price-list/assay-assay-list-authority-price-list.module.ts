
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssayAssayListAuthorityPriceListRoutingModule } from './assay-assay-list-authority-price-list.routing.module';
import { AssayAssayListAuthorityPriceListComponent } from './assay-assay-list-authority-price-list.component';

@NgModule({
  declarations: [AssayAssayListAuthorityPriceListComponent],
  imports: [
    AssayAssayListAuthorityPriceListRoutingModule,
    CommonModule,
  ]
})
export class AssayAssayListAuthorityPriceListModule { }

