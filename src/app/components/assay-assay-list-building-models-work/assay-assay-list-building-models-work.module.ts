
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssayAssayListBuildingModelsWorkRoutingModule } from './assay-assay-list-building-models-work.routing.module';
import { AssayAssayListBuildingModelsWorkComponent } from './assay-assay-list-building-models-work.component';

@NgModule({
  declarations: [AssayAssayListBuildingModelsWorkComponent],
  imports: [
    AssayAssayListBuildingModelsWorkRoutingModule,
    CommonModule,
  ]
})
export class AssayAssayListBuildingModelsWorkModule { }

