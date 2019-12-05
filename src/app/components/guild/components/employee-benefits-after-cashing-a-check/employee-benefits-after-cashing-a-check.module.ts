import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeeBenefitsAfterCashingACheckListComponent } from './employee-benefits-after-cashing-a-check-list/employee-benefits-after-cashing-a-check-list.component';
import { EmployeeBenefitsAfterCashingACheckEditComponent } from './employee-benefits-after-cashing-a-check-edit/employee-benefits-after-cashing-a-check-edit.component';
import { EmployeeBenefitsAfterCashingACheckNewComponent } from './employee-benefits-after-cashing-a-check-new/employee-benefits-after-cashing-a-check-new.component';
import { EmployeeBenefitsAfterCashingACheckViewComponent } from './employee-benefits-after-cashing-a-check-view/employee-benefits-after-cashing-a-check-view.component';
import { EmployeeBenefitsAfterCashingACheckRoutingModule } from './employee-benefits-after-cashing-a-check.routing.module';
import { EmployeeBenefitsAfterCashingACheckService } from './shared/employee-benefits-after-cashing-a-check.service';
import { EmployeeBenefitsAfterCashingACheckGuard } from './shared/employee-benefits-after-cashing-a-check.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EmployeeBenefitsAfterCashingACheckListComponent,
    EmployeeBenefitsAfterCashingACheckNewComponent,
    EmployeeBenefitsAfterCashingACheckEditComponent,
    EmployeeBenefitsAfterCashingACheckViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeeBenefitsAfterCashingACheckRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeeBenefitsAfterCashingACheckService,
    EmployeeBenefitsAfterCashingACheckGuard
  ],
  entryComponents: [
    EmployeeBenefitsAfterCashingACheckNewComponent,
    EmployeeBenefitsAfterCashingACheckEditComponent,
    EmployeeBenefitsAfterCashingACheckViewComponent
  ]
})

export class EmployeeBenefitsAfterCashingACheckModule {
}
