import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ImplementationActivityScheduleGuard } from './shared/implementation-activity-schedule.guard';
import { ImplementationActivityScheduleNewComponent } from './implementation-activity-schedule-new/implementation-activity-schedule-new.component';
import { ImplementationActivityScheduleEditComponent } from './implementation-activity-schedule-edit/implementation-activity-schedule-edit.component';
import { ImplementationActivityScheduleListComponent } from './implementation-activity-schedule-list/implementation-activity-schedule-list.component';
import { ImplementationActivityScheduleViewComponent } from './implementation-activity-schedule-view/implementation-activity-schedule-view.component';

const routes: Routes = [
  {
    path: '',
    component: ImplementationActivityScheduleListComponent,
    canActivate: [ImplementationActivityScheduleGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ImplementationActivityScheduleNewComponent,
    canActivate: [ImplementationActivityScheduleGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ImplementationActivityScheduleEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ImplementationActivityScheduleListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ImplementationActivityScheduleViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ImplementationActivityScheduleRoutingModule {
}
