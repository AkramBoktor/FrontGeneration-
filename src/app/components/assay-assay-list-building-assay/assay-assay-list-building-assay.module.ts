
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssayAssayListBuildingAssayRoutingModule } from './assay-assay-list-building-assay.routing.module';
import { AssayAssayListBuildingAssayComponent } from './assay-assay-list-building-assay.component';

@NgModule({
  declarations: [AssayAssayListBuildingAssayComponent],
  imports: [
    AssayAssayListBuildingAssayRoutingModule,
    CommonModule,
  ]
})
export class AssayAssayListBuildingAssayModule { }

