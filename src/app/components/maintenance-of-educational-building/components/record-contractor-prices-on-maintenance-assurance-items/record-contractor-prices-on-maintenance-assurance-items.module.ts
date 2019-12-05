import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RecordContractorPricesOnMaintenanceAssuranceItemsListComponent } from './record-contractor-prices-on-maintenance-assurance-items-list/record-contractor-prices-on-maintenance-assurance-items-list.component';
import { RecordContractorPricesOnMaintenanceAssuranceItemsEditComponent } from './record-contractor-prices-on-maintenance-assurance-items-edit/record-contractor-prices-on-maintenance-assurance-items-edit.component';
import { RecordContractorPricesOnMaintenanceAssuranceItemsNewComponent } from './record-contractor-prices-on-maintenance-assurance-items-new/record-contractor-prices-on-maintenance-assurance-items-new.component';
import { RecordContractorPricesOnMaintenanceAssuranceItemsViewComponent } from './record-contractor-prices-on-maintenance-assurance-items-view/record-contractor-prices-on-maintenance-assurance-items-view.component';
import { RecordContractorPricesOnMaintenanceAssuranceItemsRoutingModule } from './record-contractor-prices-on-maintenance-assurance-items.routing.module';
import { RecordContractorPricesOnMaintenanceAssuranceItemsService } from './shared/record-contractor-prices-on-maintenance-assurance-items.service';
import { RecordContractorPricesOnMaintenanceAssuranceItemsGuard } from './shared/record-contractor-prices-on-maintenance-assurance-items.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RecordContractorPricesOnMaintenanceAssuranceItemsListComponent,
    RecordContractorPricesOnMaintenanceAssuranceItemsNewComponent,
    RecordContractorPricesOnMaintenanceAssuranceItemsEditComponent,
    RecordContractorPricesOnMaintenanceAssuranceItemsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RecordContractorPricesOnMaintenanceAssuranceItemsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RecordContractorPricesOnMaintenanceAssuranceItemsService,
    RecordContractorPricesOnMaintenanceAssuranceItemsGuard
  ],
  entryComponents: [
    RecordContractorPricesOnMaintenanceAssuranceItemsNewComponent,
    RecordContractorPricesOnMaintenanceAssuranceItemsEditComponent,
    RecordContractorPricesOnMaintenanceAssuranceItemsViewComponent
  ]
})

export class RecordContractorPricesOnMaintenanceAssuranceItemsModule {
}
