import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TransferHisCustodyEmployeeToAnotherListComponent } from './transfer-his-custody-employee-to-another-list/transfer-his-custody-employee-to-another-list.component';
import { TransferHisCustodyEmployeeToAnotherEditComponent } from './transfer-his-custody-employee-to-another-edit/transfer-his-custody-employee-to-another-edit.component';
import { TransferHisCustodyEmployeeToAnotherNewComponent } from './transfer-his-custody-employee-to-another-new/transfer-his-custody-employee-to-another-new.component';
import { TransferHisCustodyEmployeeToAnotherViewComponent } from './transfer-his-custody-employee-to-another-view/transfer-his-custody-employee-to-another-view.component';
import { TransferHisCustodyEmployeeToAnotherRoutingModule } from './transfer-his-custody-employee-to-another.routing.module';
import { TransferHisCustodyEmployeeToAnotherService } from './shared/transfer-his-custody-employee-to-another.service';
import { TransferHisCustodyEmployeeToAnotherGuard } from './shared/transfer-his-custody-employee-to-another.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TransferHisCustodyEmployeeToAnotherListComponent,
    TransferHisCustodyEmployeeToAnotherNewComponent,
    TransferHisCustodyEmployeeToAnotherEditComponent,
    TransferHisCustodyEmployeeToAnotherViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TransferHisCustodyEmployeeToAnotherRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TransferHisCustodyEmployeeToAnotherService,
    TransferHisCustodyEmployeeToAnotherGuard
  ],
  entryComponents: [
    TransferHisCustodyEmployeeToAnotherNewComponent,
    TransferHisCustodyEmployeeToAnotherEditComponent,
    TransferHisCustodyEmployeeToAnotherViewComponent
  ]
})

export class TransferHisCustodyEmployeeToAnotherModule {
}
