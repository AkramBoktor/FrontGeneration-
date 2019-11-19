
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssayBuildingWeightFactorListRoutingModule } from './assay-building-weight-factor-list.routing.module';
import { AssayBuildingWeightFactorListComponent } from './assay-building-weight-factor-list.component';

@NgModule({
  declarations: [AssayBuildingWeightFactorListComponent],
  imports: [
    AssayBuildingWeightFactorListRoutingModule,
    CommonModule,
  ]
})
export class AssayBuildingWeightFactorListModule { }

