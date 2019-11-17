import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { VacationEmployeeListComponent } from './vacation-employee-list/vacation-employee-list.component';
import { VacationEmployeeEditComponent } from './vacation-employee-edit/vacation-employee-edit.component';
import { VacationEmployeeNewComponent } from './vacation-employee-new/vacation-employee-new.component';
import { VacationEmployeeViewComponent } from './vacation-employee-view/vacation-employee-view.component';
import { VacationEmployeeRoutingModule } from './vacation-employee.routing.module';
import { VacationEmployeeService } from './shared/vacation-employee.service';
import { VacationEmployeeGuard } from './shared/vacation-employee.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    VacationEmployeeListComponent,
    VacationEmployeeNewComponent,
    VacationEmployeeEditComponent,
    VacationEmployeeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    VacationEmployeeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    VacationEmployeeService,
    VacationEmployeeGuard
  ],
  entryComponents: [
    VacationEmployeeNewComponent,
    VacationEmployeeEditComponent,
    VacationEmployeeViewComponent
  ]
})

export class VacationEmployeeModule {
}
