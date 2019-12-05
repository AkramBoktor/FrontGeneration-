import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeeBenefitsNotLoadedOnACheckListComponent } from './employee-benefits-not-loaded-on-a-check-list/employee-benefits-not-loaded-on-a-check-list.component';
import { EmployeeBenefitsNotLoadedOnACheckEditComponent } from './employee-benefits-not-loaded-on-a-check-edit/employee-benefits-not-loaded-on-a-check-edit.component';
import { EmployeeBenefitsNotLoadedOnACheckNewComponent } from './employee-benefits-not-loaded-on-a-check-new/employee-benefits-not-loaded-on-a-check-new.component';
import { EmployeeBenefitsNotLoadedOnACheckViewComponent } from './employee-benefits-not-loaded-on-a-check-view/employee-benefits-not-loaded-on-a-check-view.component';
import { EmployeeBenefitsNotLoadedOnACheckRoutingModule } from './employee-benefits-not-loaded-on-a-check.routing.module';
import { EmployeeBenefitsNotLoadedOnACheckService } from './shared/employee-benefits-not-loaded-on-a-check.service';
import { EmployeeBenefitsNotLoadedOnACheckGuard } from './shared/employee-benefits-not-loaded-on-a-check.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EmployeeBenefitsNotLoadedOnACheckListComponent,
    EmployeeBenefitsNotLoadedOnACheckNewComponent,
    EmployeeBenefitsNotLoadedOnACheckEditComponent,
    EmployeeBenefitsNotLoadedOnACheckViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeeBenefitsNotLoadedOnACheckRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeeBenefitsNotLoadedOnACheckService,
    EmployeeBenefitsNotLoadedOnACheckGuard
  ],
  entryComponents: [
    EmployeeBenefitsNotLoadedOnACheckNewComponent,
    EmployeeBenefitsNotLoadedOnACheckEditComponent,
    EmployeeBenefitsNotLoadedOnACheckViewComponent
  ]
})

export class EmployeeBenefitsNotLoadedOnACheckModule {
}
