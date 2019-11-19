import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ReturnOfCustodyOfAnEmployeeListComponent } from './return-of-custody-of-an-employee-list/return-of-custody-of-an-employee-list.component';
import { ReturnOfCustodyOfAnEmployeeEditComponent } from './return-of-custody-of-an-employee-edit/return-of-custody-of-an-employee-edit.component';
import { ReturnOfCustodyOfAnEmployeeNewComponent } from './return-of-custody-of-an-employee-new/return-of-custody-of-an-employee-new.component';
import { ReturnOfCustodyOfAnEmployeeViewComponent } from './return-of-custody-of-an-employee-view/return-of-custody-of-an-employee-view.component';
import { ReturnOfCustodyOfAnEmployeeRoutingModule } from './return-of-custody-of-an-employee.routing.module';
import { ReturnOfCustodyOfAnEmployeeService } from './shared/return-of-custody-of-an-employee.service';
import { ReturnOfCustodyOfAnEmployeeGuard } from './shared/return-of-custody-of-an-employee.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ReturnOfCustodyOfAnEmployeeListComponent,
    ReturnOfCustodyOfAnEmployeeNewComponent,
    ReturnOfCustodyOfAnEmployeeEditComponent,
    ReturnOfCustodyOfAnEmployeeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ReturnOfCustodyOfAnEmployeeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ReturnOfCustodyOfAnEmployeeService,
    ReturnOfCustodyOfAnEmployeeGuard
  ],
  entryComponents: [
    ReturnOfCustodyOfAnEmployeeNewComponent,
    ReturnOfCustodyOfAnEmployeeEditComponent,
    ReturnOfCustodyOfAnEmployeeViewComponent
  ]
})

export class ReturnOfCustodyOfAnEmployeeModule {
}
