import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FollowUpDailyMaintenanceGuard } from './shared/follow-up-daily-maintenance.guard';
import { FollowUpDailyMaintenanceNewComponent } from './follow-up-daily-maintenance-new/follow-up-daily-maintenance-new.component';
import { FollowUpDailyMaintenanceEditComponent } from './follow-up-daily-maintenance-edit/follow-up-daily-maintenance-edit.component';
import { FollowUpDailyMaintenanceListComponent } from './follow-up-daily-maintenance-list/follow-up-daily-maintenance-list.component';
import { FollowUpDailyMaintenanceViewComponent } from './follow-up-daily-maintenance-view/follow-up-daily-maintenance-view.component';

const routes: Routes = [
  {
    path: '',
    component: FollowUpDailyMaintenanceListComponent,
    canActivate: [FollowUpDailyMaintenanceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FollowUpDailyMaintenanceNewComponent,
    canActivate: [FollowUpDailyMaintenanceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FollowUpDailyMaintenanceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FollowUpDailyMaintenanceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FollowUpDailyMaintenanceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FollowUpDailyMaintenanceRoutingModule {
}
