import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssignEngineerOutsideDepartmentListComponent } from './assign-engineer-outside-department-list/assign-engineer-outside-department-list.component';
import { AssignEngineerOutsideDepartmentEditComponent } from './assign-engineer-outside-department-edit/assign-engineer-outside-department-edit.component';
import { AssignEngineerOutsideDepartmentNewComponent } from './assign-engineer-outside-department-new/assign-engineer-outside-department-new.component';
import { AssignEngineerOutsideDepartmentViewComponent } from './assign-engineer-outside-department-view/assign-engineer-outside-department-view.component';
import { AssignEngineerOutsideDepartmentRoutingModule } from './assign-engineer-outside-department.routing.module';
import { AssignEngineerOutsideDepartmentService } from './shared/assign-engineer-outside-department.service';
import { AssignEngineerOutsideDepartmentGuard } from './shared/assign-engineer-outside-department.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AssignEngineerOutsideDepartmentListComponent,
    AssignEngineerOutsideDepartmentNewComponent,
    AssignEngineerOutsideDepartmentEditComponent,
    AssignEngineerOutsideDepartmentViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssignEngineerOutsideDepartmentRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssignEngineerOutsideDepartmentService,
    AssignEngineerOutsideDepartmentGuard
  ],
  entryComponents: [
    AssignEngineerOutsideDepartmentNewComponent,
    AssignEngineerOutsideDepartmentEditComponent,
    AssignEngineerOutsideDepartmentViewComponent
  ]
})

export class AssignEngineerOutsideDepartmentModule {
}
