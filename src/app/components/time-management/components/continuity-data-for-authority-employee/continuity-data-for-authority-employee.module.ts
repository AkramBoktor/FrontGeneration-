import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ContinuityDataForAuthorityEmployeeListComponent } from './continuity-data-for-authority-employee-list/continuity-data-for-authority-employee-list.component';
import { ContinuityDataForAuthorityEmployeeEditComponent } from './continuity-data-for-authority-employee-edit/continuity-data-for-authority-employee-edit.component';
import { ContinuityDataForAuthorityEmployeeNewComponent } from './continuity-data-for-authority-employee-new/continuity-data-for-authority-employee-new.component';
import { ContinuityDataForAuthorityEmployeeViewComponent } from './continuity-data-for-authority-employee-view/continuity-data-for-authority-employee-view.component';
import { ContinuityDataForAuthorityEmployeeRoutingModule } from './continuity-data-for-authority-employee.routing.module';
import { ContinuityDataForAuthorityEmployeeService } from './shared/continuity-data-for-authority-employee.service';
import { ContinuityDataForAuthorityEmployeeGuard } from './shared/continuity-data-for-authority-employee.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ContinuityDataForAuthorityEmployeeListComponent,
    ContinuityDataForAuthorityEmployeeNewComponent,
    ContinuityDataForAuthorityEmployeeEditComponent,
    ContinuityDataForAuthorityEmployeeViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ContinuityDataForAuthorityEmployeeRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ContinuityDataForAuthorityEmployeeService,
    ContinuityDataForAuthorityEmployeeGuard
  ],
  entryComponents: [
    ContinuityDataForAuthorityEmployeeNewComponent,
    ContinuityDataForAuthorityEmployeeEditComponent,
    ContinuityDataForAuthorityEmployeeViewComponent
  ]
})

export class ContinuityDataForAuthorityEmployeeModule {
}
