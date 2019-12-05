import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletGuard } from './shared/maintenance-of-educational-buildings-list-of-ready-toilet.guard';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletNewComponent } from './maintenance-of-educational-buildings-list-of-ready-toilet-new/maintenance-of-educational-buildings-list-of-ready-toilet-new.component';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletEditComponent } from './maintenance-of-educational-buildings-list-of-ready-toilet-edit/maintenance-of-educational-buildings-list-of-ready-toilet-edit.component';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletListComponent } from './maintenance-of-educational-buildings-list-of-ready-toilet-list/maintenance-of-educational-buildings-list-of-ready-toilet-list.component';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletViewComponent } from './maintenance-of-educational-buildings-list-of-ready-toilet-view/maintenance-of-educational-buildings-list-of-ready-toilet-view.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceOfEducationalBuildingsListOfReadyToiletListComponent,
    canActivate: [MaintenanceOfEducationalBuildingsListOfReadyToiletGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MaintenanceOfEducationalBuildingsListOfReadyToiletNewComponent,
    canActivate: [MaintenanceOfEducationalBuildingsListOfReadyToiletGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MaintenanceOfEducationalBuildingsListOfReadyToiletEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MaintenanceOfEducationalBuildingsListOfReadyToiletListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MaintenanceOfEducationalBuildingsListOfReadyToiletViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MaintenanceOfEducationalBuildingsListOfReadyToiletRoutingModule {
}
