import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BenefitsForTheHeirsOfAnEmployeeListComponent } from './benefits-for-the-heirs-of-an-employee-list/benefits-for-the-heirs-of-an-employee-list.component';
import { BenefitsForTheHeirsOfAnEmployeeEditComponent } from './benefits-for-the-heirs-of-an-employee-edit/benefits-for-the-heirs-of-an-employee-edit.component';
import { BenefitsForTheHeirsOfAnEmployeeNewComponent } from './benefits-for-the-heirs-of-an-employee-new/benefits-for-the-heirs-of-an-employee-new.component';
import { BenefitsForTheHeirsOfAnEmployeeViewComponent } from './benefits-for-the-heirs-of-an-employee-view/benefits-for-the-heirs-of-an-employee-view.component';
import { BenefitsForTheHeirsOfAnEmployeeRoutingModule } from './benefits-for-the-heirs-of-an-employee.routing.module';
import { BenefitsForTheHeirsOfAnEmployeeService } from './shared/benefits-for-the-heirs-of-an-employee.service';
import { BenefitsForTheHeirsOfAnEmployeeGuard } from './shared/benefits-for-the-heirs-of-an-employee.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BenefitsForTheHeirsOfAnEmployeeListComponent,
    BenefitsForTheHeirsOfAnEmployeeNewComponent,
    BenefitsForTheHeirsOfAnEmployeeEditComponent,
    BenefitsForTheHeirsOfAnEmployeeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BenefitsForTheHeirsOfAnEmployeeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BenefitsForTheHeirsOfAnEmployeeService,
    BenefitsForTheHeirsOfAnEmployeeGuard
  ],
  entryComponents: [
    BenefitsForTheHeirsOfAnEmployeeNewComponent,
    BenefitsForTheHeirsOfAnEmployeeEditComponent,
    BenefitsForTheHeirsOfAnEmployeeViewComponent
  ]
})

export class BenefitsForTheHeirsOfAnEmployeeModule {
}
