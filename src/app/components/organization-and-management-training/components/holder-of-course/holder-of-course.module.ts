import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { HolderOfCourseListComponent } from './holder-of-course-list/holder-of-course-list.component';
import { HolderOfCourseEditComponent } from './holder-of-course-edit/holder-of-course-edit.component';
import { HolderOfCourseNewComponent } from './holder-of-course-new/holder-of-course-new.component';
import { HolderOfCourseViewComponent } from './holder-of-course-view/holder-of-course-view.component';
import { HolderOfCourseRoutingModule } from './holder-of-course.routing.module';
import { HolderOfCourseService } from './shared/holder-of-course.service';
import { HolderOfCourseGuard } from './shared/holder-of-course.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    HolderOfCourseListComponent,
    HolderOfCourseNewComponent,
    HolderOfCourseEditComponent,
    HolderOfCourseViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    HolderOfCourseRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    HolderOfCourseService,
    HolderOfCourseGuard
  ],
  entryComponents: [
    HolderOfCourseNewComponent,
    HolderOfCourseEditComponent,
    HolderOfCourseViewComponent
  ]
})

export class HolderOfCourseModule {
}
