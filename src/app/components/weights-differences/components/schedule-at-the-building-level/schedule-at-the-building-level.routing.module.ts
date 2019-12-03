import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ScheduleAtTheBuildingLevelGuard } from './shared/schedule-at-the-building-level.guard';
import { ScheduleAtTheBuildingLevelNewComponent } from './schedule-at-the-building-level-new/schedule-at-the-building-level-new.component';
import { ScheduleAtTheBuildingLevelEditComponent } from './schedule-at-the-building-level-edit/schedule-at-the-building-level-edit.component';
import { ScheduleAtTheBuildingLevelListComponent } from './schedule-at-the-building-level-list/schedule-at-the-building-level-list.component';
import { ScheduleAtTheBuildingLevelViewComponent } from './schedule-at-the-building-level-view/schedule-at-the-building-level-view.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleAtTheBuildingLevelListComponent,
    canActivate: [ScheduleAtTheBuildingLevelGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ScheduleAtTheBuildingLevelNewComponent,
    canActivate: [ScheduleAtTheBuildingLevelGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ScheduleAtTheBuildingLevelEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ScheduleAtTheBuildingLevelListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ScheduleAtTheBuildingLevelViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ScheduleAtTheBuildingLevelRoutingModule {
}
