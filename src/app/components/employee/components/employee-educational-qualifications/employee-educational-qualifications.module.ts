import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmployeeEducationalQualificationsEditComponent } from './employee-educational-qualifications-edit/employee-educational-qualifications-edit.component';
import { EmployeeEducationalQualificationsListComponent } from './employee-educational-qualifications-list/employee-educational-qualifications-list.component';
import { EmployeeEducationalQualificationsNewComponent } from './employee-educational-qualifications-new/employee-educational-qualifications-new.component';
import { EmployeeEducationalQualificationsViewComponent } from './employee-educational-qualifications-view/employee-educational-qualifications-view.component';
import { EmployeeEducationalQualificationsRoutingModule } from './employee-educational-qualifications.routing.module';
import { EmployeeEducationalQualificationsGuard } from './shared/employee-educational-qualifications.guard';
import { EmployeeEducationalQualificationsService } from './shared/employee-educational-qualifications.service';

@NgModule({
  declarations: [
    EmployeeEducationalQualificationsListComponent,
    EmployeeEducationalQualificationsNewComponent,
    EmployeeEducationalQualificationsEditComponent,
    EmployeeEducationalQualificationsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmployeeEducationalQualificationsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmployeeEducationalQualificationsService,
    EmployeeEducationalQualificationsGuard
  ],
  entryComponents: [
    EmployeeEducationalQualificationsNewComponent,
    EmployeeEducationalQualificationsEditComponent,
    EmployeeEducationalQualificationsViewComponent
  ]
})

export class EmployeeEducationalQualificationsModule {
}
