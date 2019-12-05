import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ThePlannedStartDateForTheScheduleGuard } from './shared/the-planned-start-date-for-the-schedule.guard';
import { ThePlannedStartDateForTheScheduleNewComponent } from './the-planned-start-date-for-the-schedule-new/the-planned-start-date-for-the-schedule-new.component';
import { ThePlannedStartDateForTheScheduleEditComponent } from './the-planned-start-date-for-the-schedule-edit/the-planned-start-date-for-the-schedule-edit.component';
import { ThePlannedStartDateForTheScheduleListComponent } from './the-planned-start-date-for-the-schedule-list/the-planned-start-date-for-the-schedule-list.component';
import { ThePlannedStartDateForTheScheduleViewComponent } from './the-planned-start-date-for-the-schedule-view/the-planned-start-date-for-the-schedule-view.component';

const routes: Routes = [
  {
    path: '',
    component: ThePlannedStartDateForTheScheduleListComponent,
    canActivate: [ThePlannedStartDateForTheScheduleGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ThePlannedStartDateForTheScheduleNewComponent,
    canActivate: [ThePlannedStartDateForTheScheduleGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ThePlannedStartDateForTheScheduleEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ThePlannedStartDateForTheScheduleListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ThePlannedStartDateForTheScheduleViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ThePlannedStartDateForTheScheduleRoutingModule {
}
