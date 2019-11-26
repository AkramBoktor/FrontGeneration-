import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ImplementationDataScheduleGuard } from './shared/implementation-data-schedule.guard';
import { ImplementationDataScheduleNewComponent } from './implementation-data-schedule-new/implementation-data-schedule-new.component';
import { ImplementationDataScheduleEditComponent } from './implementation-data-schedule-edit/implementation-data-schedule-edit.component';
import { ImplementationDataScheduleListComponent } from './implementation-data-schedule-list/implementation-data-schedule-list.component';
import { ImplementationDataScheduleViewComponent } from './implementation-data-schedule-view/implementation-data-schedule-view.component';

const routes: Routes = [
  {
    path: '',
    component: ImplementationDataScheduleListComponent,
    canActivate: [ImplementationDataScheduleGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ImplementationDataScheduleNewComponent,
    canActivate: [ImplementationDataScheduleGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ImplementationDataScheduleEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ImplementationDataScheduleListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ImplementationDataScheduleViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ImplementationDataScheduleRoutingModule {
}
