import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerGuard } from './shared/assigning-maintenance-electricity-project-to-electrical-engineer.guard';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerNewComponent } from './assigning-maintenance-electricity-project-to-electrical-engineer-new/assigning-maintenance-electricity-project-to-electrical-engineer-new.component';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerEditComponent } from './assigning-maintenance-electricity-project-to-electrical-engineer-edit/assigning-maintenance-electricity-project-to-electrical-engineer-edit.component';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerListComponent } from './assigning-maintenance-electricity-project-to-electrical-engineer-list/assigning-maintenance-electricity-project-to-electrical-engineer-list.component';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerViewComponent } from './assigning-maintenance-electricity-project-to-electrical-engineer-view/assigning-maintenance-electricity-project-to-electrical-engineer-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssigningMaintenanceElectricityProjectToElectricalEngineerListComponent,
    canActivate: [AssigningMaintenanceElectricityProjectToElectricalEngineerGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AssigningMaintenanceElectricityProjectToElectricalEngineerNewComponent,
    canActivate: [AssigningMaintenanceElectricityProjectToElectricalEngineerGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AssigningMaintenanceElectricityProjectToElectricalEngineerEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AssigningMaintenanceElectricityProjectToElectricalEngineerListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AssigningMaintenanceElectricityProjectToElectricalEngineerViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssigningMaintenanceElectricityProjectToElectricalEngineerRoutingModule {
}
