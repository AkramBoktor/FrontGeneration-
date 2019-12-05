import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ScheduleImplementationDataAssayProjectGuard } from './shared/schedule-implementation-data-assay-project.guard';
import { ScheduleImplementationDataAssayProjectNewComponent } from './schedule-implementation-data-assay-project-new/schedule-implementation-data-assay-project-new.component';
import { ScheduleImplementationDataAssayProjectEditComponent } from './schedule-implementation-data-assay-project-edit/schedule-implementation-data-assay-project-edit.component';
import { ScheduleImplementationDataAssayProjectListComponent } from './schedule-implementation-data-assay-project-list/schedule-implementation-data-assay-project-list.component';
import { ScheduleImplementationDataAssayProjectViewComponent } from './schedule-implementation-data-assay-project-view/schedule-implementation-data-assay-project-view.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleImplementationDataAssayProjectListComponent,
    canActivate: [ScheduleImplementationDataAssayProjectGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ScheduleImplementationDataAssayProjectNewComponent,
    canActivate: [ScheduleImplementationDataAssayProjectGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ScheduleImplementationDataAssayProjectEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ScheduleImplementationDataAssayProjectListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ScheduleImplementationDataAssayProjectViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ScheduleImplementationDataAssayProjectRoutingModule {
}
