import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ActivityTypeGuard } from './shared/activity-type.guard';
import { ActivityTypeNewComponent } from './activity-type-new/activity-type-new.component';
import { ActivityTypeEditComponent } from './activity-type-edit/activity-type-edit.component';
import { ActivityTypeListComponent } from './activity-type-list/activity-type-list.component';
import { ActivityTypeViewComponent } from './activity-type-view/activity-type-view.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityTypeListComponent,
    canActivate: [ActivityTypeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ActivityTypeNewComponent,
    canActivate: [ActivityTypeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ActivityTypeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ActivityTypeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ActivityTypeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ActivityTypeRoutingModule {
}
