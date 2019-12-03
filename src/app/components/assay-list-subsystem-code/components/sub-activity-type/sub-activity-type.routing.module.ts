import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubActivityTypeGuard } from './shared/sub-activity-type.guard';
import { SubActivityTypeNewComponent } from './sub-activity-type-new/sub-activity-type-new.component';
import { SubActivityTypeEditComponent } from './sub-activity-type-edit/sub-activity-type-edit.component';
import { SubActivityTypeListComponent } from './sub-activity-type-list/sub-activity-type-list.component';
import { SubActivityTypeViewComponent } from './sub-activity-type-view/sub-activity-type-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubActivityTypeListComponent,
    canActivate: [SubActivityTypeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubActivityTypeNewComponent,
    canActivate: [SubActivityTypeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubActivityTypeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubActivityTypeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubActivityTypeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubActivityTypeRoutingModule {
}
