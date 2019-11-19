import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeeStatusEditComponent } from './employee-status-edit/employee-status-edit.component';
import { EmployeeStatusListComponent } from './employee-status-list/employee-status-list.component';
import { EmployeeStatusNewComponent } from './employee-status-new/employee-status-new.component';
import { EmployeeStatusViewComponent } from './employee-status-view/employee-status-view.component';
import { EmployeeStatusRoutingModule } from './employee-status.routing.module';
import { EmployeeStatusGuard } from './shared/employee-status.guard';
import { EmployeeStatusService } from './shared/employee-status.service';

@NgModule({
  declarations: [
    EmployeeStatusListComponent,
    EmployeeStatusNewComponent,
    EmployeeStatusEditComponent,
    EmployeeStatusViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeeStatusRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeeStatusService,
    EmployeeStatusGuard
  ],
  entryComponents: [
    EmployeeStatusNewComponent,
    EmployeeStatusEditComponent,
    EmployeeStatusViewComponent
  ]
})

export class EmployeeStatusModule {
}
