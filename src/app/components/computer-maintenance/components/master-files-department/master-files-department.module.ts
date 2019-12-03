import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MasterFilesDepartmentListComponent } from './master-files-department-list/master-files-department-list.component';
import { MasterFilesDepartmentEditComponent } from './master-files-department-edit/master-files-department-edit.component';
import { MasterFilesDepartmentNewComponent } from './master-files-department-new/master-files-department-new.component';
import { MasterFilesDepartmentViewComponent } from './master-files-department-view/master-files-department-view.component';
import { MasterFilesDepartmentRoutingModule } from './master-files-department.routing.module';
import { MasterFilesDepartmentService } from './shared/master-files-department.service';
import { MasterFilesDepartmentGuard } from './shared/master-files-department.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MasterFilesDepartmentListComponent,
    MasterFilesDepartmentNewComponent,
    MasterFilesDepartmentEditComponent,
    MasterFilesDepartmentViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MasterFilesDepartmentRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MasterFilesDepartmentService,
    MasterFilesDepartmentGuard
  ],
  entryComponents: [
    MasterFilesDepartmentNewComponent,
    MasterFilesDepartmentEditComponent,
    MasterFilesDepartmentViewComponent
  ]
})

export class MasterFilesDepartmentModule {
}
