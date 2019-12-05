import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LastMaintenanceDateGuard } from './shared/last-maintenance-date.guard';
import { LastMaintenanceDateNewComponent } from './last-maintenance-date-new/last-maintenance-date-new.component';
import { LastMaintenanceDateEditComponent } from './last-maintenance-date-edit/last-maintenance-date-edit.component';
import { LastMaintenanceDateListComponent } from './last-maintenance-date-list/last-maintenance-date-list.component';
import { LastMaintenanceDateViewComponent } from './last-maintenance-date-view/last-maintenance-date-view.component';

const routes: Routes = [
  {
    path: '',
    component: LastMaintenanceDateListComponent,
    canActivate: [LastMaintenanceDateGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LastMaintenanceDateNewComponent,
    canActivate: [LastMaintenanceDateGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LastMaintenanceDateEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LastMaintenanceDateListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LastMaintenanceDateViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LastMaintenanceDateRoutingModule {
}
