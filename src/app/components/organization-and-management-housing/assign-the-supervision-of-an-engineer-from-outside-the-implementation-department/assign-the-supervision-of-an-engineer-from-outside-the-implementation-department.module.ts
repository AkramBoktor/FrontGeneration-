import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentListComponent } from './assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-list/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-list.component';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentEditComponent } from './assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-edit/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-edit.component';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentNewComponent } from './assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-new/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-new.component';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentViewComponent } from './assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-view/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-view.component';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentRoutingModule } from './assign-the-supervision-of-an-engineer-from-outside-the-implementation-department.routing.module';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService } from './shared/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department.service';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentGuard } from './shared/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentListComponent,
    AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentNewComponent,
    AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentEditComponent,
    AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService,
    AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentGuard
  ],
  entryComponents: [
    AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentNewComponent,
    AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentEditComponent,
    AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentViewComponent
  ]
})

export class AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentModule {
}
