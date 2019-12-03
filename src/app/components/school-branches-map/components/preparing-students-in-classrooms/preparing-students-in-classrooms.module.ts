import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PreparingStudentsInClassroomsListComponent } from './preparing-students-in-classrooms-list/preparing-students-in-classrooms-list.component';
import { PreparingStudentsInClassroomsEditComponent } from './preparing-students-in-classrooms-edit/preparing-students-in-classrooms-edit.component';
import { PreparingStudentsInClassroomsNewComponent } from './preparing-students-in-classrooms-new/preparing-students-in-classrooms-new.component';
import { PreparingStudentsInClassroomsViewComponent } from './preparing-students-in-classrooms-view/preparing-students-in-classrooms-view.component';
import { PreparingStudentsInClassroomsRoutingModule } from './preparing-students-in-classrooms.routing.module';
import { PreparingStudentsInClassroomsService } from './shared/preparing-students-in-classrooms.service';
import { PreparingStudentsInClassroomsGuard } from './shared/preparing-students-in-classrooms.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PreparingStudentsInClassroomsListComponent,
    PreparingStudentsInClassroomsNewComponent,
    PreparingStudentsInClassroomsEditComponent,
    PreparingStudentsInClassroomsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PreparingStudentsInClassroomsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PreparingStudentsInClassroomsService,
    PreparingStudentsInClassroomsGuard
  ],
  entryComponents: [
    PreparingStudentsInClassroomsNewComponent,
    PreparingStudentsInClassroomsEditComponent,
    PreparingStudentsInClassroomsViewComponent
  ]
})

export class PreparingStudentsInClassroomsModule {
}
