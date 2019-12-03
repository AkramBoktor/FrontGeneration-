import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ContractorDataQualityManagementListComponent } from './contractor-data-quality-management-list/contractor-data-quality-management-list.component';
import { ContractorDataQualityManagementEditComponent } from './contractor-data-quality-management-edit/contractor-data-quality-management-edit.component';
import { ContractorDataQualityManagementNewComponent } from './contractor-data-quality-management-new/contractor-data-quality-management-new.component';
import { ContractorDataQualityManagementViewComponent } from './contractor-data-quality-management-view/contractor-data-quality-management-view.component';
import { ContractorDataQualityManagementRoutingModule } from './contractor-data-quality-management.routing.module';
import { ContractorDataQualityManagementService } from './shared/contractor-data-quality-management.service';
import { ContractorDataQualityManagementGuard } from './shared/contractor-data-quality-management.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ContractorDataQualityManagementListComponent,
    ContractorDataQualityManagementNewComponent,
    ContractorDataQualityManagementEditComponent,
    ContractorDataQualityManagementViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ContractorDataQualityManagementRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ContractorDataQualityManagementService,
    ContractorDataQualityManagementGuard
  ],
  entryComponents: [
    ContractorDataQualityManagementNewComponent,
    ContractorDataQualityManagementEditComponent,
    ContractorDataQualityManagementViewComponent
  ]
})

export class ContractorDataQualityManagementModule {
}
