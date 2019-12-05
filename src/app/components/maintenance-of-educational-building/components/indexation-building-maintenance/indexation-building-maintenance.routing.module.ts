import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { IndexationBuildingMaintenanceGuard } from './shared/indexation-building-maintenance.guard';
import { IndexationBuildingMaintenanceNewComponent } from './indexation-building-maintenance-new/indexation-building-maintenance-new.component';
import { IndexationBuildingMaintenanceEditComponent } from './indexation-building-maintenance-edit/indexation-building-maintenance-edit.component';
import { IndexationBuildingMaintenanceListComponent } from './indexation-building-maintenance-list/indexation-building-maintenance-list.component';
import { IndexationBuildingMaintenanceViewComponent } from './indexation-building-maintenance-view/indexation-building-maintenance-view.component';

const routes: Routes = [
  {
    path: '',
    component: IndexationBuildingMaintenanceListComponent,
    canActivate: [IndexationBuildingMaintenanceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: IndexationBuildingMaintenanceNewComponent,
    canActivate: [IndexationBuildingMaintenanceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: IndexationBuildingMaintenanceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: IndexationBuildingMaintenanceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: IndexationBuildingMaintenanceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class IndexationBuildingMaintenanceRoutingModule {
}
