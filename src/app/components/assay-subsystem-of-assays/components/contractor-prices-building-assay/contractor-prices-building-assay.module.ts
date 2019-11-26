import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ContractorPricesBuildingAssayListComponent } from './contractor-prices-building-assay-list/contractor-prices-building-assay-list.component';
import { ContractorPricesBuildingAssayEditComponent } from './contractor-prices-building-assay-edit/contractor-prices-building-assay-edit.component';
import { ContractorPricesBuildingAssayNewComponent } from './contractor-prices-building-assay-new/contractor-prices-building-assay-new.component';
import { ContractorPricesBuildingAssayViewComponent } from './contractor-prices-building-assay-view/contractor-prices-building-assay-view.component';
import { ContractorPricesBuildingAssayRoutingModule } from './contractor-prices-building-assay.routing.module';
import { ContractorPricesBuildingAssayService } from './shared/contractor-prices-building-assay.service';
import { ContractorPricesBuildingAssayGuard } from './shared/contractor-prices-building-assay.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ContractorPricesBuildingAssayListComponent,
    ContractorPricesBuildingAssayNewComponent,
    ContractorPricesBuildingAssayEditComponent,
    ContractorPricesBuildingAssayViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ContractorPricesBuildingAssayRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ContractorPricesBuildingAssayService,
    ContractorPricesBuildingAssayGuard
  ],
  entryComponents: [
    ContractorPricesBuildingAssayNewComponent,
    ContractorPricesBuildingAssayEditComponent,
    ContractorPricesBuildingAssayViewComponent
  ]
})

export class ContractorPricesBuildingAssayModule {
}
