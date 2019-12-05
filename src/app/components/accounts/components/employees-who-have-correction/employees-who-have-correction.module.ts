import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeesWhoHaveCorrectionListComponent } from './employees-who-have-correction-list/employees-who-have-correction-list.component';
import { EmployeesWhoHaveCorrectionEditComponent } from './employees-who-have-correction-edit/employees-who-have-correction-edit.component';
import { EmployeesWhoHaveCorrectionNewComponent } from './employees-who-have-correction-new/employees-who-have-correction-new.component';
import { EmployeesWhoHaveCorrectionViewComponent } from './employees-who-have-correction-view/employees-who-have-correction-view.component';
import { EmployeesWhoHaveCorrectionRoutingModule } from './employees-who-have-correction.routing.module';
import { EmployeesWhoHaveCorrectionService } from './shared/employees-who-have-correction.service';
import { EmployeesWhoHaveCorrectionGuard } from './shared/employees-who-have-correction.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EmployeesWhoHaveCorrectionListComponent,
    EmployeesWhoHaveCorrectionNewComponent,
    EmployeesWhoHaveCorrectionEditComponent,
    EmployeesWhoHaveCorrectionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeesWhoHaveCorrectionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeesWhoHaveCorrectionService,
    EmployeesWhoHaveCorrectionGuard
  ],
  entryComponents: [
    EmployeesWhoHaveCorrectionNewComponent,
    EmployeesWhoHaveCorrectionEditComponent,
    EmployeesWhoHaveCorrectionViewComponent
  ]
})

export class EmployeesWhoHaveCorrectionModule {
}
