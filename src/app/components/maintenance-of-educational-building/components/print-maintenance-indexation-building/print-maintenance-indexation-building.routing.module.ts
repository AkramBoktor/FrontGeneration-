import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PrintMaintenanceIndexationBuildingGuard } from './shared/print-maintenance-indexation-building.guard';
import { PrintMaintenanceIndexationBuildingNewComponent } from './print-maintenance-indexation-building-new/print-maintenance-indexation-building-new.component';
import { PrintMaintenanceIndexationBuildingEditComponent } from './print-maintenance-indexation-building-edit/print-maintenance-indexation-building-edit.component';
import { PrintMaintenanceIndexationBuildingListComponent } from './print-maintenance-indexation-building-list/print-maintenance-indexation-building-list.component';
import { PrintMaintenanceIndexationBuildingViewComponent } from './print-maintenance-indexation-building-view/print-maintenance-indexation-building-view.component';

const routes: Routes = [
  {
    path: '',
    component: PrintMaintenanceIndexationBuildingListComponent,
    canActivate: [PrintMaintenanceIndexationBuildingGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PrintMaintenanceIndexationBuildingNewComponent,
    canActivate: [PrintMaintenanceIndexationBuildingGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PrintMaintenanceIndexationBuildingEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PrintMaintenanceIndexationBuildingListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PrintMaintenanceIndexationBuildingViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PrintMaintenanceIndexationBuildingRoutingModule {
}
