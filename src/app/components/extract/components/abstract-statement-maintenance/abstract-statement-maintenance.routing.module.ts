import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AbstractStatementMaintenanceGuard } from './shared/abstract-statement-maintenance.guard';
import { AbstractStatementMaintenanceNewComponent } from './abstract-statement-maintenance-new/abstract-statement-maintenance-new.component';
import { AbstractStatementMaintenanceEditComponent } from './abstract-statement-maintenance-edit/abstract-statement-maintenance-edit.component';
import { AbstractStatementMaintenanceListComponent } from './abstract-statement-maintenance-list/abstract-statement-maintenance-list.component';
import { AbstractStatementMaintenanceViewComponent } from './abstract-statement-maintenance-view/abstract-statement-maintenance-view.component';

const routes: Routes = [
  {
    path: '',
    component: AbstractStatementMaintenanceListComponent,
    canActivate: [AbstractStatementMaintenanceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AbstractStatementMaintenanceNewComponent,
    canActivate: [AbstractStatementMaintenanceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AbstractStatementMaintenanceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AbstractStatementMaintenanceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AbstractStatementMaintenanceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AbstractStatementMaintenanceRoutingModule {
}
