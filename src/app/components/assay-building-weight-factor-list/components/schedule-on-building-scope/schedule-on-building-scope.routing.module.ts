import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ScheduleOnBuildingScopeGuard } from './shared/schedule-on-building-scope.guard';
import { ScheduleOnBuildingScopeNewComponent } from './schedule-on-building-scope-new/schedule-on-building-scope-new.component';
import { ScheduleOnBuildingScopeEditComponent } from './schedule-on-building-scope-edit/schedule-on-building-scope-edit.component';
import { ScheduleOnBuildingScopeListComponent } from './schedule-on-building-scope-list/schedule-on-building-scope-list.component';
import { ScheduleOnBuildingScopeViewComponent } from './schedule-on-building-scope-view/schedule-on-building-scope-view.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleOnBuildingScopeListComponent,
    canActivate: [ScheduleOnBuildingScopeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ScheduleOnBuildingScopeNewComponent,
    canActivate: [ScheduleOnBuildingScopeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ScheduleOnBuildingScopeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ScheduleOnBuildingScopeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ScheduleOnBuildingScopeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ScheduleOnBuildingScopeRoutingModule {
}
