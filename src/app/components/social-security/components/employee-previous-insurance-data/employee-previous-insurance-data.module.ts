import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeePreviousInsuranceDataListComponent } from './employee-previous-insurance-data-list/employee-previous-insurance-data-list.component';
import { EmployeePreviousInsuranceDataEditComponent } from './employee-previous-insurance-data-edit/employee-previous-insurance-data-edit.component';
import { EmployeePreviousInsuranceDataNewComponent } from './employee-previous-insurance-data-new/employee-previous-insurance-data-new.component';
import { EmployeePreviousInsuranceDataViewComponent } from './employee-previous-insurance-data-view/employee-previous-insurance-data-view.component';
import { EmployeePreviousInsuranceDataRoutingModule } from './employee-previous-insurance-data.routing.module';
import { EmployeePreviousInsuranceDataService } from './shared/employee-previous-insurance-data.service';
import { EmployeePreviousInsuranceDataGuard } from './shared/employee-previous-insurance-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EmployeePreviousInsuranceDataListComponent,
    EmployeePreviousInsuranceDataNewComponent,
    EmployeePreviousInsuranceDataEditComponent,
    EmployeePreviousInsuranceDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeePreviousInsuranceDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeePreviousInsuranceDataService,
    EmployeePreviousInsuranceDataGuard
  ],
  entryComponents: [
    EmployeePreviousInsuranceDataNewComponent,
    EmployeePreviousInsuranceDataEditComponent,
    EmployeePreviousInsuranceDataViewComponent
  ]
})

export class EmployeePreviousInsuranceDataModule {
}
