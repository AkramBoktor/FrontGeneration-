import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeeInsuranceNumberListComponent } from './employee-insurance-number-list/employee-insurance-number-list.component';
import { EmployeeInsuranceNumberEditComponent } from './employee-insurance-number-edit/employee-insurance-number-edit.component';
import { EmployeeInsuranceNumberNewComponent } from './employee-insurance-number-new/employee-insurance-number-new.component';
import { EmployeeInsuranceNumberViewComponent } from './employee-insurance-number-view/employee-insurance-number-view.component';
import { EmployeeInsuranceNumberRoutingModule } from './employee-insurance-number.routing.module';
import { EmployeeInsuranceNumberService } from './shared/employee-insurance-number.service';
import { EmployeeInsuranceNumberGuard } from './shared/employee-insurance-number.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EmployeeInsuranceNumberListComponent,
    EmployeeInsuranceNumberNewComponent,
    EmployeeInsuranceNumberEditComponent,
    EmployeeInsuranceNumberViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeeInsuranceNumberRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeeInsuranceNumberService,
    EmployeeInsuranceNumberGuard
  ],
  entryComponents: [
    EmployeeInsuranceNumberNewComponent,
    EmployeeInsuranceNumberEditComponent,
    EmployeeInsuranceNumberViewComponent
  ]
})

export class EmployeeInsuranceNumberModule {
}
