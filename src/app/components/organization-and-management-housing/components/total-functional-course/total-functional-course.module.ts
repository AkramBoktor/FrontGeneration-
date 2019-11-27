import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TotalFunctionalCourseListComponent } from './total-functional-course-list/total-functional-course-list.component';
import { TotalFunctionalCourseEditComponent } from './total-functional-course-edit/total-functional-course-edit.component';
import { TotalFunctionalCourseNewComponent } from './total-functional-course-new/total-functional-course-new.component';
import { TotalFunctionalCourseViewComponent } from './total-functional-course-view/total-functional-course-view.component';
import { TotalFunctionalCourseRoutingModule } from './total-functional-course.routing.module';
import { TotalFunctionalCourseService } from './shared/total-functional-course.service';
import { TotalFunctionalCourseGuard } from './shared/total-functional-course.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TotalFunctionalCourseListComponent,
    TotalFunctionalCourseNewComponent,
    TotalFunctionalCourseEditComponent,
    TotalFunctionalCourseViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TotalFunctionalCourseRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TotalFunctionalCourseService,
    TotalFunctionalCourseGuard
  ],
  entryComponents: [
    TotalFunctionalCourseNewComponent,
    TotalFunctionalCourseEditComponent,
    TotalFunctionalCourseViewComponent
  ]
})

export class TotalFunctionalCourseModule {
}
