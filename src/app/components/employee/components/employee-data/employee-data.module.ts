import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeeDataEditComponent } from './employee-data-edit/employee-data-edit.component';
import { EmployeeDataListComponent } from './employee-data-list/employee-data-list.component';
import { EmployeeDataNewComponent } from './employee-data-new/employee-data-new.component';
import { EmployeeDataViewComponent } from './employee-data-view/employee-data-view.component';
import { EmployeeDataRoutingModule } from './employee-data.routing.module';
import { EmployeeDataGuard } from './shared/employee-data.guard';
import { EmployeeDataService } from './shared/employee-data.service';

@NgModule({
  declarations: [
    EmployeeDataListComponent,
    EmployeeDataNewComponent,
    EmployeeDataEditComponent,
    EmployeeDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeeDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeeDataService,
    EmployeeDataGuard
  ],
  entryComponents: [
    EmployeeDataNewComponent,
    EmployeeDataEditComponent,
    EmployeeDataViewComponent
  ],
  exports:[
    EmployeeDataViewComponent
  ]
})

export class EmployeeDataModule {
}
