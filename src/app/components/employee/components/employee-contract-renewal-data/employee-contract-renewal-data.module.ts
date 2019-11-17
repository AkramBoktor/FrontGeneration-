import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeeContractRenewalDataEditComponent } from './employee-contract-renewal-data-edit/employee-contract-renewal-data-edit.component';
import { EmployeeContractRenewalDataListComponent } from './employee-contract-renewal-data-list/employee-contract-renewal-data-list.component';
import { EmployeeContractRenewalDataNewComponent } from './employee-contract-renewal-data-new/employee-contract-renewal-data-new.component';
import { EmployeeContractRenewalDataViewComponent } from './employee-contract-renewal-data-view/employee-contract-renewal-data-view.component';
import { EmployeeContractRenewalDataRoutingModule } from './employee-contract-renewal-data.routing.module';
import { EmployeeContractRenewalDataGuard } from './shared/employee-contract-renewal-data.guard';
import { EmployeeContractRenewalDataService } from './shared/employee-contract-renewal-data.service';

@NgModule({
  declarations: [
    EmployeeContractRenewalDataListComponent,
    EmployeeContractRenewalDataNewComponent,
    EmployeeContractRenewalDataEditComponent,
    EmployeeContractRenewalDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeeContractRenewalDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeeContractRenewalDataService,
    EmployeeContractRenewalDataGuard
  ],
  entryComponents: [
    EmployeeContractRenewalDataNewComponent,
    EmployeeContractRenewalDataEditComponent,
    EmployeeContractRenewalDataViewComponent
  ]
})

export class EmployeeContractRenewalDataModule {
}
