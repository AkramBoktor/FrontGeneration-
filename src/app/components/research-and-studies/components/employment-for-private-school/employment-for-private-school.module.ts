import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EmploymentForPrivateSchoolListComponent } from './employment-for-private-school-list/employment-for-private-school-list.component';
import { EmploymentForPrivateSchoolEditComponent } from './employment-for-private-school-edit/employment-for-private-school-edit.component';
import { EmploymentForPrivateSchoolNewComponent } from './employment-for-private-school-new/employment-for-private-school-new.component';
import { EmploymentForPrivateSchoolViewComponent } from './employment-for-private-school-view/employment-for-private-school-view.component';
import { EmploymentForPrivateSchoolRoutingModule } from './employment-for-private-school.routing.module';
import { EmploymentForPrivateSchoolService } from './shared/employment-for-private-school.service';
import { EmploymentForPrivateSchoolGuard } from './shared/employment-for-private-school.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EmploymentForPrivateSchoolListComponent,
    EmploymentForPrivateSchoolNewComponent,
    EmploymentForPrivateSchoolEditComponent,
    EmploymentForPrivateSchoolViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EmploymentForPrivateSchoolRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EmploymentForPrivateSchoolService,
    EmploymentForPrivateSchoolGuard
  ],
  entryComponents: [
    EmploymentForPrivateSchoolNewComponent,
    EmploymentForPrivateSchoolEditComponent,
    EmploymentForPrivateSchoolViewComponent
  ]
})

export class EmploymentForPrivateSchoolModule {
}
