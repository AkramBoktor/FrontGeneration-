import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TransferContractedEmployeeListComponent } from './transfer-contracted-employee-list/transfer-contracted-employee-list.component';
import { TransferContractedEmployeeEditComponent } from './transfer-contracted-employee-edit/transfer-contracted-employee-edit.component';
import { TransferContractedEmployeeNewComponent } from './transfer-contracted-employee-new/transfer-contracted-employee-new.component';
import { TransferContractedEmployeeViewComponent } from './transfer-contracted-employee-view/transfer-contracted-employee-view.component';
import { TransferContractedEmployeeRoutingModule } from './transfer-contracted-employee.routing.module';
import { TransferContractedEmployeeService } from './shared/transfer-contracted-employee.service';
import { TransferContractedEmployeeGuard } from './shared/transfer-contracted-employee.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TransferContractedEmployeeListComponent,
    TransferContractedEmployeeNewComponent,
    TransferContractedEmployeeEditComponent,
    TransferContractedEmployeeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TransferContractedEmployeeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TransferContractedEmployeeService,
    TransferContractedEmployeeGuard
  ],
  entryComponents: [
    TransferContractedEmployeeNewComponent,
    TransferContractedEmployeeEditComponent,
    TransferContractedEmployeeViewComponent
  ]
})

export class TransferContractedEmployeeModule {
}
