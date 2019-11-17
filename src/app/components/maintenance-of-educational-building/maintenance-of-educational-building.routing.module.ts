
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MaintenanceOfEducationalBuildingComponent } from './maintenance-of-educational-building.component';


const routes: Routes = [
  {
    path: '',
    component: MaintenanceOfEducationalBuildingComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MaintenanceOfEducationalBuildingRoutingModule {
}

